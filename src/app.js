import inquirer from 'inquirer';
import { addCustomer, listCustomers, updateCustomer, deleteCustomer } from './modules/customers.js';
import { addOrder, listOrders, updateOrder, deleteOrder } from './modules/orders.js';
import { addPayment, listPayments, updatePayment, deletePayment } from './modules/payments.js';
import { addProduct, listProducts, updateProduct, deleteProduct } from './modules/products.js';

// Main Menu
async function mainMenu() {
    const choice = await inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to manage?',
            choices: ['Customers', 'Orders', 'Payments', 'Products', 'Quit']
        }
    ]);

    switch (choice.menu) {
        case 'Customers':
            return manageCustomers();
        case 'Orders':
            return manageOrders();
        case 'Payments':
            return managePayments();
        case 'Products':
            return manageProducts();
        case 'Quit':
            console.log('Goodbye!');
            process.exit();
    }
}

// Manage Customers
async function manageCustomers() {
    const action = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add a customer', 'List customers', 'Update a customer', 'Delete a customer', 'Back']
        }
    ]);

    switch (action.action) {
        case 'Add a customer':
            const { customer_name, email, phone, address } = await inquirer.prompt([
                { type: 'input', name: 'name', message: 'Customer name:' },
                { type: 'input', name: 'email', message: 'Customer email:' },
                { type: 'input', name: 'phone', message: 'Customer phone:' },
                { type: 'input', name: 'address', message: 'Customer address:' }
            ]);
            await addCustomer(customer_name, email, phone, address);
            console.log('Customer added successfully.');
            break;
        case 'List customers':
            await listCustomers();
            break;
        case 'Update a customer':
            const { id, newName, newEmail, newPhone, newAddress } = await inquirer.prompt([
                { type: 'number', name: 'id', message: 'ID of the customer to update:' },
                { type: 'input', name: 'newName', message: 'New customer name:' },
                { type: 'input', name: 'newEmail', message: 'New email:' },
                { type: 'input', name: 'newPhone', message: 'New phone:' },
                { type: 'input', name: 'newAddress', message: 'New address:' }
            ]);
            await updateCustomer(id, newName, newEmail, newPhone, newAddress);
            console.log('Customer updated successfully.');
            break;
        case 'Delete a customer':
            const { idToDelete } = await inquirer.prompt([
                { type: 'number', name: 'idToDelete', message: 'ID of the customer to delete:' }
            ]);
            await deleteCustomer(idToDelete);
            console.log('Customer deleted successfully.');
            break;
        case 'Back':
            return mainMenu();
    }
    return manageCustomers();
}

// Manage Orders
async function manageOrders() {
    const action = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add an order', 'List orders', 'Update an order', 'Delete an order', 'Back']
        }
    ]);

    switch (action.action) {
        case 'Add an order':
            const { customerId, orderDate, amount, status } = await inquirer.prompt([
                { type: 'number', name: 'customerId', message: 'Customer ID:' },
                { type: 'input', name: 'orderDate', message: 'Order date (YYYY-MM-DD):' },
                { type: 'number', name: 'amount', message: 'Order amount:' },
                { type: 'list', name: 'status', message: 'Order status:', choices: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] }
            ]);
            await addOrder(customerId, orderDate, amount, status);
            console.log('Order added successfully.');
            break;
        case 'List orders':
            await listOrders();
            break;
        case 'Update an order':
            const { idOrder, newCustomerId, newOrderDate, newAmount, newStatus } = await inquirer.prompt([
                { type: 'number', name: 'idOrder', message: 'ID of the order to update:' },
                { type: 'number', name: 'newCustomerId', message: 'Customer ID:' },
                { type: 'input', name: 'newOrderDate', message: 'New order date (YYYY-MM-DD):' },
                { type: 'number', name: 'newAmount', message: 'New amount:' },
                { type: 'list', name: 'newStatus', message: 'New status:', choices: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] }
            ]);
            await updateOrder(idOrder, newCustomerId, newOrderDate, newAmount, newStatus);
            console.log('Order updated successfully.');
            break;
        case 'Delete an order':
            const { idOrderToDelete } = await inquirer.prompt([
                { type: 'number', name: 'idOrderToDelete', message: 'ID of the order to delete:' }
            ]);
            await deleteOrder(idOrderToDelete);
            console.log('Order deleted successfully.');
            break;
        case 'Back':
            return mainMenu();
    }
    return manageOrders();
}

