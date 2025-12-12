# config des vnet
#Il y a 2 vnet : un pour les challenges (contenant les subnet VPN et challenges)
#Un pour les autres services (subnet webapp db et aci)


#vnet pour challenges et vpn
resource "azurerm_virtual_network" "challenges-vpn" {
  name                = "${var.project_name}-${var.environment}-challvpn-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  tags = var.tags
}

#subnet vpn
resource "azurerm_subnet" "vpn" {
  name                 = "vpn-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.challenges-vpn.name
  address_prefixes     = ["10.0.1.0/24"]
  service_endpoints    = ["Microsoft.Storage"]

}

#subnet challenges
resource "azurerm_subnet" "challenges" {
  name                 = "challenges-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.challenges-vpn.name
  address_prefixes     = ["10.0.2.0/24"]

  delegation { #délégués aux container (infrastructure utilisé pour tous les challenges)
    name = "chall-delegation"
    service_delegation {
      name    = "Microsoft.ContainerInstance/containerGroups"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }
}





#vnet avec db et webapp
resource "azurerm_virtual_network" "main" {
  name                = "${var.project_name}-${var.environment}-main-vnet"
  address_space       = ["10.1.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  tags = var.tags
}


#subnet db
resource "azurerm_subnet" "db" {
  name                 = "db-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.1.1.0/24"]

  delegation { #délégué aux servers mysql
    name = "mysql-delegation"
    service_delegation {
      name    = "Microsoft.DBforMySQL/flexibleServers" # Délégation obligatoire pour MySQL Flex
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }

}

#dnz zone pour mysql
resource "azurerm_private_dns_zone" "mysql" {
  name                = "private.mysql.database.azure.com"
  resource_group_name = azurerm_resource_group.main.name
}

#on lie la zone dns au vnet main pour que la webapp puisse resoudre le nom de la db
resource "azurerm_private_dns_zone_virtual_network_link" "main" {
  name                  = "rootquest-dns-link"
  private_dns_zone_name = azurerm_private_dns_zone.mysql.name
  virtual_network_id    = azurerm_virtual_network.main.id
  resource_group_name   = azurerm_resource_group.main.name
}


#subnet web
resource "azurerm_subnet" "web" {
  name                 = "web-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.1.2.0/24"]

  #accès pour la webapp
  service_endpoints = ["Microsoft.KeyVault", "Microsoft.Web", "Microsoft.Storage"]

  delegation { #délégué aux services apps
    name = "webapp-delegation"
    service_delegation {
      name    = "Microsoft.Web/serverFarms"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }

}

#subnet aci pour l'init db
resource "azurerm_subnet" "aci" {
  name                 = "aci-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.1.3.0/24"]
  service_endpoints    = ["Microsoft.ContainerRegistry", "Microsoft.Storage"]

  delegation {
    name = "aci-delegation"
    service_delegation {
      name    = "Microsoft.ContainerInstance/containerGroups"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }

}