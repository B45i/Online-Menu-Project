<script>
    import { deleteFood, getMenu } from '../api/api';
    import AddModal from './AddModal.svelte';
    import Navbar from './Navbar.svelte';
    import { onMount } from 'svelte';
    import RouteGuard from './RouteGuard.svelte';

    let menuItems = [];
    let showAddModal = false;

    onMount(loadMenu);

    async function loadMenu() {
        const response = await getMenu();
        menuItems = response.data;
    }

    async function openModal() {
        showAddModal = true;
    }

    async function closeModal() {
        await loadMenu();
        showAddModal = false;
    }

    async function deleteItem(id) {
        await deleteFood(id);
        await loadMenu();
    }
</script>

<RouteGuard />
<Navbar isAdmin={true} />
<div class="m-2">
    <div class="py-3">
        <button on:click={openModal} class="btn btn-success"
            >Add new item</button
        >
    </div>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each menuItems as item}
                <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td
                        ><img
                            class="image-thumbnail"
                            src={item.image_url}
                            srcset=""
                            alt=""
                        /></td
                    >
                    <td>{item.description}</td>
                    <td>
                        <button
                            class="btn btn-danger me-1"
                            on:click={() => deleteItem(item.id)}
                            ><i class="bi bi-trash" /></button
                        >

                        <!-- <button class="btn btn-primary">
                            <i class="bi bi-pencil-square" />
                        </button> -->
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

{#if showAddModal}
    <AddModal onClose={closeModal} />
{/if}

<style>
    .image-thumbnail {
        height: 3rem;
        width: 4rem;
        object-fit: cover;
        border-radius: 5px;
    }
    td {
        vertical-align: middle;
    }
</style>
