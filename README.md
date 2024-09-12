# Command Management System

## Description

Cette application en mode console permet de gérer les clients, les commandes, les paiements et les produits pour ABC Corporation. Elle permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur l'ensemble des tables de la base de données, avec une gestion rigoureuse des exceptions pour assurer la fiabilité des opérations.

### Fonctionnalités :
- **Gestion des clients** : ajout, modification, suppression et affichage des clients.
- **Gestion des commandes** : ajout, modification, suppression et affichage des commandes.
- **Gestion des paiements** : ajout, modification, suppression et affichage des paiements.
- **Gestion des produits** : ajout, modification, suppression et affichage des produits.

## Prérequis

Avant de pouvoir utiliser l'application, assurez-vous d'avoir les éléments suivants :

- **Node.js** (v14 ou supérieure) : [Téléchargez ici](https://nodejs.org/)
- **MySQL** (version la plus récente) : [Téléchargez ici](https://dev.mysql.com/downloads/installer/)
- **npm** (installé avec Node.js)
- **Inquirer.js** et **dotenv** (seront installés via npm)


## Installation

1. **Cloner le projet**

   ```bash
   git clone https://github.com/OusmaneLyDev/abc_corporation-app-nodejs.git
   cd abc-corporation-app-nodejs

2. **Installer les dépendances**

    ```bash
    npm install


3. **Lancer l'application**

    ```bash
    npm start
    ```

## Modules

- **Customer** : Gère les informations relatives aux clients tels que l'affichage de la liste, l'ajout, la suppression, et la mise à jour de clients.
  
- **Product** : Permet de gérer les produits disponibles dans le magasin.
  
- **Purchase Order** : Gère les achats de commande avec les détails des produits achetés, les quantités, et les clients associés.
  
- **Payment** : Gère les paiements des commandes, et les types de paiements.


## Auteur

[Ethman Ly](https://github.com/OusmaneLyDev)