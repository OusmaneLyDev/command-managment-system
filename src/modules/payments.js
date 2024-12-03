import connection from '../db.js';

// Ajouter un paiement
export async function addPayment(purchaseOrderId, amount, date, paymentMethod) {
    const [result] = await connection.execute(
        'INSERT INTO payments (purchase_order_id, amount, date, payment_method) VALUES (?, ?, ?, ?)',
        [purchaseOrderId, amount, date, paymentMethod]
    );
    return result;
}

// Lister tous les paiements
export async function listPayments() {
    const [rows] = await connection.execute('SELECT * FROM payments');
    console.log(rows);
}

// Obtenir un paiement par ID
export async function getPaymentById(paymentId) {
    try {
        const [payment] = await connection.execute(
            'SELECT * FROM payments WHERE id = ?',
            [paymentId]
        );
        
        if (payment.length === 0) {
            console.log(`Payment ID ${paymentId} not found.`);
            return null;
        }

        return payment[0];
    } catch (error) {
        console.error('Error fetching payment by ID:', error);
        throw error;
    }
}

// Mettre à jour un paiement
export async function updatePayment(paymentId, purchaseOrderId, amount, date, paymentMethod) {
    const [result] = await connection.execute(
        'UPDATE payments SET purchase_order_id = ?, amount = ?, date = ?, payment_method = ? WHERE id = ?',
        [purchaseOrderId, amount, date, paymentMethod, paymentId]
    );
    return result;
}

export async function deletePayment(paymentId) {
    try {
        const [result] = await connection.execute('DELETE FROM payments WHERE id = ?', [paymentId]);
        
        // Si aucune ligne n'a été affectée (aucun paiement trouvé avec cet ID)
        if (result.affectedRows === 0) {
            throw new Error('Payment not found.');
        }
        
        return result;
    } catch (error) {
        console.error('Error deleting payment:', error.message);
        throw error; // Relance l'erreur pour gestion en amont
    }
}