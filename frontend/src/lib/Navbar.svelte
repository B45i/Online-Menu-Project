<script>
    export let isAdmin = true;
    let restaurantName = 'Hotel ABC';
</script>

<nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">{restaurantName}</a>
        <div class="d-flex gap-2">
            {#if isAdmin}
                <a class="btn btn-outline-light" href="/orders">Orders</a>
                <a class="btn btn-outline-light" href="/menu">Menu</a>
            {/if}
        </div>
    </div>
</nav>
