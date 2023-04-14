<script>
    import { addFood } from '../api/api';
    export let onClose;

    let name = '';
    let price = '';
    let image_url = '';
    let description = '';

    async function handleAddFood() {
        await addFood({
            name,
            price,
            image_url,
            description,
        });

        if (onClose) {
            onClose();
        }
    }
</script>

<div class="modal d-block" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add new food</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                />
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="itemName" class="form-label">Name</label>
                        <input
                            bind:value={name}
                            type="text"
                            minlength="5"
                            class="form-control"
                            id="itemName"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="itemName" class="form-label">Price</label>
                        <input
                            bind:value={price}
                            type="number"
                            min="5"
                            class="form-control"
                            id="itemName"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="itemName" class="form-label"
                            >Image URL</label
                        >
                        <input
                            bind:value={image_url}
                            type="text"
                            minlength="5"
                            class="form-control"
                            id="itemName"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="itemName" class="form-label"
                            >Description</label
                        >
                        <textarea
                            bind:value={description}
                            minlength="5"
                            class="form-control"
                            id="itemName"
                        />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">Cancel</button
                >
                <button
                    on:click={handleAddFood}
                    type="button"
                    class="btn btn-primary">Save</button
                >
            </div>
        </div>
    </div>
</div>

<style>
    .modal {
        backdrop-filter: brightness(0.5);
    }
</style>
