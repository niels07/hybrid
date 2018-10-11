<h1>Product</h1>

<form id="admin-product-form" data-bind="submit:saveProduct">
    <div class="float-left">
        <div>
            <div class="section" id="admin-product-details">
                <h2>Product Details</h2>
                <div class="field">
                    <label for="admin-product-category-list">Categorie</label>
                    <select name="category_id" id="admin-product-category-list"></select>
                </div>

                <div class="field">
                    <label for="admin-product-list">Product</label>
                    <div class="float-left">
                        <select name="id" id="admin-product-list" data-bind="click:loadProductFields"></select>
                        <button class="delete-option" data-bind="click:deleteProduct">X</button>
                    </div>
                </div>

                <div class="field">
                    <label for="admin-product-title">Product Title</label>
                    <input type="text" name="title" id="admin-product-title" />
                </div>

                <div class="field">
                    <label for="admin-product-name">Product Naam</label>
                    <input type="text" name="name" id="admin-product-name" required />
                </div>

                <div class="field">
                    <label for="admin-product-name">Omschrijving</label>
                    <textarea name="description" id="admin-product-description"></textarea>
                </div>

                <div class="field">
                    <label for="admin-product-image">Thumbnail URL</label>
                    <input type="text" name="image_path" id="admin-product-image" />
                </div>

                <div class="field">
                    <label for="admin-product-sku">sku: </label>
                    <input type="text" name="sku" id="admin-product-sku" />
                </div>

                <div class="field">
                    <label for="admin-product-price">Prijs: </label>
                    <input type="number" step="0.01" name="price" id="admin-product-price" />
                </div>

                <div class="field">
                    <label for="admin-product-action_price">Actie Prijs: </label>
                    <input type="number" step="0.01" name="action_price" id="admin-product-action_price" />
                </div>

                <div class="field">
                    <label for="admin-product-store_url">URL naar webwinkel: </label>
                    <input type="text" name="store_url" id="admin-product-store_url" />
                </div>


                <input type="hidden" name="specs" value="[]" />
                <input type="hidden" name="images" value="[]" />
            </div>

            <input type="submit" value="Opslaan" />
        </div>
        <div>
            <div class="section" data-view="admin/products/specs" data-view-parent="admin/products"></div>
            <div class="section" data-view="admin/products/images" data-view-parent="admin/products"></div>
            <div class="section">
                <h2>Afbeelding Uploaden</h2>
                <div class="field">
                    <input type="file" name="image" class="image-uploader-file" />
                </div>
                <div class="field">
                    <label for="admin-product-upload-type">Type</label>
                    <select id="admin-product-upload-type">
                        <option value="gallery">Pagina</option>
                        <option value="thumbnail">Thumbnail</option>
                    </select>
                </div>
                <button data-bind="click:uploadImage">
                    Uploaden
                </button>
            </div>
        </div>
    </div>
    <div class="clear"></div>
</form>
