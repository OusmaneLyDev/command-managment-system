import connection from '../db.js';

// Add Order with details
export async function addOrder(customerId, date, deliveryAddress, trackNumber, status, orderDetails) {
    const [result] = await connection.execute(
        'INSERT INTO orders (customer_id, date, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)',
        [customerId, date, deliveryAddress, trackNumber, status]
    );
    const orderId = result.insertId; // Get the inserted order ID

    // Insert the order details
    for (let detail of orderDetails) {
        await connection.execute(
            'INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
            [orderId, detail.productId, detail.quantity, detail.price]
        );
    }

    return result;
}

export async function listOrders() {
    const [rows] = await connection.execute(`
        SELECT o.*, od.product_id, od.quantity, od.price
        FROM orders o
        LEFT JOIN order_details od ON o.id = od.order_id
    `);
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
