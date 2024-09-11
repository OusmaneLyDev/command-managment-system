import connection from '../db.js';

// Ajouter un produit
export async function addProduct(productName, description, price, stock, category, barcode, status) {
    const [result] = await connection.execute(
        'INSERT INTO products (product_name, description, price, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [productName, description, price, stock, category, barcode, status]
    );
    return result;
}

// Lister les produits
export async function listProducts() {
    const [rows] = await connection.execute('SELECT * FROM products');
    console.log(rows);
}

// Mettre à jour un produit
export async function updateProduct(productId, productName, description, price, stock, category, barcode, status) {
    const [result] = await connection.execute(
        'UPDATE products SET product_name = ?, description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?',
        [productName, description, price, stock, category, barcode, status, productId]
    );
    return result;
}

// Supprimer un produit
export async function deleteProduct(productId) {
    const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [productId]);
    return result;
}
