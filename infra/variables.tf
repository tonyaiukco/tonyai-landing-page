variable "subscription_id" {
  description = "Azure subscription that holds the site."
  type        = string
  default     = "cb7efc2f-37a7-4672-b62c-93c207bcd33d"
}

variable "location" {
  description = "Region for every resource, next to the other TonyAI resources."
  type        = string
  default     = "swedencentral"
}

variable "image" {
  description = "Image the Container App is created with. Later deployments change it from GitHub Actions; Terraform ignores that drift."
  type        = string
  default     = "tonyaiacr.azurecr.io/tonyai/landing:bootstrap"
}

variable "github_repository" {
  description = "owner/name of the repository whose main branch may deploy."
  type        = string
  default     = "tonyaiukco/tonyai-landing-page"
}

variable "dns_ready" {
  description = "Set to true once the Namecheap records (@ A, www CNAME, asuid TXTs) resolve; adds the custom domains and their managed certificates."
  type        = bool
  default     = false
}
