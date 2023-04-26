<script>
    import { onMount } from 'svelte';
    import { generatePDF } from '../utils/pdf';

    import { completePayment, getOrders } from '../api/api';
    import Navbar from './Navbar.svelte';

    let orders = [];

    onMount(() => {
        loadOrders();
        setInterval(loadOrders, 1500);
    });

    async function loadOrders() {
        let response = await getOrders();
        orders = response.data;
    }

    async function completeOrder(order) {
        generatePDF(
            'ABC Restaurant',
            order.items,
            order.seat_id,
            order.order_id,
            getTotal(order.items)
        );
        const data = await completePayment(order.order_id);
        loadOrders();
    }

    function getTotal(items) {
        return items?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
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
                    <tr>
                        <th colspan="4">Total</th>
                        <td>{getTotal(order.items)}</td>
                    </tr>
                </tbody>
            </table>
            <button
                class="btn btn-primary"
                on:click={() => completeOrder(order)}>Complete order</button
            >
        </div>
    {/each}

    {#if orders.length === 0}
        <div class="text-center">
            <h4>No items found</h4>
        </div>
    {/if}
</main>

<style>
</style>
