import inquirer from 'inquirer';
import validator from 'validator';
import { addCustomer, listCustomers, updateCustomer, deleteCustomer, getCustomerById } from './modules/customers.js';
import { addOrder, listOrders, updateOrder, deleteOrder, getOrderById } from './modules/orders.js';
import { addPayment, listPayments, updatePayment, deletePayment, getPaymentById } from './modules/payments.js';
import { addProduct, listProducts, updateProduct, deleteProduct, getProductById } from './modules/products.js';

// Validate email
function validateEmail(email) {
    return validator.isEmail(email) || 'Please enter a valid email address';
}

// Validate phone
function validatePhone(phone) {
    const phonePattern = /^[0-9]+$/;
    return phonePattern.test(phone) || 'Phone number must only contain digits';
}

// Validate number
function validateNumber(value) {
    return !isNaN(value) && Number(value) > 0 ? true : 'Must be a positive number';
}

// Validate product fields
function validateProductFields(price, stock) {
    if (price <= 0) return 'Price must be greater than zero';
    if (stock < 0) return 'Stock cannot be negative';
    return true;
}

// Check if a customer exists
async function doesCustomerExist(id) {
    const customer = await getCustomerById(id);
    return customer !== undefined;
}

// Check if a product exists
async function doesProductExist(id) {
    const product = await getProductById(id);
    return product !== undefined;
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
            const { name, email, phone, address } = await inquirer.prompt([
                { type: 'input', name: 'name', message: 'Customer name:' },
                { type: 'input', name: 'email', message: 'Customer email:', validate: validateEmail },
                { type: 'input', name: 'phone', message: 'Customer phone:', validate: validatePhone },
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
                { type: 'input', name: 'newEmail', message: 'New email:', validate: validateEmail },
                { type: 'input', name: 'newPhone', message: 'New phone:', validate: validatePhone },
                { type: 'input', name: 'newAddress', message: 'New address:' }
            ]);

            const idExists = await doesCustomerExist(id);
            if (!idExists) {
                console.log('Customer ID not found. Please enter a valid ID.');
                return manageCustomers();
            }

            try {
                await updateCustomer(id, newName, newEmail, newPhone, newAddress);
                console.log('Customer updated successfully.');
            } catch (error) {
                console.error('Error updating customer:', error);
            }
            break;

            case 'Delete a customer': {
                let idToDelete;
            
                while (true) {
                    const { inputId } = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'inputId',
                            message: 'ID of the customer to delete:',
                            validate: (input) => {
                                const id = parseInt(input, 10);
                                if (isNaN(id) || id <= 0) {
                                    return 'Please enter a valid ID (positive number).';
                                }
                                return true;
                            },
                        },
                    ]);
            
                    // Convertir l'entrée en un nombre
                    idToDelete = parseInt(inputId, 10);
            
                    try {
                        // Vérifier si le client existe
                        const idToDeleteExists = await doesCustomerExist(idToDelete);
                        if (!idToDeleteExists) {
                            console.log(`No customer found with ID ${idToDelete}. Returning to the menu.`);
                            return manageCustomers(); // Retour au menu si l'ID est inexistant
                        }
            
                        // Supprimer le client
                        await deleteCustomer(idToDelete);
                        console.log(`Customer with ID ${idToDelete} has been successfully deleted.`);
                        return manageCustomers(); // Retour au menu après suppression
                    } catch (error) {
                        console.error('An error occurred:', error.message);
                        return manageCustomers(); // Retour au menu en cas d'erreur
                    }
                }
            }
            
            
            
            

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
    try {
        let customerId;
        // Validation du Customer ID
        while (true) {
            const { inputCustomerId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'inputCustomerId',
                    message: 'Customer ID:',
                    validate: (input) => {
                        const id = parseInt(input, 10);
                        if (isNaN(id) || id <= 0) {
                            return 'Customer ID must be a positive number.';
                        }
                        return true;
                    }
                }
            ]);

            customerId = parseInt(inputCustomerId, 10);

            try {
                const customer = await getCustomerById(customerId);
                if (customer) {
                    console.log(`Client vérifié : ${customer.name}`);
                    break; // Customer ID validé
                } else {
                    console.log(`Customer with ID ${customerId} does not exist. Please try again.`);
                }
            } catch (error) {
                console.log(`Erreur : ${error.message}`);
            }
        }

        // Collecte des autres détails de la commande
        const { date, deliveryAddress, trackNumber, status } = await inquirer.prompt([
            { type: 'input', name: 'date', message: 'Order date (YYYY-MM-DD):' },
            { type: 'input', name: 'deliveryAddress', message: 'Order delivery address:' },
            { type: 'input', name: 'trackNumber', message: 'Order track number:' },
            { type: 'list', name: 'status', message: 'Order status:', choices: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] }
        ]);

        let orderDetails = [];
        let addMoreDetails = true;

        while (addMoreDetails) {
            let productId;
            // Validation du Product ID
            while (true) {
                const { inputProductId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'inputProductId',
                        message: 'Product ID:',
                        validate: (input) => {
                            const id = parseInt(input, 10);
                            if (isNaN(id) || id <= 0) {
                                return 'Product ID must be a positive number.';
                            }
                            return true;
                        }
                    }
                ]);

                productId = parseInt(inputProductId, 10);
            
                const productExists = await doesProductExist(productId);
                if (productExists) {
                    break; // Product ID validé
                } else {
                    console.log(`Product with ID ${productId} does not exist. Please try again.`);
                }
            }

            const { quantity, price } = await inquirer.prompt([
                { type: 'number', name: 'quantity', message: 'Quantity:' },
                { type: 'number', name: 'price', message: 'Price per unit:' }
            ]);

            orderDetails.push({ productId, quantity, price });

            const { addMore } = await inquirer.prompt([
                { type: 'confirm', name: 'addMore', message: 'Ajouter un autre produit ?' }
            ]);

            addMoreDetails = addMore;
        }

        // Ajout de la commande
        await addOrder(customerId, date, deliveryAddress, trackNumber, status, orderDetails);
        console.log('Commande ajoutée avec succès.');
    } catch (error) {
        console.error(`Erreur lors de l'ajout de la commande : ${error.message}`);
    }
    break;



        case 'Update an order':
            try {
                const { idOrder, newCustomerId, newDate, newDeliveryAddress, newTrackNumber, newStatus } = await inquirer.prompt([
                    { type: 'number', name: 'idOrder', message: 'ID of the order to update:' },
                    { type: 'number', name: 'newCustomerId', message: 'New Customer ID:' },
                    { type: 'input', name: 'newDate', message: 'New order date (YYYY-MM-DD):' },
                    { type: 'input', name: 'newDeliveryAddress', message: 'New delivery address:' },
                    { type: 'input', name: 'newTrackNumber', message: 'New track number:' },
                    { type: 'list', name: 'newStatus', message: 'New status:', choices: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] }
                ]);

                const customer = await getCustomerById(newCustomerId);
                if (!customer) {
                    throw new Error(`Customer with ID ${newCustomerId} does not exist.`);
                }

                await updateOrder(idOrder, newCustomerId, newDate, newDeliveryAddress, newTrackNumber, newStatus);
                console.log('Order updated successfully.');
            } catch (error) {
                console.error('Error updating order:', error.message);
            }
            break;

            case 'Delete an order': {
                let idOrderToDelete;
            
                while (true) {
                    const { inputId } = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'inputId',
                            message: 'ID of the order to delete:',
                            validate: (input) => {
                                const id = parseInt(input, 10);
                                if (isNaN(id) || id <= 0) {
                                    return 'Please enter a valid ID (positive number).';
                                }
                                return true;
                            },
                        },
                    ]);
            
                    // Convertir l'entrée en un nombre
                    idOrderToDelete = parseInt(inputId, 10);
            
                    try {
                        // Tenter de supprimer la commande
                        const affectedRows = await deleteOrder(idOrderToDelete);
            
                        if (affectedRows > 0) {
                            console.log(`Order with ID ${idOrderToDelete} deleted successfully.`);
                        } else {
                            console.log(`No order found with the ID ${idOrderToDelete}.`);
                        }
                        return manageOrders(); // Retour au menu après action
                    } catch (error) {
                        console.error('Error deleting order:', error.message);
                        return manageOrders(); // Retour au menu en cas d'erreur
                    }
                }
            }
            
            

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
            try {
                const { orderId, amount, date, paymentMethod } = await inquirer.prompt([
                    { type: 'number', name: 'orderId', message: 'Order ID:' },
                    { type: 'number', name: 'amount', message: 'Amount:', validate: validateNumber },
                    { type: 'input', name: 'date', message: 'Payment date (YYYY-MM-DD):' },
                    { type: 'list', name: 'paymentMethod', message: 'Payment method:', choices: ['Credit Card', 'Cash', 'Bank Transfer'] }
                ]);

                const orderExists = await getOrderById(orderId);
                if (!orderExists) {
                    throw new Error(`Order with ID ${orderId} does not exist.`);
                }

                await addPayment(orderId, amount, date, paymentMethod);
                console.log('Payment added successfully.');
            } catch (error) {
                console.error('Error adding payment:', error.message);
            }
            break;

        case 'List payments':
            try {
                await listPayments();
            } catch (error) {
                console.error('Error listing payments:', error.message);
            }
            break;

        case 'Update a payment':
            try {
                const { idPayment, newOrderId, newAmount, newDate, newPaymentMethod } = await inquirer.prompt([
                    { type: 'number', name: 'idPayment', message: 'ID of the payment to update:' },
                    { type: 'number', name: 'newOrderId', message: 'New Order ID:' },
                    { type: 'number', name: 'newAmount', message: 'New amount:', validate: validateNumber },
                    { type: 'input', name: 'newDate', message: 'New payment date (YYYY-MM-DD):' },
                    { type: 'list', name: 'newPaymentMethod', message: 'New payment method:', choices: ['Credit Card', 'Cash', 'Bank Transfer'] }
                ]);

                const orderExistsForUpdate = await getOrderById(newOrderId);
                if (!orderExistsForUpdate) {
                    throw new Error(`Order with ID ${newOrderId} does not exist.`);
                }

                await updatePayment(idPayment, newOrderId, newAmount, newDate, newPaymentMethod);
                console.log('Payment updated successfully.');
            } catch (error) {
                console.error('Error updating payment:', error.message);
            }
            break;

            case 'Delete a payment': {
                let idPaymentToDelete;
            
                while (true) {
                    const { inputId } = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'inputId',
                            message: 'ID of the payment to delete:',
                            validate: (input) => {
                                const id = parseInt(input, 10);
                                if (isNaN(id) || id <= 0) {
                                    return 'Please enter a valid ID (positive number).';
                                }
                                return true;
                            },
                        },
                    ]);
            
                    // Convertir l'entrée en un nombre
                    idPaymentToDelete = parseInt(inputId, 10);
            
                    try {
                        // Tenter de supprimer le paiement
                        const result = await deletePayment(idPaymentToDelete);
            
                        if (result.affectedRows > 0) {
                            console.log(`Payment with ID ${idPaymentToDelete} deleted successfully.`);
                        } else {
                            console.log(`No payment found with the ID ${idPaymentToDelete}.`);
                        }
                        return managePayments(); // Retour au menu après action
                    } catch (error) {
                        if (error.message === 'Payment not found.') {
                            console.error('No payment found with that ID.');
                        } else {
                            console.error('Error deleting payment:', error.message);
                        }
                        return managePayments(); // Retour au menu en cas d'erreur
                    }
                }
            }
            
            

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
            try {
                const { name, description, price, stock, category, barcode, status } = await inquirer.prompt([
                    { type: 'input', name: 'name', message: 'Product name:' },
                    { type: 'input', name: 'description', message: 'Product description:' },
                    { type: 'number', name: 'price', message: 'Product price:', validate: validateNumber },
                    { type: 'number', name: 'stock', message: 'Stock quantity:', validate: validateNumber },
                    { type: 'input', name: 'category', message: 'Product category:' },
                    { type: 'input', name: 'barcode', message: 'Product barcode:' },
                    { type: 'input', name: 'status', message: 'Product status:' }
                ]);

                const validation = validateProductFields(price, stock);
                if (validation !== true) {
                    throw new Error(validation);
                }

                await addProduct(name, description, price, stock, category, barcode, status);
                console.log('Product added successfully.');
            } catch (error) {
                console.error('Error adding product:', error.message);
            }
            break;

        case 'List products':
            try {
                await listProducts();
            } catch (error) {
                console.error('Error listing products:', error.message);
            }
            break;

        case 'Update a product':
            try {
                const { idProduct, newName, newDescription, newPrice, newStock, newCategory, newBarcode, newStatus } = await inquirer.prompt([
                    { type: 'number', name: 'idProduct', message: 'ID of the product to update:' },
                    { type: 'input', name: 'newName', message: 'New product name:' },
                    { type: 'input', name: 'newDescription', message: 'New description:' },
                    { type: 'number', name: 'newPrice', message: 'New price:', validate: validateNumber },
                    { type: 'number', name: 'newStock', message: 'New stock quantity:', validate: validateNumber },
                    { type: 'input', name: 'newCategory', message: 'New product category:' },
                    { type: 'input', name: 'newBarcode', message: 'New product barcode:' },
                    { type: 'input', name: 'newStatus', message: 'New product status:' }
                ]);

                const productExists = await doesProductExist(idProduct);
                if (!productExists) {
                    console.log('Product ID not found. Please enter a valid ID.');
                    return manageProducts();
                }

                const validation = validateProductFields(newPrice, newStock);
                if (validation !== true) {
                    throw new Error(validation);
                }

                await updateProduct(idProduct, newName, newDescription, newPrice, newStock, newCategory, newBarcode, newStatus);
                console.log('Product updated successfully.');
            } catch (error) {
                console.error('Error updating product:', error.message);
            }
            break;

            case 'Delete a product': {
                let idToDelete;
            
                while (true) {
                    const { inputId } = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'inputId',
                            message: 'ID of the product to delete:',
                            validate: (input) => {
                                const id = parseInt(input, 10);
                                if (isNaN(id) || id <= 0) {
                                    return 'Please enter a valid ID (positive number).';
                                }
                                return true;
                            },
                        },
                    ]);
            
                    // Convertir l'entrée en un nombre
                    idToDelete = parseInt(inputId, 10);
            
                    try {
                        // Tenter de supprimer le produit
                        const isDeleted = await deleteProduct(idToDelete);
            
                        if (isDeleted) {
                            console.log(`Product with ID ${idToDelete} deleted successfully.`);
                        } else {
                            console.log(`No product found with ID ${idToDelete}.`);
                        }
                        return manageProducts(); // Retour au menu après action
                    } catch (error) {
                        console.error('Error deleting product:', error.message);
                        return manageProducts(); // Retour au menu en cas d'erreur
                    }
                }
            }
            
            

        case 'Back':
            return mainMenu();
    }
    return manageProducts();
}


// Main Menu
async function mainMenu() {
    const choice = await inquirer.prompt([
        {
            type: 'list',
            name: 'menuChoice',
            message: 'Choose a category to manage:',
            choices: ['Manage Customers', 'Manage Orders', 'Manage Payments', 'Manage Products', 'Quit']
        }
    ]);

    switch (choice.menuChoice) {
        case 'Manage Customers':
            return manageCustomers();
        case 'Manage Orders':
            return manageOrders();
        case 'Manage Payments':
            return managePayments();
        case 'Manage Products':
            return manageProducts();
        case 'Quit':
            console.log('Goodbye!');
            process.exit(0);
    }
}

mainMenu();
