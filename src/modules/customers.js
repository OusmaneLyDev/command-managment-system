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
        if (result.affectedRows === 0) {
            throw new Error(`Aucun client trouvé avec l'ID ${id}.`);
        }
        console.log(`Le client avec l'ID ${id} a été supprimé avec succès.`);
        return result;
    } catch (error) {
        console.error('Erreur lors de la suppression du client:', error.message);
        throw error;
    }
}


export async function getCustomerById(id) {
    try {
        const [rows] = await connection.execute('SELECT * FROM customers WHERE id = ?', [id]);
        if (rows.length === 0) {
            console.log(`Aucun client trouvé avec l'ID ${id}.`);
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error('Erreur lors de la récupération du client par ID:', error.message);
        throw error;
    }
}
