import connection from '../db.js';
import inquirer from 'inquirer';

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

// Fonction pour lister les commandes
export async function listOrders() {
    const [orders] = await connection.execute(`
        SELECT o.id, o.customer_id, o.date, o.delivery_address, o.track_number, o.status
        FROM orders o
    `);

    console.log("\nAvailable Orders:");
    orders.forEach(order => {
        console.log(`Order ID: ${order.id}, Customer ID: ${order.customer_id}, Date: ${order.date}, Status: ${order.status}`);
    });

    // Demande à l'utilisateur ce qu'il souhaite faire
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
        SELECT o.*, od.product_id, od.quantity, od.price
        FROM orders o
        LEFT JOIN order_details od ON o.id = od.order_id
        WHERE o.id = ?
    `, [selectedOrderId]);

    console.log(`\nDetails of Order ID: ${selectedOrderId}`);
    orderDetails.forEach(detail => {
        console.log(`Product ID: ${detail.product_id}, Quantity: ${detail.quantity}, Price: ${detail.price}`);
    });
}

// Fonction pour afficher les détails de toutes les commandes
async function viewAllOrderDetails() {
    const [allDetails] = await connection.execute(`
        SELECT o.id, o.customer_id, o.date, o.delivery_address, o.track_number, o.status, od.product_id, od.quantity, od.price
        FROM orders o
        LEFT JOIN order_details od ON o.id = od.order_id
    `);

    console.log("\nDetails of All Orders:");
    allDetails.forEach(detail => {
        console.log(`Order ID: ${detail.id}, Customer ID: ${detail.customer_id}, Product ID: ${detail.product_id}, Quantity: ${detail.quantity}, Price: ${detail.price}`);
    });
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
