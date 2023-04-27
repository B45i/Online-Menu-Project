<script>
    import { Link } from 'svelte-navigator';
    import { useNavigate } from 'svelte-navigator';

    export let isAdmin = true;
    let restaurantName = 'Hotel ABC';

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        navigate('/admin/login');
    }
</script>

<nav class="navbar navbar-dark bg-black">
    <div class="container-fluid">
        <div class="navbar-brand">{restaurantName}</div>
        <div class="d-flex gap-2">
            {#if isAdmin}
                <Link class="btn btn-secondary " to="/admin/orders">Orders</Link
                >

                <Link class="btn btn-secondary " to="/admin/menu"
                    >Edit Menu</Link
                >

                <Link class="btn btn-secondary " to="/admin/add-user"
                    >Add user</Link
                >
                <button on:click={logout} class="btn btn-secondary"
                    >Logout</button
                >
            {:else}
                <Link class="btn btn-sm btn-secondary " to="/feedback"
                    >Submit feedback</Link
                >
            {/if}
        </div>
    </div>
</nav>
