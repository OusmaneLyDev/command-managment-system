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

// Obtenir un produit par ID
export async function getProductById(productId) {
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM products WHERE id = ?',
            [productId]
        );
        
        if (rows.length === 0) {
            console.log(`Product with ID ${productId} not found.`);
            return null;
        }

        return rows[0];
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
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
