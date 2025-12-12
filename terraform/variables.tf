# Variables de base

variable "project_name" {
  description = "Nom du projet"
  type        = string
  default     = "rootquest"
}

variable "environment" {
  description = "Environnement (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "location" {
  description = "Région Azure"
  type        = string
  default     = "Switzerland North"
}

variable "tags" {
  description = "Tags pour les ressources"
  type        = map(string)
  default = {
    Project   = "RootQuest"
    ManagedBy = "Terraform"
  }
}

variable "mysql_admin_username" {
  description = "Nom d'utilisateur MySQL"
  type        = string
  sensitive   = true
  default     = "rqadmin"
}

variable "mysql_admin_password" {
  description = "Mot de passe MySQL"
  type        = string
  sensitive   = true
}

variable "mysql_sku_name" {
  description = "SKU MySQL (ex: GP_Standard_D2ds_v3)"
  type        = string
  default     = "B_Standard_B1ms"
}

variable "mysql_storage_gb" {
  description = "Taille du stockage MySQL en GB"
  type        = number
  default     = 20
}

variable "mysql_version" {
  description = "Version de MySQL"
  type        = string
  default     = "5.7"
}

variable "app_service_sku" {
  description = "SKU App Service Plan"
  type        = string
  default     = "B1"
}

variable "node_version" {
  description = "Version de Node.js"
  type        = string
  default     = "20-lts"
}

variable "acr_sku" {
  description = "SKU Container Registry"
  type        = string
  default     = "Basic"
}

variable "image_tag" {
  description = "Tag of the container image to deploy from ACR"
  type        = string
  default     = "latest"
}

# Variables réseau
variable "vnet_address_space" {
  description = "Espace d'adressage VNet"
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "storage_account_tier" {
  description = "Niveau Storage Account"
  type        = string
  default     = "Standard"
}

variable "storage_account_replication_type" {
  description = "Type de réplication"
  type        = string
  default     = "LRS"
}

variable "vpn_ssh_public_key" {
  description = "Contenu de la clé publique SSH pour la VM VPN. Fourni par la CI/CD ou lu en local."
  type        = string
  default     = null #  facultatif
}