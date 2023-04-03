<script>
    import { Link } from 'svelte-navigator';
</script>

<nav>
    <h4>Admin</h4>
    <Link to="/admin/orders">Orders</Link>
    <Link to="">Menu</Link>
</nav>

<style>
    nav {
        display: flex;
        gap: 1rem;
    }
</style>
