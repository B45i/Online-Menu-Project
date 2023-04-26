<script>
    import { useNavigate } from 'svelte-navigator';
    import { login } from '../api/api.js';

    let username = '';
    let password = '';
    let errorMessage = '';

    $: allowLogin =
        username && password && username.length > 3 && password.length > 3;

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        errorMessage = '';

        if (!allowLogin) {
            return;
        }

        try {
            const response = await login(username, password);
            if (!response.data) {
                errorMessage = 'Something went wrong';
                return;
            }

            localStorage.setItem('token', response.data.token);
            navigate('/admin/orders');
        } catch (error) {
            console.log('error happend');
            // console.log(error);
            errorMessage = error.response.data.message;
        }
    }
</script>

<div class="login-page">
    <form class="login-form border p-4 shadow rounded bg-white">
        <h3 class="text-center mb-3">Admin Login</h3>
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
                bind:value={username}
                type="text"
                class="form-control"
                id="username"
                aria-describedby="emailHelp"
            />
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
                type="password"
                class="form-control"
                id="password"
                bind:value={password}
            />
        </div>
        <button
            disabled={!allowLogin}
            on:click={handleLogin}
            class="btn btn-primary"
        >
            Sign in
        </button>
        {#if errorMessage}
            <div id="emailHelp" class="form-text text-danger">
                {errorMessage}
            </div>
        {/if}
    </form>
</div>

<style>
    .login-page {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url(https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80);
        background-position: center;
        background-size: cover;
    }

    .login-form {
        border: 1;
        min-width: 22rem;
    }
</style>
