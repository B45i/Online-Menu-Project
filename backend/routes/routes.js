import { Router } from 'express';
import {
    getMenu,
    addFood,
    getOrders,
    placeOrder,
    completePayment,
    deleteFood,
    getUser,
    addUser,
} from '../services/service.js';

import authMiddleware from '../middleware/authentication.js';

import jwt from 'jsonwebtoken';

const apiRouter = Router();

apiRouter.get('/api/menu', async (req, res) => {
    const menu = await getMenu();
    res.json(menu);
});

//  add food
apiRouter.post('/api/add-food', authMiddleware, async (req, res) => {
    const result = await addFood(req.body);
    return res.json(result);
});

//  get all orders
apiRouter.get('/api/orders', authMiddleware, async (req, res) => {
    const orders = await getOrders();
    return res.json(orders);
});

apiRouter.post('/api/place-order', async (req, res) => {
    const order = await placeOrder(req.body);
    res.json(order);
});

apiRouter.post('/api/complete-payment', authMiddleware, async (req, res) => {
    completePayment(req.body.id);
    res.send('Payment success');
});

apiRouter.delete('/api/delete-food/:id', authMiddleware, async (req, res) => {
    deleteFood(req.params.id);
    res.send('Food deleted');
});

apiRouter.post('/api/login', async (req, res) => {
    // Check the username and password in the request body
    const { username, password } = req.body;

    try {
        console.log(username, password);
        const rows = await getUser(username);

        // If the user is not found in the database, return an error
        if (!rows.length) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Password check
        if (user.password !== password) {
            return res
                .status(401)
                .json({ message: 'User name or password is correct' });
        }

        const token = jwt.sign({ username }, 'ACCESS_TOKEN_SECRET');
        res.json({ token });
    } catch (error) {
        console.log(error);
    }
});

apiRouter.post('/api/signup', async (req, res) => {
    // Check the username and password in the request body
    const { username, password } = req.body;

    try {
        const rows = await getUser(username);

        // if use name exists then throw error
        if (rows.length) {
            return res.status(404).json({ message: 'User already exists' });
        }

        await addUser(username, password);

        res.json({ message: 'user added' });
    } catch (error) {
        console.log(error);
    }
});

export default apiRouter;
