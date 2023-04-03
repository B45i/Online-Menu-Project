<script>
    import { Router, Route } from 'svelte-navigator';
    import Menu from './lib/Menu.svelte';
    import Orders from './lib/Orders.svelte';
</script>

<Router>
    <Route path="/">
    <div>hello</div></Route>
    <Route path="table/:id">
        <Menu />
    </Route>
    <Route path="admin/orders">
        <Orders />
    </Route>
</Router>

<style>
</style>
