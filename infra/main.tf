data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "site" {
  name     = "tonyai-landing"
  location = var.location
}

# Free plan: two custom domains with free certificates; content is served from the global edge.
resource "azurerm_static_web_app" "site" {
  name                         = "tonyai-site"
  resource_group_name          = azurerm_resource_group.site.name
  location                     = azurerm_resource_group.site.location
  sku_tier                     = "Free"
  sku_size                     = "Free"
  preview_environments_enabled = false
}

# Validated by `TXT @ -> apex_validation_token`; served through `ALIAS @ -> <default_host_name>`.
# Needs no DNS record up front, so it is created with the app.
resource "azurerm_static_web_app_custom_domain" "apex" {
  static_web_app_id = azurerm_static_web_app.site.id
  domain_name       = "tonyai.io"
  validation_type   = "dns-txt-token"
}

# Azure checks `CNAME www -> <default_host_name>` while adding it, hence the dns_ready switch.
resource "azurerm_static_web_app_custom_domain" "www" {
  count             = var.dns_ready ? 1 : 0
  static_web_app_id = azurerm_static_web_app.site.id
  domain_name       = "www.tonyai.io"
  validation_type   = "cname-delegation"
}

# GitHub Actions signs in with OIDC as this identity and reads the deploy token at run time;
# no secret is stored in GitHub.
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

# Contributor includes reading the Static Web App's deploy token (listSecrets).
resource "azurerm_role_assignment" "deploy" {
  scope                = azurerm_static_web_app.site.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_user_assigned_identity.deploy.principal_id
  principal_type       = "ServicePrincipal"
}
