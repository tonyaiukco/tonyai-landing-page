data "azurerm_client_config" "current" {}

# The registry is shared with the QA application and managed by its stack.
data "azurerm_container_registry" "acr" {
  name                = "tonyaiacr"
  resource_group_name = "tonyai-qatmp-apps"
}

resource "azurerm_resource_group" "site" {
  name     = "tonyai-landing"
  location = var.location
}

resource "azurerm_log_analytics_workspace" "site" {
  name                = "tonyai-landing-logs"
  location            = azurerm_resource_group.site.location
  resource_group_name = azurerm_resource_group.site.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "site" {
  name                       = "tonyai-landing-env"
  location                   = azurerm_resource_group.site.location
  resource_group_name        = azurerm_resource_group.site.name
  logs_destination           = "log-analytics"
  log_analytics_workspace_id = azurerm_log_analytics_workspace.site.id

  # Azure adds this profile to every new environment; declaring it keeps the plan empty.
  workload_profile {
    name                  = "Consumption"
    workload_profile_type = "Consumption"
  }
}

# The running site pulls its image as this identity; it can do nothing else.
resource "azurerm_user_assigned_identity" "pull" {
  name                = "tonyai-landing-pull"
  location            = azurerm_resource_group.site.location
  resource_group_name = azurerm_resource_group.site.name
}

resource "azurerm_role_assignment" "pull" {
  scope                = data.azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.pull.principal_id
  principal_type       = "ServicePrincipal"
}

# GitHub Actions signs in with OIDC as this identity; no secret is stored anywhere.
resource "azurerm_user_assigned_identity" "deploy" {
  name                = "tonyai-landing-deploy"
  location            = azurerm_resource_group.site.location
  resource_group_name = azurerm_resource_group.site.name
}

resource "azurerm_federated_identity_credential" "github_main" {
  name                      = "github-main"
  user_assigned_identity_id = azurerm_user_assigned_identity.deploy.id
  issuer                    = "https://token.actions.githubusercontent.com"
  subject                   = "repo:${var.github_repository}:ref:refs/heads/main"
  audience                  = ["api://AzureADTokenExchange"]
}

resource "azurerm_role_assignment" "deploy_push" {
  scope                = data.azurerm_container_registry.acr.id
  role_definition_name = "AcrPush"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
  principal_type       = "ServicePrincipal"
}

# Resource group scope: `az containerapp update` also needs join rights on the environment.
resource "azurerm_role_assignment" "deploy_site" {
  scope                = azurerm_resource_group.site.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
  principal_type       = "ServicePrincipal"
}

resource "azurerm_container_app" "site" {
  name                         = "tonyai-landing"
  container_app_environment_id = azurerm_container_app_environment.site.id
  resource_group_name          = azurerm_resource_group.site.name
  revision_mode                = "Single"
  workload_profile_name        = "Consumption"

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.pull.id]
  }

  registry {
    server   = data.azurerm_container_registry.acr.login_server
    identity = azurerm_user_assigned_identity.pull.id
  }

  template {
    # One warm replica so the first visitor never waits for a cold start.
    min_replicas = 1
    max_replicas = 2

    container {
      name   = "site"
      image  = var.image
      cpu    = 0.25
      memory = "0.5Gi"
    }

    http_scale_rule {
      name                = "http"
      concurrent_requests = "100"
    }
  }

  # allow_insecure_connections = false redirects HTTP to HTTPS.
  ingress {
    external_enabled           = true
    target_port                = 8080
    allow_insecure_connections = false
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  lifecycle {
    ignore_changes = [template[0].container[0].image]
  }

  # The first revision cannot pull until the role assignment exists.
  depends_on = [azurerm_role_assignment.pull]
}

locals {
  hostnames = var.dns_ready ? {
    apex = { name = "tonyai.io", validation = "HTTP" }
    www  = { name = "www.tonyai.io", validation = "CNAME" }
  } : {}
}

# Custom domains are added unbound; the managed certificates are bound afterwards with
# `az containerapp hostname bind` (see README), hence the ignore_changes.
resource "azurerm_container_app_custom_domain" "site" {
  for_each         = local.hostnames
  name             = each.value.name
  container_app_id = azurerm_container_app.site.id

  lifecycle {
    ignore_changes = [certificate_binding_type, container_app_environment_certificate_id]
  }
}

resource "azurerm_container_app_environment_managed_certificate" "site" {
  for_each                     = local.hostnames
  name                         = "tonyai-landing-${each.key}"
  container_app_environment_id = azurerm_container_app_environment.site.id
  subject_name                 = each.value.name
  domain_control_validation    = each.value.validation

  depends_on = [azurerm_container_app_custom_domain.site]
}
