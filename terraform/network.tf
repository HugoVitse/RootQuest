# Configuration réseau : Virtual Network avec segmentation

resource "azurerm_virtual_network" "challenges-vpn" {
  name                = "${var.project_name}-${var.environment}-challvpn-vnet"
  # On définit un espace large pour avoir de la place pour les sous-réseaux
  address_space       = ["10.0.0.0/16"] 
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  tags = var.tags
}

# 1. Subnet pour le VPN (La porte d'entrée des joueurs)
resource "azurerm_subnet" "vpn" {
  name                 = "vpn-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.challenges-vpn.name
  address_prefixes     = ["10.0.1.0/24"]

}

# 2. Subnet pour les Challenges (La zone cible)
# IMPORTANT : La "delegation" est OBLIGATOIRE pour que Azure Container Instances (ACI)
# puisse créer des conteneurs à l'intérieur de ce réseau privé.
resource "azurerm_subnet" "challenges" {
  name                 = "challenges-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.challenges-vpn.name
  address_prefixes     = ["10.0.2.0/24"]

  delegation {
    name = "aci-delegation"
    service_delegation {
      name    = "Microsoft.ContainerInstance/containerGroups"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }
}






resource "azurerm_virtual_network" "main" {
  name                = "${var.project_name}-${var.environment}-main-vnet"
  # On définit un espace large pour avoir de la place pour les sous-réseaux
  address_space       = ["10.1.0.0/16"] 
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  tags = var.tags
}


resource "azurerm_subnet" "db" {
  name                 = "db-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.1.1.0/24"]

  delegation {
    name = "mysql-delegation"
    service_delegation {
      name    = "Microsoft.DBforMySQL/flexibleServers" # Délégation obligatoire pour MySQL Flex
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }

}


resource "azurerm_private_dns_zone" "mysql" {
  name                = "private.mysql.database.azure.com"
  resource_group_name = azurerm_resource_group.main.name
}

# On lie cette zone DNS à ton VNet principal pour que tout le monde (App, VPN, etc.) puisse résoudre le nom
resource "azurerm_private_dns_zone_virtual_network_link" "main" {
  name                  = "rootquest-dns-link"
  private_dns_zone_name = azurerm_private_dns_zone.mysql.name
  virtual_network_id    = azurerm_virtual_network.main.id
  resource_group_name   = azurerm_resource_group.main.name
}

resource "azurerm_subnet" "web" {
  name                 = "web-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.1.2.0/24"]

  service_endpoints    = ["Microsoft.KeyVault", "Microsoft.Web"]
  
  delegation {
    name = "webapp-delegation"
    service_delegation {
      name    = "Microsoft.Web/serverFarms"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }

}

# Subnet dédié pour Azure Container Instances (évite le conflit de ServiceAssociationLink
# lorsqu'un autre service (ex: MySQL Flexible Server) a déjà une délégation sur le subnet db)
resource "azurerm_subnet" "aci" {
  name                 = "aci-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.1.3.0/24"]
  service_endpoints    = ["Microsoft.ContainerRegistry"]

  delegation {
    name = "aci-delegation"
    service_delegation {
      name    = "Microsoft.ContainerInstance/containerGroups"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }

}