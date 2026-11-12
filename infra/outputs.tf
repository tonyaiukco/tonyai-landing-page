output "default_host_name" {
  description = "Target of the www CNAME and the @ ALIAS at Namecheap."
  value       = azurerm_static_web_app.site.default_host_name
}

output "apex_validation_token" {
  description = "Value of the TXT record on @ that proves ownership of tonyai.io."
  value       = azurerm_static_web_app_custom_domain.apex.validation_token
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
