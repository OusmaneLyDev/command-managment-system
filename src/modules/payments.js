import connection from '../db.js';

export async function addPayment(orderId, amount, date, paymentMethod) {
    const [result] = await connection.execute(
        'INSERT INTO payments (order_id, amount, date, payment_method) VALUES (?, ?, ?, ?)',
        [orderId, amount, date, paymentMethod]
    );
    return result;
}

export async function listPayments() {
    const [rows] = await connection.execute('SELECT * FROM payments');
    console.log(rows);
}

export async function updatePayment(paymentId, orderId, amount, date, paymentMethod) {
    const [result] = await connection.execute(
        'UPDATE payments SET order_id = ?, amount = ?, date = ?, payment_method = ? WHERE id = ?',
        [orderId, amount, date, paymentMethod, paymentId]
    );
    return result;
}

export async function deletePayment(paymentId) {
    const [result] = await connection.execute('DELETE FROM payments WHERE id = ?', [paymentId]);
    return result;
}
