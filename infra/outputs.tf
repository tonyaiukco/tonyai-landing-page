output "default_hostname" {
  description = "Target of the www CNAME at Namecheap; `dig +short` on it gives the IP for the @ A record."
  value       = azurerm_linux_web_app.site.default_hostname
}

output "domain_verification_id" {
  description = "Value of both asuid TXT records (asuid and asuid.www) at Namecheap."
  value       = azurerm_linux_web_app.site.custom_domain_verification_id
  sensitive   = true
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
