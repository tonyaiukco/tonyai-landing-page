resource "azurerm_resource_group" "site" {
  name     = "tonyai-site"
  location = var.location
}

resource "azurerm_static_web_app" "site" {
  name                         = "tonyai-site"
  resource_group_name          = azurerm_resource_group.site.name
  location                     = azurerm_resource_group.site.location
  sku_tier                     = "Free"
  sku_size                     = "Free"
  preview_environments_enabled = false
}

# Needs `CNAME www -> <default_host_name>` at Namecheap before it is created (see README).
resource "azurerm_static_web_app_custom_domain" "www" {
  static_web_app_id = azurerm_static_web_app.site.id
  domain_name       = "www.tonyai.io"
  validation_type   = "cname-delegation"
}

# Validated by `TXT @ -> apex_validation_token`; served through `ALIAS @ -> <default_host_name>`.
resource "azurerm_static_web_app_custom_domain" "apex" {
  static_web_app_id = azurerm_static_web_app.site.id
  domain_name       = "tonyai.io"
  validation_type   = "dns-txt-token"
}
