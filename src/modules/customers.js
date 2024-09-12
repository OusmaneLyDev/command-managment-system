import connection from '../db.js';

export async function addCustomer(name, email, phone, address) {
    try {
        name = name || null;
        email = email || null;
        phone = phone || null;
        address = address || null;

        const [result] = await connection.execute(
            'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
            [name, email, phone, address]
        );
        return result;
    } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
    }
}


export async function listCustomers() {
    try {
        const [rows] = await connection.execute('SELECT * FROM customers');
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error listing customers:', error);
        throw error;
    }
}

export async function updateCustomer(id, name, phone, email, address) {
    try {
        const [result] = await connection.execute(
            'UPDATE customers SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?',
            [name, phone, email, address, id]
        );
        return result;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
}


export async function deleteCustomer(id) {
    try {
        const [result] = await connection.execute('DELETE FROM customers WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
}
