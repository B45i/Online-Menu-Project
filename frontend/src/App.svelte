<script>
    import { Router, Route } from 'svelte-navigator';
    import Menu from './lib/Menu.svelte';
    import Orders from './lib/Orders.svelte';
    import MenuList from './lib/MenuEditor.svelte';
    import Landing from './lib/Landing.svelte';
    import Login from './lib/Login.svelte';
</script>

<Router>
    <Route path="/admin/login">
        <Login />
    </Route>
    <Route path="/">
        <Landing />
    </Route>

    <Route path="table/:id">
        <Menu />
    </Route>
    <Route path="admin/orders">
        <Orders />
    </Route>
    <Route path="/admin/menu">
        <MenuList />
    </Route>

    <Route path="/*">
        <h1 class="text-center mt-5">page not found</h1>
    </Route>
</Router>

<style>
</style>
