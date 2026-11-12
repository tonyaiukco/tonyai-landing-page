output "default_host_name" {
  description = "Target for the www CNAME and the apex ALIAS at Namecheap."
  value       = azurerm_static_web_app.site.default_host_name
}

output "apex_validation_token" {
  description = "Value of the TXT record on @ that proves ownership of tonyai.io."
  value       = azurerm_static_web_app_custom_domain.apex.validation_token
  sensitive   = true
}

output "api_key" {
  description = "Deploy token; goes to the AZURE_STATIC_WEB_APPS_API_TOKEN GitHub secret."
  value       = azurerm_static_web_app.site.api_key
  sensitive   = true
}
