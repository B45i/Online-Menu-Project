<script>
    import { onMount } from 'svelte';
    import Navbar from './Navbar.svelte';

    let menuItems = [
        {
            id: 1,
            name: 'Butter Chicken',
            price: 250,
            image_url: 'https://www.example.com/butter_chicken.jpg',
        },
        {
            id: 2,
            name: 'Chicken Tikka Masala',
            price: 200,
            image_url: 'https://www.example.com/chicken_tikka_masala.jpg',
        },
        {
            id: 3,
            name: 'Aloo Gobi',
            price: 150,
            image_url: 'https://www.example.com/aloo_gobi.jpg',
        },
        {
            id: 4,
            name: 'Palak Paneer',
            price: 180,
            image_url: 'https://www.example.com/palak_paneer.jpg',
        },
        {
            id: 5,
            name: 'Samosa',
            price: 120,
            image_url: 'https://www.example.com/samosa.jpg',
        },
        {
            id: 6,
            name: 'Chana Masala',
            price: 160,
            image_url: 'https://www.example.com/chana_masala.jpg',
        },
        {
            id: 7,
            name: 'Dal Makhani',
            price: 220,
            image_url: 'https://www.example.com/dal_makhani.jpg',
        },
        {
            id: 8,
            name: 'Paneer Tikka',
            price: 280,
            image_url: 'https://www.example.com/paneer_tikka.jpg',
        },
        {
            id: 9,
            name: 'Biryani',
            price: 350,
            image_url: 'https://www.example.com/biryani.jpg',
        },
        {
            id: 10,
            name: 'Naan',
            price: 100,
            image_url: 'https://www.example.com/naan.jpg',
        },
        {
            id: 11,
            name: 'Lassi',
            price: 120,
            image_url: 'https://www.example.com/lassi.jpg',
        },
        {
            id: 12,
            name: 'Raita',
            price: 100,
            image_url: 'https://www.example.com/raita.jpg',
        },
        {
            id: 13,
            name: 'Papadum',
            price: 80,
            image_url: 'https://www.example.com/papadum.jpg',
        },
        {
            id: 14,
            name: 'Rogan Josh',
            price: 300,
            image_url: 'https://www.example.com/rogan_josh.jpg',
        },
        {
            id: 15,
            name: 'Gulab Jamun',
            price: 120,
            image_url: 'https://www.example.com/gulab_jamun.jpg',
        },
    ];
    let showCartItems = false;
    let cart = [];
    let total = 0;

    onMount(loadMenu);

    async function loadMenu() {
        // menuItems = await getMenu();
    }

    function toggleShowCart() {
        showCartItems = !showCartItems;
    }

    function addItemToCart(item) {
        // const cartItem = cart.find(x => x.id === item.id);
        cart = [...cart, item]; // array destructuring

        // if (cartItem) {
        //     cartItem.quantity++;
        //     cart = [...cart];
        // } else {
        //     cart = [...cart, { ...item, quantity: 1 }];
        // }

        total = 0;
        cart.forEach(item => {
            total += item.price;
        });
    }

    async function handlePlaceOrder() {
        try {
            // const response = await placeOrder({ items: cart, seat_id: 'A1' });
            cart = [];
        } catch (error) {
            console.log(error);
        }
    }
</script>

<main>
    <Navbar/>

    <!-- menu -->

    <div class="menu">
        {#each menuItems as item}
            <div class="menu-item">
                <img
                    class="menu-image"
                    src="https://images.unsplash.com/photo-1630409346824-4f0e7b080087?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2146&q=80"
                    alt=""
                    srcset=""
                />

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
    <div class="cart">
        <button class="btn btn-primary">Show Cart</button>
        <div class="d-flex align-items-center gap-3">
            <span class="badge text-bg-success">Total: {total}</span>
            <button class="btn btn-primary">Place order</button>
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

    .cart {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #000;
        color: #fff;
    }
</style>
