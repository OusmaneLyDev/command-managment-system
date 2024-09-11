import connection from '../db.js';

export async function addCustomer(customerName, email, phone, address) {
    try {
        customerName = customerName || null;
        email = email || null;
        phone = phone || null;
        address = address || null;

        const [result] = await connection.execute(
            'INSERT INTO customers (customer_name, email, phone, address) VALUES (?, ?, ?, ?)',
            [customerName, email, phone, address]
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

export async function updateCustomer(id, customerName, phone, email, address) {
    try {
        const [result] = await connection.execute(
            'UPDATE customers SET name = ?, email = ?, address = ? WHERE id = ?',
            [customerName, email, phone, address, id]
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
