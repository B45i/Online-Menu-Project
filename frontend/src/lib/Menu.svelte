<script>
    import { onMount } from 'svelte';
    import { getMenu, placeOrder } from '../api/api.js';
    import { useParams } from 'svelte-navigator';
    import Navbar from './Navbar.svelte';
    import { foodCategories } from '../data/categories.js';

    let menuItems = [];
    let filteredItems = [];
    let showCartItems = false;
    let cart = [];
    let total = 0;
    let selectedCategory = '';

    const params = useParams();

    onMount(loadMenu);

    async function loadMenu() {
        const response = await getMenu();
        menuItems = response.data;
        filterItems();
    }

    function toggleShowCart() {
        showCartItems = !showCartItems;
    }

    function addItemToCart(item) {
        const cartItem = cart.find(cartItem => cartItem.id === item.id);

        if (cartItem) {
            cartItem.quantity++;
            cart = [...cart];
        } else {
            cart = [...cart, { ...item, quantity: 1 }];
        }

        calculateTotal();
    }

    function removeItemFromCart(item) {
        const cartItem = cart.find(cartItem => cartItem.id === item.id);

        if (cartItem) {
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity--;
            cart = [...cart];
        } else {
            cart = cart.filter(cartItem => cartItem.id !== item.id);
        }

        calculateTotal();
    }

    function calculateTotal() {
        total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
    }

    async function handlePlaceOrder() {
        try {
            const response = await placeOrder({
                items: cart,
                seat_id: $params.id,
            });
            cart = [];
            calculateTotal();
        } catch (error) {
            console.log(error);
        }
    }

    function filterItems() {
        if (!selectedCategory) {
            filteredItems = menuItems;
        } else {
            filteredItems = menuItems.filter(
                item => item.category === selectedCategory
            );
        }
    }
</script>

<main>
    <Navbar isAdmin={false} tableId={$params.id} />

    <!-- menu -->

    <div class="menu">
        <select
            class="form-select mb-2"
            aria-label="Filer"
            bind:value={selectedCategory}
            on:change={filterItems}
        >
            {#each foodCategories as category}
                <option value={category.value}>{category.title}</option>
            {/each}
        </select>
        {#each filteredItems as item}
            <div class="menu-item">
                <img class="menu-image" src={item.image_url} alt="" srcset="" />

                <div class="flex-grow-1">
                    <div class="fw-bold">{item.name}</div>
                    <div class="badge rounded-pill text-bg-success text-white">
                        Rs. {item.price}
                    </div>
                </div>

                <button
                    class="btn btn-success btn-floating"
                    on:click={e => addItemToCart(item)}
                >
                    <i class="bi-plus" />
                </button>
            </div>
        {/each}

        {#if filteredItems.length === 0}
            <div class="text-center">
                <h4>No items found</h4>
            </div>
        {/if}
    </div>

    <!-- cart -->
    <div class="">
        {#if showCartItems == true}
            <ul class="list-group">
                {#each cart as cartItem}
                    <li class="list-group-item d-flex justify-content-between">
                        <span>{cartItem.name}</span>
                        <div>
                            {cartItem.price} X {cartItem.quantity}
                            <button
                                type="button"
                                class="btn btn-danger btn-sm ms-2"
                                on:click={e => removeItemFromCart(cartItem)}
                            >
                                <i class="bi-trash" /></button
                            >
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}

        <div class="cart-bar">
            <button on:click={toggleShowCart} class="btn btn-primary"
                >{showCartItems ? 'Hide cart' : 'Show cart'}</button
            >
            <div class="d-flex align-items-center gap-3">
                <span class="badge rounded-pill text-bg-success text-white"
                    >Total: {total}</span
                >
                <button on:click={handlePlaceOrder} class="btn btn-primary"
                    >Place order</button
                >
            </div>
        </div>
    </div>
</main>

<style>
    .menu {
        flex-grow: 1;
        padding: 1rem;
        overflow: auto;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 5px;
    }

    .menu-image {
        width: 5rem;
        height: 3rem;
        object-fit: cover;
        border-radius: 5px;
    }

    .cart-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #000;
        color: #fff;
    }

    .bi-plus {
        font-size: 1.2rem;
    }
</style>
