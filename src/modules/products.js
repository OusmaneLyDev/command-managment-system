import connection from '../db.js';

// Ajouter un produit
export async function addProduct(name, description, price, stock, category, barcode, status) {
    const [result] = await connection.execute(
        'INSERT INTO products (name, description, price, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, description, price, stock, category, barcode, status]
    );
    return result;
}

// Lister les produits
export async function listProducts() {
    const [rows] = await connection.execute('SELECT * FROM products');
    console.log(rows);
}

// Mettre à jour un produit
export async function updateProduct(productId, name, description, price, stock, category, barcode, status) {
    const [result] = await connection.execute(
        'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?',
        [name, description, price, stock, category, barcode, status, productId]
    );
    return result;
}

// Supprimer un produit
export async function deleteProduct(productId) {
    const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [productId]);
    return result;
}
