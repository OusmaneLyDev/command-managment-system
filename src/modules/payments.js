import connection from '../db.js';

export async function addPayment(orderId, amount, paymentDate) {
    const [result] = await connection.execute(
        'INSERT INTO payments (id_order, amount, payment_date) VALUES (?, ?, ?)',
        [orderId, amount, paymentDate]
    );
    return result;
}

export async function listPayments() {
    const [rows] = await connection.execute('SELECT * FROM payments');
    console.log(rows);
}

export async function updatePayment(paymentId, orderId, amount, paymentDate) {
    const [result] = await connection.execute(
        'UPDATE payments SET id_order = ?, amount = ?, payment_date = ? WHERE id = ?',
        [orderId, amount, paymentDate, paymentId]
    );
    return result;
}

export async function deletePayment(paymentId) {
    const [result] = await connection.execute('DELETE FROM payments WHERE id = ?', [paymentId]);
    return result;
}
