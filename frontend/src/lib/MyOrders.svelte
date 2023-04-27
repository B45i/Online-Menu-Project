<script>
    import { useParams } from 'svelte-navigator';
    import Navbar from './Navbar.svelte';
    import { onMount } from 'svelte';
    import { getMyOrders, updateStatus } from '../api/api';
    import { getTotal } from '../utils/finance';

    const params = useParams();
    let orders = [];

    onMount(() => {
        fetchMyOrders();
        setInterval(fetchMyOrders, 1500);
    });

    async function fetchMyOrders() {
        const response = await getMyOrders($params.id);
        orders = response.data || [];
    }

    async function cancelItem(item) {
        if (item.status !== 'PENDING') {
            return;
        }

        const response = await updateStatus(item.order_item_id, 'CANCELLED');
        fetchMyOrders();
    }
</script>

<Navbar isAdmin={false} tableId={$params.id} />
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
                    <th scope="col">Status</th>
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
                        <td>
                            {#if item.status === 'PENDING'}
                                <button
                                    on:click={e => cancelItem(item)}
                                    class="btn btn-sm btn-danger">Cancel</button
                                >
                            {:else if item.status === 'COMPLETE'}
                                <span class="text-success">Served</span>
                            {:else if item.status === 'PREPARED'}
                                <span class="text-primary">Prepared</span>
                            {:else if item.status === 'CANCELLED'}
                                <span class="text-danger">Cancelled</span>
                            {:else}
                                {item.status}
                            {/if}
                        </td>
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
