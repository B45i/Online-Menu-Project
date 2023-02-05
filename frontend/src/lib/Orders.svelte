<script>
    import { onMount } from 'svelte';
    import { completePayment, getOrders } from '../api/api';
    import AdminNav from './AdminNav.svelte';

    let orders = [];

    onMount(() => {
        loadOrders();
        // setInterval(loadOrders, 1500);
    });

    async function loadOrders() {
        orders = await getOrders();
    }

    async function completeOrder(order) {
        const data = await completePayment(order.order_id);
        loadOrders();
    }

    function getTotal(items) {
        return items?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    }
</script>

<main>
    <AdminNav />
    <div class="orders">
        <ul class="order-list">
            {#each orders as order}
                <li class="order-item">
                    <div class="order-heading">
                        <h4>{order.seat_id}</h4>
                        <div>
                            Order ID: {order.order_id}
                        </div>
                    </div>

                    <hr />

                    <table class="order-table">
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                        </tr>
                        {#each order.items as item}
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.price}</td>
                            </tr>
                        {/each}
                        <tr class="text-bold">
                            <td colspan="3">Total</td>
                            <td>Rs. {getTotal(order.items)}</td>
                        </tr>
                    </table>

                    <div class="order-footer">
                        <button on:click={e => completeOrder(order)}
                            >Complete order</button
                        >
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</main>

<style>
    .orders {
        flex-grow: 1;
    }

    .order-list {
        margin: 1rem;
    }

    .order-item {
        margin-bottom: 1rem;
        padding: 1rem;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
        border-radius: 5px;
    }

    .order-item:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 4px 12px;
    }

    .order-heading {
        display: flex;
        justify-content: space-between;
    }

    .order-footer {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
    }
</style>
