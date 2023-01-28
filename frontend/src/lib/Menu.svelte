<script>
    import { onMount } from 'svelte';
    import { getMenu } from '../api/api';

    let menuItems = [];
    let showCartItems = false;
    let cart = [];
    $: total =
        cart.reduce((acc, cur) => acc + cur.quantity * cur.price, 0) || 0;

    onMount(loadMenu);

    async function loadMenu() {
        menuItems = await getMenu();
    }

    function toggleShowCart() {
        showCartItems = !showCartItems;
    }

    function addItemToCart(item) {
        const cartItem = cart.find(x => x.id === item.id);
        if (cartItem) {
            cartItem.quantity++;
            cart = [...cart];
        } else {
            cart = [...cart, { ...item, quantity: 1 }];
        }
    }
</script>

<main>
    <nav>Menu</nav>

    <!-- menu -->
    <div class="menu">
        <ul class="menu-list">
            {#each menuItems as item}
                <li class="menu-item">
                    <img class="item-image" src={item.image_url} alt="food" />
                    <div class="item-info">
                        <h4>{item.name}</h4>
                        Rs.<span>{item.price}</span>
                    </div>
                    <button on:click={e => addItemToCart(item)}>Add</button>
                </li>
            {/each}
        </ul>
    </div>

    <!-- cart -->
    <div class="cart">
        {#if showCartItems}
            <ul>
                {#each cart as item}
                    <li class="cart-item">
                        <span>{item.name} X {item.quantity}</span>
                        <button>Remove</button>
                    </li>
                {/each}
            </ul>
        {/if}

        <div class="cart-menu">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span class="show-cart" id="show-cart" on:click={toggleShowCart}>
                {showCartItems ? 'Hide Cart' : 'Show Cart'}
            </span>
            <div>
                Total: <span id="cart-total">{total} </span> Rs
                <button id="place-order">Order</button>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 100vh;
        max-height: 100vh;
    }

    .menu {
        flex-grow: 1;
        overflow: auto;
    }

    .menu-list {
        margin: 1rem;
    }

    .menu-item {
        background: #fff;
        margin-bottom: 10px;
        padding: 1rem;
        border-radius: 5px;
        display: flex;
        gap: 1rem;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
        transition: all 0.3s;
    }

    .menu-item:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 4px 12px;
    }

    .item-image {
        height: 4rem;
        width: 6rem;
        border-radius: 5px;
        object-fit: cover;
        border-radius: 5px;
    }

    .item-info {
        flex-grow: 1;
    }

    .cart {
        padding: 1rem;
        background-color: black;
        color: white;
        border-radius: 8px 8px 0 0;
    }

    .cart-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .show-cart {
        text-decoration: underline;
        cursor: pointer;
        margin-right: auto;
    }

    .cart-item {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
