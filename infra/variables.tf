variable "subscription_id" {
  description = "Azure subscription that holds the site."
  type        = string
  default     = "cb7efc2f-37a7-4672-b62c-93c207bcd33d"
}

variable "location" {
  description = "Region for the resource group and Static Web App metadata; content is served from the global edge."
  type        = string
  default     = "westeurope"
}
