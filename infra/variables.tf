variable "subscription_id" {
  description = "Azure subscription that holds the site."
  type        = string
  default     = "cb7efc2f-37a7-4672-b62c-93c207bcd33d"
}

variable "location" {
  description = "Region for every resource. Static Web Apps is offered in West Europe (not in Sweden Central); content is served from the global edge either way."
  type        = string
  default     = "westeurope"
}

variable "dns_ready" {
  description = "Set to true once `CNAME www -> <default_host_name>` resolves at Namecheap; adds www.tonyai.io."
  type        = bool
  default     = false
}
