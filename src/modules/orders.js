import connection from '../db.js';

export async function addOrder(customerId, orderDate, amount) {
    const [result] = await connection.execute(
        'INSERT INTO orders (id_customer, order_date, amount) VALUES (?, ?, ?)',
        [customerId, orderDate, amount]
    );
    return result;
}

export async function listOrders() {
    const [rows] = await connection.execute('SELECT * FROM orders');
    console.log(rows);
}

export async function updateOrder(orderId, customerId, orderDate, amount) {
    const [result] = await connection.execute(
        'UPDATE orders SET id_customer = ?, order_date = ?, amount = ? WHERE id = ?',
        [customerId, orderDate, amount, orderId]
    );
    return result;
}

export async function deleteOrder(orderId) {
    const [result] = await connection.execute('DELETE FROM orders WHERE id = ?', [orderId]);
    return result;
}
