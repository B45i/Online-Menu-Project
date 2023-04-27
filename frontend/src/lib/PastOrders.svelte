<script>
    import { onMount, onDestroy } from 'svelte';

    import { getPastOrders } from '../api/api';
    import Navbar from './Navbar.svelte';
    import RouteGuard from './RouteGuard.svelte';

    let orders = [];
    let loadInterval;

    $: totalRevenue = orders?.reduce(
        (acc, cur) => acc + getTotal(cur.items),
        0
    );

    onMount(() => {
        loadOrders();
        loadInterval = setInterval(loadOrders, 1500);
    });

    onDestroy(() => {
        if (loadInterval) {
            clearInterval(loadInterval);
        }
    });

    async function loadOrders() {
        let response = await getPastOrders();
        orders = response.data;
    }

    function getTotal(items) {
        return items?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    }
</script>

<main>
    <RouteGuard />
    <Navbar isAdmin={true} />
    <div class="d-flex justify-content-between">
        <h4 class="m-3">Past Orders</h4>
        <h4 class="m-3">Total Revenue: {totalRevenue}Rs</h4>
    </div>
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
                        <td class="fw-bold">{getTotal(order.items)}</td>
                    </tr>
                </tbody>
            </table>
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
