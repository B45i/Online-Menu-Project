<script>
    import { Link } from 'svelte-navigator';
</script>

<div class="landing">
    <nav class="navbar navbar-dark bg-dark py-1 px-2">
        <div class="navbar-brand">DineDigit</div>

        <Link to="/admin/login">
            <button class="btn btn-secondary btn-rounded">Admin Login</button>
        </Link>
    </nav>

    <main class="d-flex justify-content-center align-items-center">
        <div class="main-content">
            <div>Introducing</div>
            <h3>DineDigit</h3>
            <div>The smart menu app for modern restaurants</div>
        </div>
    </main>

    <div
        class="m-4 d-flex gap-2 flex-wrap align-items-center justify-content-center"
    >
        <div class="card shadow-card" style="width: 18rem;">
            <div class="card-body text-center">
                <h5 class="card-title">Paperless</h5>
                <p class="card-text">
                    Eliminate the need for pen and paper and help waiters
                    remember orders easily.
                </p>
            </div>
        </div>

        <div class="card shadow-card" style="width: 18rem;">
            <div class="card-body text-center">
                <h5 class="card-title">Seamless</h5>
                <p class="card-text">
                    Customers can scan a QR code to access your online menu and
                    place orders seamlessly.
                </p>
            </div>
        </div>

        <div class="card shadow-card" style="width: 18rem;">
            <div class="card-body text-center">
                <h5 class="card-title">Realtime</h5>
                <p class="card-text">
                    Real-time order tracking ensures quick food preparation and
                    improves efficiency.
                </p>
            </div>
        </div>
    </div>

    <footer class="bg-dark">Lakshmi Shajan - 2023</footer>
</div>

<style>
    .landing {
        height: 100vh;
        width: 100vw;
        color: #fff;
    }

    .shadow-card:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    main {
        background-image: url(https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 40%;
    }

    .main-content {
        backdrop-filter: blur(5px);
        text-align: center;
        padding: 3rem;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0.5rem;
        text-align: center;
    }
</style>
