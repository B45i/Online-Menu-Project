<script>
    export let rating;
</script>

<div>
    {#each { length: rating } as _}
        <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
                d="m12 0 4 9 8 1-6 5 2 9-8-5-8 5 2-9-6-5 8-1z"
                fill="#f39c12"
            /><path
                d="M12 0 8 9l-6.969.8L6 14l-.188.8L6 15l-1.75 7.8L12 18l7.75 4.8L18 15l.188-.2L18 14l4.969-4.2L16 9l-4-9z"
                fill="#f1c40f"
            /></svg
        >
    {/each}
</div>
