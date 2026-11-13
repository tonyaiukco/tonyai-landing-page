terraform {
  required_version = ">= 1.9"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 5.14"
    }
  }

  # State sits beside the QA stack's state; access is by Entra ID (the account has no shared key).
  backend "azurerm" {
    resource_group_name  = "tonyai-qatmp-tfstate"
    storage_account_name = "tonyaiqtqabe"
    container_name       = "landing"
    key                  = "landing.tfstate"
    use_azuread_auth     = true
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}
