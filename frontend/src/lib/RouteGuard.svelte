<script>
    import { onMount } from 'svelte';

    import { useNavigate } from 'svelte-navigator';
    import { isAuthenticated } from '../utils/auth';

    const navigate = useNavigate();

    onMount(() => {
        if (!isAuthenticated()) {
            navigate('/admin/login');
        }
    });
</script>
