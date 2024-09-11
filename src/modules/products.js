import connection from '../db.js';

export async function addProduct(name, description, price, stock) {
    const [result] = await connection.execute(
        'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
        [name, description, price, stock]
    );
    return result;
}

export async function listProducts() {
    const [rows] = await connection.execute('SELECT * FROM products');
    console.log(rows);
}

export async function updateProduct(productId, name, description, price, stock) {
    const [result] = await connection.execute(
        'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
        [name, description, price, stock, productId]
    );
    return result;
}

export async function deleteProduct(productId) {
    const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [productId]);
    return result;
}
