<h2>Afbeelding Toevoegen</h2>
<ul id="admin-product-images" class="attribute-list">
</ul>

<div class="field">
    <label for="admin-product-image-path">Afbeelding URL</label>
    <input type="text" id="admin-product-image-path" />
</div>

<div class="field">
    <label for="admin-product-image-type">Type: </label>
    <select id="admin-product-image-type" name="type">
        <option value="gallery">Afbeelding</option>
        <option value="thumbnail">Thumbnail</option>
    </select>
</div>

<button data-bind="click:addImage">Toevoegen</button>
