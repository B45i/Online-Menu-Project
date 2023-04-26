import axios from 'axios';

// if development mode then use local backend, or use deployed backend
axios.defaults.baseURL = import.meta.env.DEV
    ? 'http://localhost:3001/'
    : 'https://smakrt-menu.onrender.com/';

function getHeader() {
    return {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), // not setting in initial state
        },
    };
}

let BASE_URL = '';
export async function getMenu() {
    return axios.get('api/menu');
}

export async function placeOrder(order) {
    const response = await fetch(BASE_URL + 'api/place-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });
    return;
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
