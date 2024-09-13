import connection from '../db.js';

export async function addOrder(customerId, date, deliveryAddress, trackNumber, status ) {
    const [result] = await connection.execute(
        'INSERT INTO orders (customer_id, date, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)',
        [customerId, date, deliveryAddress, trackNumber, status]
    );
    return result;
}

export async function listOrders() {
    const [rows] = await connection.execute('SELECT * FROM orders');
    console.log(rows);
}

export async function updateOrder(orderId, customerId, date, deliveryAddress, trackNumber) {
    const [result] = await connection.execute(
        'UPDATE orders SET customer_id = ?, date = ?, delivery_address = ?, track_number = ? WHERE id = ?',
        [customerId, date, deliveryAddress, trackNumber, orderId]
    );
    return result;
}

export async function deleteOrder(orderId) {
    const [result] = await connection.execute('DELETE FROM orders WHERE id = ?', [orderId]);
    return result;
}

