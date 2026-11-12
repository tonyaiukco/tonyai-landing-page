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
  description = "Image (without the ghcr.io registry) the web app starts with. Later deployments change it from GitHub Actions; Terraform ignores that drift."
  type        = string
  default     = "tonyaiukco/tonyai-landing-page:latest"
}

variable "dns_ready" {
  description = "Set to true once the Namecheap records (www CNAME, @ A, asuid TXTs) resolve; adds the custom domains, their managed certificates and bindings."
  type        = bool
  default     = false
}
