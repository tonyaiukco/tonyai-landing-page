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
  description = "Repository whose main branch may deploy, as GitHub writes it in the OIDC subject: owner@owner-id/name@repo-id (ids from `gh api repos/<owner>/<name>`)."
  type        = string
  default     = "tonyaiukco@297710583/tonyai-landing-page@1451717935"
}

variable "dns_ready" {
  description = "Adds the custom domains and their managed certificates. Set to false only when building a new environment before the Namecheap records (@ A, www CNAME, asuid TXTs) point at it."
  type        = bool
  default     = true
}
