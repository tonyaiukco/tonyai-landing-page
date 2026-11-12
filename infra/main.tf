data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "site" {
  name     = "tonyai-site"
  location = var.location
}

# Logs are streamed only; no Log Analytics workspace.
resource "azurerm_container_app_environment" "site" {
  name                = "tonyai-site"
  location            = azurerm_resource_group.site.location
  resource_group_name = azurerm_resource_group.site.name
}

resource "azurerm_container_app" "site" {
  name                         = "tonyai-site"
  container_app_environment_id = azurerm_container_app_environment.site.id
  resource_group_name          = azurerm_resource_group.site.name
  revision_mode                = "Single"

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
}

# GitHub Actions signs in with OIDC as this identity; no secret is stored anywhere.
resource "azurerm_user_assigned_identity" "deploy" {
  name                = "tonyai-site-deploy"
  location            = azurerm_resource_group.site.location
  resource_group_name = azurerm_resource_group.site.name
}

resource "azurerm_federated_identity_credential" "github_main" {
  name                      = "github-main"
  user_assigned_identity_id = azurerm_user_assigned_identity.deploy.id
  issuer                    = "https://token.actions.githubusercontent.com"
  subject                   = "repo:tonyaiukco/tonyai-landing-page:ref:refs/heads/main"
  audience                  = ["api://AzureADTokenExchange"]
}

# Resource group scope: `az containerapp update` also needs join rights on the environment.
resource "azurerm_role_assignment" "deploy" {
  scope                = azurerm_resource_group.site.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
  principal_type       = "ServicePrincipal"
}

# Custom domains are added unbound; the managed certificates are bound afterwards with
# `az containerapp hostname bind` (see README), hence the ignore_changes.
locals {
  hostnames = var.dns_ready ? {
    www  = { name = "www.tonyai.io", validation = "CNAME" }
    apex = { name = "tonyai.io", validation = "HTTP" }
  } : {}
}

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
  name                         = "tonyai-site-${each.key}"
  container_app_environment_id = azurerm_container_app_environment.site.id
  subject_name                 = each.value.name
  domain_control_validation    = each.value.validation

  depends_on = [azurerm_container_app_custom_domain.site]
}
