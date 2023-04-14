<script>
    import { onMount } from 'svelte';
    import { getMenu, placeOrder } from '../api/api.js';
    import { useParams } from 'svelte-navigator';
    import Navbar from './Navbar.svelte';

    let menuItems = [];
    let showCartItems = false;
    let cart = [];
    let total = 0;

    const params = useParams();

    onMount(loadMenu);

    async function loadMenu() {
        menuItems = await getMenu();
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
</script>

<main>
    <Navbar isAdmin={false} />

    <!-- menu -->

    <div class="menu">
        {#each menuItems as item}
            <div class="menu-item">
                <img class="menu-image" src={item.image_url} alt="" srcset="" />

                <div class="flex-grow-1">
                    <div class="fw-bold">{item.name}</div>
                    <div class="badge text-bg-success">Rs. {item.price}</div>
                </div>

                <button
                    class="btn btn-success"
                    on:click={e => addItemToCart(item)}
                >
                    Add to cart
                </button>
            </div>
        {/each}
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
                <span class="badge text-bg-success">Total: {total}</span>
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
        max-width: 4rem;
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
</style>
