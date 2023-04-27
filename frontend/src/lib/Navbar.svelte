<script>
    import { Link } from 'svelte-navigator';
    import { useNavigate } from 'svelte-navigator';

    export let isAdmin = true;
    export let tableId = null;

    let restaurantName = 'Hotel ABC';

    const navigate = useNavigate();

    function logout() {
        console.log(tableId);
        localStorage.removeItem('token');
        navigate('/admin/login');
    }
</script>

<nav class="navbar navbar-dark bg-black">
    <div class="container-fluid">
        <div class="navbar-brand">{restaurantName}</div>
        <div class="d-flex gap-2">
            {#if isAdmin}
                <Link class="btn btn-sm btn-secondary " to="/admin/orders"
                    >Orders</Link
                >

                <Link class="btn btn-sm btn-secondary " to="/admin/past-orders"
                    >Past Orders</Link
                >

                <Link class="btn btn-sm btn-secondary " to="/admin/menu"
                    >Edit Menu</Link
                >

                <Link class="btn btn-sm btn-secondary " to="/admin/add-user"
                    >Add user</Link
                >

                <Link
                    class="btn btn-sm btn-secondary "
                    to="/admin/view-feedback">View feedbacks</Link
                >

                <button on:click={logout} class="btn btn-sm btn-danger"
                    >Logout</button
                >
            {:else}
                <Link
                    class="btn btn-sm btn-sm btn-secondary "
                    to={`/feedback/${tableId}`}>Submit feedback</Link
                >

                <Link
                    class="btn btn-sm btn-sm btn-secondary "
                    to={`/my-orders/${tableId}`}
                >
                    Orders</Link
                >
            {/if}
        </div>
    </div>
</nav>
