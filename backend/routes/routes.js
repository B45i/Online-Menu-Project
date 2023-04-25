import { Router } from 'express';
import {
    getMenu,
    addFood,
    getOrders,
    placeOrder,
    completePayment,
    deleteFood,
} from '../services/service.js';

const apiRouter = Router();

apiRouter.get('/api/menu', async (req, res) => {
    const menu = await getMenu();
    res.json(menu);
});

//  add food
apiRouter.post('/api/add-food', async (req, res) => {
    const result = await addFood(req.body);
    return res.json(result);
});

//  get all orders
apiRouter.get('/api/orders', async (req, res) => {
    const orders = await getOrders();
    return res.json(orders);
});

apiRouter.post('/api/place-order', async (req, res) => {
    const order = await placeOrder(req.body);
    res.json(order);
});

apiRouter.post('/api/complete-payment', async (req, res) => {
    completePayment(req.body.id);
    res.send('Payment success');
});

apiRouter.delete('/api/delete-food/:id', async (req, res) => {
    deleteFood(req.params.id);
    res.send('Food deleted');
});

export default apiRouter;
