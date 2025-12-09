# Infrastructure Terraform pour RootQuest sur Azure

Configuration Terraform simple pour déployer RootQuest sur Azure.

## Prérequis

1. **Azure CLI** installé et connecté
   ```bash
   az login
   ```

2. **Terraform** installé (version >= 1.0)
   ```bash
   terraform version
   ```

## Configuration

1. **Copier le fichier de variables**
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Éditer `terraform.tfvars`** et remplir :
   - `mysql_admin_username`
   - `mysql_admin_password`

3. **Initialiser Terraform**
   ```bash
   terraform init
   ```

## Déploiement

```bash
# Vérifier ce qui sera créé
terraform plan

# Déployer
terraform apply
```

## Ressources créées

- **Resource Group** : Groupe de ressources
- **MySQL Server** : Base de données MySQL
- **App Service** : Application Next.js
- **Container Registry** : Registry pour les images Docker
- **Storage Account** : Stockage pour les données
- **Virtual Network** : Réseau virtuel

## Outputs

Après le déploiement :
```bash
terraform output app_service_url
```

## Destruction

```bash
terraform destroy
```
