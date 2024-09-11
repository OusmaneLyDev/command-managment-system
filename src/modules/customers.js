import connection from '../db.js';

export async function addCustomer(name, email, address) {
    const [result] = await connection.execute(
        'INSERT INTO customers (name, email, address) VALUES (?, ?, ?)',
        [name, email, address]
    );
    return result;
}

export async function listCustomers() {
    const [rows] = await connection.execute('SELECT * FROM customers');
    console.log(rows);
}

export async function updateCustomer(customerId, name, email, address) {
    const [result] = await connection.execute(
        'UPDATE customers SET name = ?, email = ?, address = ? WHERE id = ?',
        [name, email, address, customerId]
    );
    return result;
}

export async function deleteCustomer(customerId) {
    const [result] = await connection.execute('DELETE FROM customers WHERE id = ?', [customerId]);
    return result;
}
