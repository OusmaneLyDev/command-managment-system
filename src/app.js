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
            const {name, email, phone, address } = await inquirer.prompt([
                { type: 'input', name: 'name', message: 'Customer name:' },
                { type: 'input', name: 'email', message: 'Customer email:' },
                { type: 'input', name: 'phone', message: 'Customer phone:' },
                { type: 'input', name: 'address', message: 'Customer address:' }
            ]);
            try {
                await addCustomer(name, email, phone, address);
                console.log('Customer added successfully.');
            } catch (error) {
                console.error('Error adding customer:', error);
            }
            break;
        case 'List customers':
            try {
                await listCustomers();
            } catch (error) {
                console.error('Error listing customers:', error);
            }
            break;
        case 'Update a customer':
            const { id, newName, newEmail, newPhone, newAddress } = await inquirer.prompt([
                { type: 'number', name: 'id', message: 'ID of the customer to update:' },
                { type: 'input', name: 'newName', message: 'New customer name:' },
                { type: 'input', name: 'newEmail', message: 'New email:' },
                { type: 'input', name: 'newPhone', message: 'New phone:' },
                { type: 'input', name: 'newAddress', message: 'New address:' }
            ]);
            try {
                await updateCustomer(id, newName, newEmail, newPhone, newAddress);
                console.log('Customer updated successfully.');
            } catch (error) {
                console.error('Error updating customer:', error);
            }
            break;
        case 'Delete a customer':
            const { idToDelete } = await inquirer.prompt([
                { type: 'number', name: 'idToDelete', message: 'ID of the customer to delete:' }
            ]);
            try {
                await deleteCustomer(idToDelete);
                console.log('Customer deleted successfully.');
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
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
            const { customerId, date, deliveryAddress, trackNumber, status } = await inquirer.prompt([
                { type: 'number', name: 'customerId', message: 'Customer ID:' },
                { type: 'input', name: 'date', message: 'Order date (YYYY-MM-DD):' },
                { type: 'input', name: 'deliveryAddress', message: 'Order deliveryAddress:' },
                { type: 'input', name: 'trackNumber', message: 'Order trackNumber:' },
                { type: 'list', name: 'status', message: 'Order status:', choices: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] }
            ]);
            await addOrder(customerId, date, deliveryAddress, trackNumber, status);
            console.log('Order added successfully.');
            break;
        case 'List orders':
            await listOrders();
            break;
        case 'Update an order':
            const { idOrder, newCustomerId, newDate, newDeliveryAddress, newTrackNumber, newStatus } = await inquirer.prompt([
                { type: 'number', name: 'idOrder', message: 'ID of the order to update:' },
                { type: 'number', name: 'newCustomerId', message: 'Customer ID:' },
                { type: 'input', name: 'newDate', message: 'New order date (YYYY-MM-DD):' },
                { type: 'text', name: 'newDeliveryAddress', message: 'New newDeliveryAddress:' },
                { type: 'number', name: 'newTrackNumber', message: 'New newTrackNumber:' },
                { type: 'list', name: 'newStatus', message: 'New status:', choices: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] }
            ]);
            await updateOrder(idOrder, newCustomerId, newDate, newDeliveryAddress, newTrackNumber, newStatus);
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
            const { orderId, amount, date, paymentMethod } = await inquirer.prompt([
                { type: 'number', name: 'orderId', message: 'Order ID:' },
                { type: 'number', name: 'amount', message: 'Payment amount:' },
                { type: 'input', name: 'date', message: 'Payment date (YYYY-MM-DD):' },
                { type: 'list', name: 'paymentMethod', message: 'Payment method:', choices: ['Card', 'Cash', 'Bank Transfer'] }
            ]);
            await addPayment(orderId, amount, date, paymentMethod);          
            console.log('Payment added successfully.');
            break;
        case 'List payments':
            await listPayments();
            break;
        case 'Update a payment':
            const { idPayment, newOrderId, newAmount, newDate, newPaymentMethod } = await inquirer.prompt([
                { type: 'number', name: 'idPayment', message: 'ID of the payment to update:' },
                { type: 'number', name: 'newOrderId', message: 'Order ID:' },
                { type: 'number', name: 'newAmount', message: 'New amount:' },
                { type: 'input', name: 'newDate', message: 'New payment date (YYYY-MM-DD):' },
                { type: 'list', name: 'newPaymentMethod', message: 'New payment method:', choices: ['Card', 'Transfer', 'Check'] }
            ]);
            await updatePayment(idPayment, newOrderId, newAmount, newDate, newPaymentMethod);
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
            const { name, description, price, stock, category, barcode, status } = await inquirer.prompt([
                { type: 'input', name: 'name', message: 'Product name:' },
                { type: 'input', name: 'description', message: 'Product description:' },
                { type: 'number', name: 'price', message: 'Product price:' },
                { type: 'number', name: 'stock', message: 'Stock quantity:' },
                { type: 'input', name: 'category', message: 'Product category:' },
                { type: 'input', name: 'barcode', message: 'Product barcode:' },
                { type: 'input', name: 'status', message: 'Product status:' }
            ]);
            await addProduct(name, description, price, stock, category, barcode, status);
            console.log('Product added successfully.');
            break;

        case 'List products':
            await listProducts();
            break;

        case 'Update a product':
            const { idProduct, newName, newDescription, newPrice, newStock, newCategory, newBarcode, newStatus } = await inquirer.prompt([
                { type: 'number', name: 'idProduct', message: 'ID of the product to update:' },
                { type: 'input', name: 'newName', message: 'New product name:' },
                { type: 'input', name: 'newDescription', message: 'New description:' },
                { type: 'number', name: 'newPrice', message: 'New price:' },
                { type: 'number', name: 'newStock', message: 'New stock quantity:' },
                { type: 'input', name: 'newCategory', message: 'New product category:' },
                { type: 'input', name: 'newBarcode', message: 'New product barcode:' },
                { type: 'input', name: 'newStatus', message: 'New product status:' }
            ]);
            await updateProduct(idProduct, newName, newDescription, newPrice, newStock, newCategory, newBarcode, newStatus);
            console.log('Product updated successfully.');
            break;

        case 'Delete a product':
            const { idToDelete } = await inquirer.prompt([
                { type: 'number', name: 'idToDelete', message: 'ID of the product to delete:' }
            ]);
            await deleteProduct(idToDelete);
            console.log('Product deleted successfully.');
            break;
            case 'Back':
            return mainMenu();
    }
    return manageProducts();
}
            

//         case 'Back':
//             console.log('Going back to the main menu.');
//             break;
//     }
// }

mainMenu();