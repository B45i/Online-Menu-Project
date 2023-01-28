const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const { groupBy } = require('lodash');

// database connection
const connectionString = '';

const pgClient = new Client(connectionString + '?ssl=true');
pgClient.connect();

// express setup
const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

// api end points

// get menu
app.get('/api/menu', async (req, res) => {
    const menu = await getMenu();
    res.json(menu);
});

//  add food
app.post('/api/add-food', async (req, res) => {
    const result = await addFood(req.body);
    return res.json(result);
});

//  get all orders
app.get('/api/orders', async (req, res) => {
    const orders = await getOrders();
    return res.json(orders);
});

app.post('/api/place-order', async (req, res) => {
    const order = await placeOrder(req.body);
    res.json(order);
});

app.post('/api/complete-payment', async (req, res) => {
    completePayment(req.body.id);
    res.send('Payment success');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//  database functions

//  get menu
async function getMenu() {
    const { rows } = await pgClient.query('SELECT * FROM FOOD_MENU');
    return rows;
}

// add new food to menu
async function addFood(food) {
    const { rows } = await pgClient.query(
        `INSERT INTO food_menu (name, price, image_url, description) VALUES ($1, $2, $3, $4) RETURNING *`,
        [food.name, food.price, food.image_url, food.description]
    );
    return rows;
}

// get orders
async function getOrders() {
    const { rows } = await pgClient.query(`
        SELECT 
            food_order.id as order_id,
            food_order.seat_id,
            food_order_items.food_id,
            food_menu.name,
            food_order_items.quantity
        FROM food_order
        JOIN food_order_items ON food_order.id = food_order_items.order_id
        JOIN food_menu ON food_order_items.food_id = food_menu.id
		WHERE PAYMENT_COMPLETED IS false
    `);

    const groupedOrders = groupBy(rows, 'order_id');
    const result = Object.values(groupedOrders).map(order => ({
        order_id: order[0].order_id,
        seat_id: order[0].seat_id,
        items: order.map(item => ({
            food_id: item.food_id,
            name: item.name,
            quantity: item.quantity,
        })),
    }));

    return result;
}

// place order
async function placeOrder(order) {
    const { seat_id, items } = order;
    const { rows } = await pgClient.query(
        `INSERT INTO food_order (seat_id) VALUES ($1) RETURNING id;`,
        [seat_id]
    );
    const orderId = rows[0].id;

    const itemsString = items
        .map(item => `(${item.id}, ${orderId}, ${item.quantity})`)
        .join(',');

    const orderQuery = `INSERT INTO food_order_items (food_id, order_id, quantity)
                            VALUES ${itemsString}`;
    await pgClient.query(orderQuery);
}

async function completePayment(orderId) {
    await pgClient.query(
        `UPDATE food_order SET payment_completed = true WHERE id = ${orderId};`
    );
}
