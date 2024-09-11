// config/db.js
import mysql from 'mysql2/promise';

// Configuration de la connexion à la base de données
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fouiny0513',
    database: 'abc_corporation'
});

export default connection;
