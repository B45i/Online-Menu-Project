<script>
    import Navbar from './Navbar.svelte';
    let rating = 5;
    let feedback = '';

    function handleFeedback(e) {
        e.preventDefault();
        console.log(rating, feedback);
    }
</script>

<Navbar isAdmin={false} />
<div class="container mt-3">
    <form action="">
        <form class="login-form border p-4 shadow rounded bg-white">
            <h3 class="text-center mb-3">Submit feedback</h3>
            <div class="mb-3">
                <label for="username" class="form-label">Rating :</label>

                <select bind:value={rating} class="select form-select">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="username" class="form-label">Feedback :</label>

                <textarea
                    bind:value={feedback}
                    class="form-control"
                    cols="30"
                    rows="5"
                />
            </div>

            <button on:click={handleFeedback} class="btn btn-primary mb-2">
                Submit
            </button>

            <!-- {#if passwordRepeat && password !== passwordRepeat}
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
            {/if} -->
        </form>
    </form>
</div>
