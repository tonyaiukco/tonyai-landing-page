data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "site" {
  name     = "tonyai-landing"
  location = var.location
}

# Linux B1: the smallest plan with custom domains, free managed certificates and always-on.
resource "azurerm_service_plan" "site" {
  name                = "tonyai-site-plan"
  location            = azurerm_resource_group.site.location
  resource_group_name = azurerm_resource_group.site.name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "site" {
  name                = "tonyai-site"
  location            = azurerm_resource_group.site.location
  resource_group_name = azurerm_resource_group.site.name
  service_plan_id     = azurerm_service_plan.site.id

  # Redirects HTTP to HTTPS.
  https_only = true

  ftp_publish_basic_authentication_enabled       = false
  webdeploy_publish_basic_authentication_enabled = false

  app_settings = {
    WEBSITES_PORT = "8080"
  }

  site_config {
    always_on  = true
    ftps_state = "Disabled"
    application_stack {
      docker_registry_url = "https://ghcr.io"
      docker_image_name   = var.image
    }
  }

  # GitHub Actions rolls out each new image; Terraform only sets the first one.
  lifecycle {
    ignore_changes = [site_config[0].application_stack[0].docker_image_name]
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

resource "azurerm_role_assignment" "deploy" {
  scope                = azurerm_resource_group.site.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
  principal_type       = "ServicePrincipal"
}

# Custom domains need the Namecheap records first (see README), hence the dns_ready switch.
locals {
  hostnames = var.dns_ready ? { www = "www.tonyai.io", apex = "tonyai.io" } : {}
}

resource "azurerm_app_service_custom_hostname_binding" "site" {
  for_each            = local.hostnames
  hostname            = each.value
  app_service_name    = azurerm_linux_web_app.site.name
  resource_group_name = azurerm_resource_group.site.name

  # Set by azurerm_app_service_certificate_binding below.
  lifecycle {
    ignore_changes = [ssl_state, thumbprint]
  }
}

resource "azurerm_app_service_managed_certificate" "site" {
  for_each                   = local.hostnames
  custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.site[each.key].id
}

resource "azurerm_app_service_certificate_binding" "site" {
  for_each            = local.hostnames
  hostname_binding_id = azurerm_app_service_custom_hostname_binding.site[each.key].id
  certificate_id      = azurerm_app_service_managed_certificate.site[each.key].id
  ssl_state           = "SniEnabled"
}
