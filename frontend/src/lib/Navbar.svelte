<script>
    import { Link } from 'svelte-navigator';

    export let isAdmin = true;
    let restaurantName = 'Hotel ABC';
</script>

<nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">{restaurantName}</a>
        <div class="d-flex gap-2">
            {#if isAdmin}
                <Link class="btn btn-outline-light" to="/admin/orders"
                    >Orders</Link
                >

                <Link class="btn btn-outline-light" to="/admin/menu"
                    >Edit Menu</Link
                >
            {/if}
        </div>
    </div>
</nav>
