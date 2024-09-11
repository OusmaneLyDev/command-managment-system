import connection from '../db.js';

export async function addOrder(customerId, orderDate, deliveryAddress, trackNumber, status ) {
    const [result] = await connection.execute(
        'INSERT INTO orders (customer_id, order_date, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)',
        [customerId, orderDate, deliveryAddress, trackNumber, status]
    );
    return result;
}

export async function listOrders() {
    const [rows] = await connection.execute('SELECT * FROM orders');
    console.log(rows);
}

export async function updateOrder(orderId, customerId, orderDate, deliveryAddress, trackNumber) {
    const [result] = await connection.execute(
        'UPDATE orders SET id_customer = ?, order_date = ?, delivery_address = ?, track_number = ? WHERE id = ?',
        [customerId, orderDate, deliveryAddress, trackNumber, orderId]
    );
    return result;
}

export async function deleteOrder(orderId) {
    const [result] = await connection.execute('DELETE FROM orders WHERE id = ?', [orderId]);
    return result;
}
