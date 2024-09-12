# ABC Corporation 

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
   cd abc-corporation

2. **Installer les dépendances**

    ```bash
    npm install

3. **Configurer la base de donnée**

Assurez-vous que votre base de données MySQL est active. Utilisez le fichier SQL fourni (db/schema.sql) pour générer les tables :

CREATE DATABASE abc_corporation;
USE abc_corporation;

CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address VARCHAR(255)
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    stock INT,
    category VARCHAR(255),
    barcode VARCHAR(255),
    status VARCHAR(255)
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATE,
    delivery_address VARCHAR(255),
    track_number VARCHAR(255),
    status VARCHAR(255),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    amount DECIMAL(10,2),
    payment_date DATE,
    payment_method VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


5. **Lancer l'application**

    ```bash
    npm install
    ```

## Utilisation

Une fois l'application lancée, suivez les instructions dans la console pour naviguer entre les différentes options.

## Fonctionnalités principales

### Gestion des clients
- Ajouter un client
- Afficher la liste des clients
- Mettre à jour un client
- Supprimer un client

### Gestion des commandes
- Ajouter une commande
- Afficher la liste des commandes
- Mettre à jour une commande
- Supprimer une commande

### Gestion des paiements
- Ajouter un paiement
- Afficher la liste des paiements
- Mettre à jour un paiement
- Supprimer un paiement

### Gestion des produits
- Ajouter un produit
- Afficher la liste des produits
- Mettre à jour un produit
- Supprimer un produit

## Gestion des erreurs
- Validation des entrées : vérification des données avant enregistrement.
- Gestion des exceptions : affichage de messages en cas d'erreurs (connexion à la base de données, données non valides, etc.).

## Auteur

[Ethman Ly](https://github.com/OusmaneLyDev)