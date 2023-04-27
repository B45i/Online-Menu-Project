import pg from 'pg';
import { groupBy, values } from 'lodash-es';

const connectionString =
    'postgres://playground_bpot_user:yZEjXiwBLj8DVMGuU3V3yfViJeyS4vBr@dpg-ch399ptgk4qarql88leg-a.singapore-postgres.render.com/playground_bpot';

const pgClient = new pg.Client(connectionString + '?ssl=true');

pgClient.connect();

//  get menu
export async function getMenu() {
    const { rows } = await pgClient.query('SELECT * FROM FOOD_MENU');
    return rows;
}

// add new food to menu
export async function addFood(food) {
    const { rows } = await pgClient.query(
        `INSERT INTO food_menu (name, price, image_url, description, category) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [food.name, food.price, food.image_url, food.description, food.category]
    );
    return rows;
}

// get orders
export async function getOrders(completed = false) {
    const { rows } = await pgClient.query(`
        SELECT 
            food_order.id as order_id,
            food_order.seat_id,
            food_order_items.food_id,
            food_menu.name,
            food_menu.price,
            food_order_items.quantity,
            food_order_items.status,
            food_order_items.id as order_item_id
        FROM food_order
        JOIN food_order_items ON food_order.id = food_order_items.order_id
        JOIN food_menu ON food_order_items.food_id = food_menu.id
		WHERE PAYMENT_COMPLETED IS ${completed ? 'TRUE' : 'FALSE'}
    `);

    const groupedOrders = groupBy(rows, 'order_id');
    const result = Object.values(groupedOrders).map(order => ({
        order_id: order[0].order_id,
        seat_id: order[0].seat_id,
        items: order
            .map(item => ({
                food_id: item.food_id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                status: item.status,
                order_item_id: item.order_item_id,
            }))
            .sort((a, b) => a.name.localeCompare(b.name)),
    }));

    return result;
}

export async function getMyOrders(seatId) {
    const { rows } = await pgClient.query(
        `
        SELECT 
            food_order.id as order_id,
            food_order.seat_id,
            food_order_items.food_id,
            food_menu.name,
            food_menu.price,
            food_order_items.quantity,
            food_order_items.status,
            food_order_items.id as order_item_id
        FROM food_order
        JOIN food_order_items ON food_order.id = food_order_items.order_id
        JOIN food_menu ON food_order_items.food_id = food_menu.id
		WHERE PAYMENT_COMPLETED IS FALSE AND food_order.seat_id = $1
    `,
        [seatId]
    );

    const groupedOrders = groupBy(rows, 'order_id');
    const result = Object.values(groupedOrders).map(order => ({
        order_id: order[0].order_id,
        seat_id: order[0].seat_id,
        items: order
            .map(item => ({
                food_id: item.food_id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                status: item.status,
                order_item_id: item.order_item_id,
            }))
            .sort((a, b) => a.name.localeCompare(b.name)),
    }));

    return result;
}

// place order
export async function placeOrder(order) {
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

export async function appendOrder(orderId, order) {
    const { items } = order;

    const itemsString = items
        .map(item => `(${item.id}, ${orderId}, ${item.quantity})`)
        .join(',');

    const orderQuery = `INSERT INTO food_order_items (food_id, order_id, quantity)
                        VALUES ${itemsString}`;
    await pgClient.query(orderQuery);
}

export async function getExistingOrder(seatId) {
    const { rows } = await pgClient.query(
        `SELECT * FROM food_order WHERE payment_completed IS FALSE AND seat_id = $1`,
        [seatId]
    );
    return rows;
}

export async function completePayment(orderId) {
    await pgClient.query(
        `UPDATE food_order SET payment_completed = true WHERE id = ${orderId};`
    );
}

export async function deleteFood(id) {
    await pgClient.query(`DELETE FROM food_menu WHERE id = ${id};`);
}

export async function getUser(username) {
    const { rows } = await pgClient.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
    );
    return rows;
}

export async function addUser(username, password) {
    const { rows } = await pgClient.query(
        `INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *`,
        [username, password]
    );
    return rows;
}

export async function updateStatus(id, status) {
    await pgClient.query(
        `UPDATE food_order_items SET status = '${status}' WHERE id = ${id};`
    );
}

export async function addFeedback(feedback) {
    const { rows } = await pgClient.query(
        `INSERT INTO feedbacks (rating, feedback_text, seat_id)
        VALUES
        ($1, $2, $3) RETURNING *`,
        [feedback.rating, feedback.feedback_text, feedback.seat_id]
    );
    return rows;
}

export async function getFeedbacks() {
    const { rows } = await pgClient.query('SELECT * FROM feedbacks');
    return rows;
}
