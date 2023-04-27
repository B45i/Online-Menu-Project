import axios from 'axios';

// if development mode then use local backend, or use deployed backend
axios.defaults.baseURL = import.meta.env.DEV
    ? 'http://localhost:3001/'
    : 'https://smakrt-menu.onrender.com/';

function getHeader() {
    return {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
}

export async function getMenu() {
    return axios.get('api/menu');
}

export async function placeOrder(order) {
    return axios.post('api/place-order', order);
}

export async function getOrders() {
    return axios.get('api/orders', getHeader());
}

export async function completePayment(id) {
    return axios.post('api/complete-payment', { id }, getHeader());
}

export async function addFood(food) {
    return await axios.post('api/add-food', food, getHeader());
}

export async function deleteFood(id) {
    return await axios.delete('api/delete-food/' + id, getHeader());
}

export async function login(username, password) {
    return await axios.post('api/login', { username, password });
}

export async function addUser(username, password) {
    return await axios.post('api/signup', { username, password });
}

export async function updateStatus(id, status) {
    return await axios.post('api/update-status', { id, status }, getHeader());
}

export async function addFeedback(feedback) {
    return await axios.post('api/feedback', feedback);
}

export async function getFeedbacks() {
    return await axios.get('api/feedback', getHeader());
}