// Manage Payments
async function managePayments() {
    const action = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add a payment', 'List payments', 'Update a payment', 'Delete a payment', 'Back']
        }
    ]);

    switch (action.action) {
        case 'Add a payment':
            const { orderId, amount, paymentDate, paymentMethod } = await inquirer.prompt([
                { type: 'number', name: 'orderId', message: 'Order ID:' },
                { type: 'number', name: 'amount', message: 'Payment amount:' },
                { type: 'input', name: 'paymentDate', message: 'Payment date (YYYY-MM-DD):' },
                { type: 'list', name: 'paymentMethod', message: 'Payment method:', choices: ['Card', 'Transfer', 'Check'] }
            ]);
            await addPayment(orderId, amount, paymentDate, paymentMethod);
            console.log('Payment added successfully.');
            break;
        case 'List payments':
            await listPayments();
            break;
        case 'Update a payment':
            const { idPayment, newOrderId, newAmount, newPaymentDate, newPaymentMethod } = await inquirer.prompt([
                { type: 'number', name: 'idPayment', message: 'ID of the payment to update:' },
                { type: 'number', name: 'newOrderId', message: 'Order ID:' },
                { type: 'number', name: 'newAmount', message: 'New amount:' },
                { type: 'input', name: 'newPaymentDate', message: 'New payment date (YYYY-MM-DD):' },
                { type: 'list', name: 'newPaymentMethod', message: 'New payment method:', choices: ['Card', 'Transfer', 'Check'] }
            ]);
            await updatePayment(idPayment, newOrderId, newAmount, newPaymentDate, newPaymentMethod);
            console.log('Payment updated successfully.');
            break;
        case 'Delete a payment':
            const { idPaymentToDelete } = await inquirer.prompt([
                { type: 'number', name: 'idPaymentToDelete', message: 'ID of the payment to delete:' }
            ]);
            await deletePayment(idPaymentToDelete);
            console.log('Payment deleted successfully.');
            break;
        case 'Back':
            return mainMenu();
    }
    return managePayments();
}

// Manage Products
async function manageProducts() {
    const action = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add a product', 'List products', 'Update a product', 'Delete a product', 'Back']
        }
    ]);

    switch (action.action) {
        case 'Add a product':
            const { productName, description, price } = await inquirer.prompt([
                { type: 'input', name: 'productName', message: 'Product name:' },
                { type: 'input', name: 'description', message: 'Product description:' },
                { type: 'number', name: 'price', message: 'Product price:' }
            ]);
            await addProduct(productName, description, price);
            console.log('Product added successfully.');
            break;
        case 'List products':
            await listProducts();
            break;
        case 'Update a product':
            const { idProduct, newProductName, newDescription, newPrice } = await inquirer.prompt([
                { type: 'number', name: 'idProduct', message: 'ID of the product to update:' },
                { type: 'input', name: 'newProductName', message: 'New product name:' },
                { type: 'input', name: 'newDescription', message: 'New description:' },
                { type: 'number', name: 'newPrice', message: 'New price:' }
            ]);
            await updateProduct(idProduct, newProductName, newDescription, newPrice);
            console.log('Product updated successfully.');
            break;
        case 'Delete a product':
            const { idProductToDelete } = await inquirer.prompt([
                { type: 'number', name: 'idProductToDelete', message: 'ID of the product to delete:' }
            ]);
            await deleteProduct(idProductToDelete);
            console.log('Product deleted successfully.');
            break;
        case 'Back':
            return mainMenu();
    }
    return manageProducts();
}

// Start the application
mainMenu();
