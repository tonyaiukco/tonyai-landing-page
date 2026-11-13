output "app_fqdn" {
  description = "Default hostname of the site; the www CNAME points here."
  value       = azurerm_container_app.site.ingress[0].fqdn
}

output "static_ip" {
  description = "Value of the apex A record. Changes only if the environment is recreated."
  value       = azurerm_container_app_environment.site.static_ip_address
}

output "domain_verification_id" {
  description = "Value of the asuid and asuid.www TXT records."
  value       = azurerm_container_app.site.custom_domain_verification_id
  sensitive   = true
}

output "github_variables" {
  description = "Repository variables the deploy workflow reads."
  value = {
    AZURE_CLIENT_ID       = azurerm_user_assigned_identity.deploy.client_id
    AZURE_TENANT_ID       = data.azurerm_client_config.current.tenant_id
    AZURE_SUBSCRIPTION_ID = data.azurerm_client_config.current.subscription_id
  }
}
