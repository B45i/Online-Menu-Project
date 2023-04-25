// if developement mode then use local backend, or use deployed backend
const BASE_URL = import.meta.env.DEV
    ? 'http://localhost:3001/'
    : 'https://smakrt-menu.onrender.com/';

export async function getMenu() {
    const response = await fetch(BASE_URL + 'api/menu');
    return await response.json();
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
    const response = await fetch(BASE_URL + 'api/orders');
    return await response.json();
}

export async function completePayment(id) {
    const response = await fetch(BASE_URL + 'api/complete-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    });
    return await response.json();
}

export async function addFood(food) {
    const response = await fetch(BASE_URL + 'api/add-food', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
    });
    return await response.json();
}

export async function deleteFood(id) {
    const response = await fetch(BASE_URL + 'api/delete-food/' + id, {
        method: 'DELETE',
    });
    return await response.text;
}
