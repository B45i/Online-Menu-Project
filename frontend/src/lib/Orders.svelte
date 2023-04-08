<script>
    import { onMount } from 'svelte';
    import { completePayment, getOrders } from '../api/api';
    import Navbar from './Navbar.svelte';

    let orders = [
        {
            seat_id: 1,
            order_id: 101,
            items: [
                { name: 'Cheeseburger', price: 9.99, quantity: 1 },
                { name: 'Fries', price: 3.99, quantity: 2 },
                { name: 'Soda', price: 1.99, quantity: 1 },
            ],
        },
        {
            seat_id: 2,
            order_id: 102,
            items: [
                { name: 'Pizza', price: 14.99, quantity: 1 },
                { name: 'Garlic Bread', price: 5.99, quantity: 1 },
                { name: 'Beer', price: 4.99, quantity: 2 },
            ],
        },
        {
            seat_id: 3,
            order_id: 103,
            items: [
                { name: 'Salad', price: 8.99, quantity: 1 },
                { name: 'Soup', price: 6.99, quantity: 1 },
                { name: 'Water', price: 0.99, quantity: 2 },
            ],
        },
        {
            seat_id: 4,
            order_id: 104,
            items: [
                { name: 'Steak', price: 19.99, quantity: 1 },
                { name: 'Baked Potato', price: 4.99, quantity: 1 },
                { name: 'Wine', price: 12.99, quantity: 1 },
                { name: 'Cheesecake', price: 6.99, quantity: 1 },
            ],
        },
        {
            seat_id: 5,
            order_id: 105,
            items: [
                { name: 'Fish and Chips', price: 11.99, quantity: 1 },
                { name: 'Cole Slaw', price: 2.99, quantity: 1 },
                { name: 'Iced Tea', price: 1.99, quantity: 2 },
                { name: 'Apple Pie', price: 5.99, quantity: 1 },
            ],
        },
    ];

    onMount(() => {
        // loadOrders();
        // setInterval(loadOrders, 1500);
    });

    async function loadOrders() {
        // orders = await getOrders();
    }

    async function completeOrder(order) {
        // const data = await completePayment(order.order_id);
        // loadOrders();
    }

    function getTotal(items) {
        // return items?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    }
</script>

<main>
    <Navbar isAdmin={true} />
    <h4 class="m-3">Orders:</h4>
    {#each orders as order}
        <div class="p-4 border m-3 rounded shadow">
            <div class="d-flex justify-content-between mb-2 fw-bold">
                <div>Table: {order.seat_id}</div>
                <div>Order ID: {order.order_id}</div>
            </div>
            <table class="table border">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {#each order.items as item, i}
                        <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <button class="btn btn-primary">Complete order</button>
        </div>
    {/each}
</main>

<style>
</style>
