import connection from '../db.js';

export async function addPayment(purchaseOrderId, amount, date, paymentMethod) {
    const [result] = await connection.execute(
        'INSERT INTO payments (purchase_order_id, amount, date, payment_method) VALUES (?, ?, ?, ?)',
        [purchaseOrderId, amount, date, paymentMethod]
    );
    return result;
}

export async function listPayments() {
    const [rows] = await connection.execute('SELECT * FROM payments');
    console.log(rows);
}

export async function updatePayment(paymentId, purchaseOrderId, amount, date, paymentMethod) {
    const [result] = await connection.execute(
        'UPDATE payments SET purchase_order_id = ?, amount = ?, date = ?, payment_method = ? WHERE id = ?',
        [purchaseOrderId, amount, date, paymentMethod, paymentId]
    );
    return result;
}

export async function deletePayment(paymentId) {
    const [result] = await connection.execute('DELETE FROM payments WHERE id = ?', [paymentId]);
    return result;
}
