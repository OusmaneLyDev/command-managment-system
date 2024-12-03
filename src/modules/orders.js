import connection from '../db.js';
import inquirer from 'inquirer';

// Ajouter une commande avec des détails
export async function addOrder(customerId, date, deliveryAddress, trackNumber, status, orderDetails) {
    const [result] = await connection.execute(
        'INSERT INTO purchase_orders (customer_id, date, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)',
        [customerId, date, deliveryAddress, trackNumber, status]
    );
    const orderId = result.insertId; // Récupérer l'ID de la commande insérée

    // Insérer les détails de la commande (s'ils existent)
    for (let detail of orderDetails) {
        await connection.execute(
            'INSERT INTO order_details (purchase_order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
            [orderId, detail.productId, detail.quantity, detail.price]
        );
    }

    return result;
}

// Fonction pour lister les commandes
export async function listOrders() {
    const [orders] = await connection.execute(`
        SELECT po.id, po.customer_id, po.date, po.delivery_address, po.track_number, po.status
        FROM purchase_orders po
    `);

    console.log("\nAvailable Orders:");
    orders.forEach(order => {
        console.log(`Order ID: ${order.id}, Customer ID: ${order.customer_id}, Date: ${order.date}, Status: ${order.status}`);
    });

    // Demander à l'utilisateur ce qu'il souhaite faire
    const { action } = await inquirer.prompt([
        { 
            type: 'list', 
            name: 'action', 
            message: 'What would you like to do?', 
            choices: ['View details of a specific order', 'View details of all orders'] 
        }
    ]);

    if (action === 'View details of a specific order') {
        await viewSpecificOrderDetails(orders);
    } else if (action === 'View details of all orders') {
        await viewAllOrderDetails();
    }
}

// Fonction pour afficher les détails d'une commande spécifique
async function viewSpecificOrderDetails(orders) {
    const { selectedOrderId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedOrderId',
            message: 'Select an order to view details:',
            choices: orders.map(order => ({ name: `Order ID: ${order.id}`, value: order.id }))
        }
    ]);

    // Récupérer et afficher les détails de la commande sélectionnée
    const [orderDetails] = await connection.execute(`
        SELECT po.*, od.product_id, od.quantity, od.price
        FROM purchase_orders po
        LEFT JOIN order_details od ON po.id = od.purchase_order_id
        WHERE po.id = ?
    `, [selectedOrderId]);

    console.log(`\nDetails of Order ID: ${selectedOrderId}`);
    orderDetails.forEach(detail => {
        console.log(`Product ID: ${detail.product_id}, Quantity: ${detail.quantity}, Price: ${detail.price}`);
    });
}

// Fonction pour afficher les détails de toutes les commandes
async function viewAllOrderDetails() {
    const [allDetails] = await connection.execute(`
        SELECT po.id, po.customer_id, po.date, po.delivery_address, po.track_number, po.status, od.product_id, od.quantity, od.price
        FROM purchase_orders po
        LEFT JOIN order_details od ON po.id = od.purchase_order_id
    `);

    console.log("\nDetails of All Orders:");
    allDetails.forEach(detail => {
        console.log(`Order ID: ${detail.id}, Customer ID: ${detail.customer_id}, Product ID: ${detail.product_id}, Quantity: ${detail.quantity}, Price: ${detail.price}`);
    });
}

// Fonction pour obtenir une commande par ID
export async function getOrderById(orderId) {
    try {
        const [order] = await connection.execute(`
            SELECT * FROM purchase_orders WHERE id = ?
        `, [orderId]);

        if (order.length === 0) {
            console.log(`Order ID ${orderId} not found.`);
            return null;
        }

        const [orderDetails] = await connection.execute(`
            SELECT * FROM order_details WHERE purchase_order_id = ?
        `, [orderId]);

        return {
            order: order[0],
            details: orderDetails
        };
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        throw error;
    }
}

// Fonction pour mettre à jour une commande
export async function updateOrder(orderId, customerId, date, deliveryAddress, trackNumber, status) {
    const [result] = await connection.execute(
        'UPDATE purchase_orders SET customer_id = ?, date = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?',
        [customerId, date, deliveryAddress, trackNumber, status, orderId]
    );
    return result;
}

export async function deleteOrder(orderId) {
    const [result] = await connection.execute('DELETE FROM purchase_orders WHERE id = ?', [orderId]);
    return result.affectedRows; // Retourne le nombre de lignes affectées
}
