output "app_fqdn" {
  description = "Target of the www CNAME at Namecheap; the site is also reachable here."
  value       = azurerm_container_app.site.ingress[0].fqdn
}

output "static_ip" {
  description = "Target of the @ A record at Namecheap."
  value       = azurerm_container_app_environment.site.static_ip_address
}

output "domain_verification_id" {
  description = "Value of both asuid TXT records (asuid and asuid.www) at Namecheap."
  value       = azurerm_container_app_environment.site.custom_domain_verification_id
}

output "deploy_client_id" {
  description = "GitHub variable AZURE_CLIENT_ID."
  value       = azurerm_user_assigned_identity.deploy.client_id
}

output "tenant_id" {
  description = "GitHub variable AZURE_TENANT_ID."
  value       = data.azurerm_client_config.current.tenant_id
}

output "subscription_id" {
  description = "GitHub variable AZURE_SUBSCRIPTION_ID."
  value       = var.subscription_id
}
