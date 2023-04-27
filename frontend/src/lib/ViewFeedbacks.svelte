<script>
    import { onMount } from 'svelte';
    import Navbar from './Navbar.svelte';
    import RouteGuard from './RouteGuard.svelte';
    import StarRating from './StarRating.svelte';
    import dayjs from 'dayjs';

    import { getFeedbacks } from '../api/api';

    let feedbacks = [];

    onMount(fetchFeedbacks);

    async function fetchFeedbacks() {
        const response = await getFeedbacks();
        feedbacks = response.data;
        console.log(feedbacks);
    }
</script>

<RouteGuard />
<Navbar />

<div class=" m-3">
    <h3 class="mb-2">Feedbacks:</h3>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">Rating</th>
                <th scope="col">Table</th>
                <th scope="col">Time</th>
                <th scope="col">Review</th>
            </tr>
        </thead>
        <tbody>
            {#each feedbacks as item}
                <tr>
                    <!-- <td>{item.rating}</td> -->
                    <td><StarRating rating={item.rating} /></td>
                    <td>{item.seat_id}</td>
                    <td
                        >{dayjs(item.created_at).format(
                            'D-MM-YYYY  hh:mm A'
                        )}</td
                    >
                    <td>{item.feedback_text}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
