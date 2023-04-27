<script>
    import { addFeedback } from '../api/api';
    import Navbar from './Navbar.svelte';
    let rating = 5;
    let feedback = '';
    let seatId = '';
    let feedbackDone = false;

    $: allowSubmit = rating && feedback && seatId;

    async function handleFeedback(e) {
        e.preventDefault();
        try {
            const response = await addFeedback({
                rating,
                feedback_text: feedback,
                seat_id: seatId,
            });

            feedbackDone = true;
        } catch (error) {}
    }
</script>

<Navbar isAdmin={false} />
<div class="container mt-3">
    <form class="feedback-form mx-auto">
        {#if feedbackDone}
            <div class="alert alert-success">
                Feedback submitted successfully
            </div>
        {:else}
            <form class="login-form border p-4 shadow rounded bg-white">
                <h3 class="text-center mb-3">Submit feedback</h3>
                <div class="mb-3">
                    <label for="username" class="form-label">Rating:</label>

                    <select bind:value={rating} class="select form-select">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">Five</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="username" class="form-label">Table:</label>
                    <input
                        bind:value={seatId}
                        type="text"
                        class="form-control"
                    />
                </div>

                <div class="mb-3">
                    <label for="username" class="form-label">Feedback:</label>

                    <textarea
                        bind:value={feedback}
                        class="form-control"
                        cols="30"
                        rows="5"
                    />
                </div>

                <button
                    disabled={!allowSubmit}
                    on:click={handleFeedback}
                    class="btn btn-primary mb-2"
                >
                    Submit
                </button>
            </form>
        {/if}
    </form>
</div>

<style>
    .feedback-form {
        max-width: 500px;
    }
</style>
