<script>
    import { useParams } from 'svelte-navigator';
    import Navbar from './Navbar.svelte';

    const params = useParams();
</script>

<Navbar isAdmin={false} tableId={$params.id} />
<div>{$params.id}</div>
