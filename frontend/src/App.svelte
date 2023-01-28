<script>
    import { Router, Link, Route } from 'svelte-navigator';
    import Menu from './lib/Menu.svelte';
</script>

<Router>
    <Route path="table/:id">
        <Menu />
    </Route>
</Router>

<style>
</style>
