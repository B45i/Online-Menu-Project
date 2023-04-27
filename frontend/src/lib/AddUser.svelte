<script>
    import { addUser } from '../api/api';
    import Navbar from './Navbar.svelte';
    import RouteGuard from './RouteGuard.svelte';

    let username = '';
    let password = '';
    let passwordRepeat = '';
    let errorMessage = '';
    let successMessage = '';

    $: allowAddUser =
        username &&
        password &&
        passwordRepeat &&
        password === passwordRepeat &&
        username.length > 3 &&
        password.length > 3;

    async function handleAddUser(e) {
        e.preventDefault();
        errorMessage = '';
        if (!allowAddUser) {
            return;
        }

        try {
            const response = await addUser(username, password);
            if (!response.data) {
                errorMessage = 'Something went wrong';
                return;
            }
            console.log(response);

            successMessage = response.data.message;
        } catch (error) {
            errorMessage = error.response.data.message;
        }
    }
</script>

<RouteGuard />
<Navbar />
<div class="container mt-3">
    <form class="login-form border p-4 shadow rounded bg-white">
        <h3 class="text-center mb-3">Add new admin user</h3>
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

        <div class="mb-3">
            <label for="password" class="form-label">Repeat Password</label>
            <input
                type="password"
                class="form-control"
                id="password"
                bind:value={passwordRepeat}
            />
        </div>
        <button
            on:click={handleAddUser}
            disabled={!allowAddUser}
            class="btn btn-primary mb-2"
        >
            Add
        </button>

        {#if passwordRepeat && password !== passwordRepeat}
            <div class="form-text text-danger">
                Please fill all fields and make sure that passwords match
            </div>
        {/if}
        {#if errorMessage}
            <div class="form-text text-danger">
                {errorMessage}
            </div>
        {/if}

        {#if successMessage}
            <div class="alert alert-success">
                {successMessage}
            </div>
        {/if}
    </form>
</div>
