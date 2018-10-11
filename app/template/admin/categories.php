<h1>Categories</h1>

<form id="admin-category-form" data-bind="submit:saveCategory" class="fLeft">
    <div class="fLeft">
        <div class="section">
            <h2>Category</h2>
            <div class="field">
                <label for="admin-category-list">Categorie</label>
                <div>
                    <select name="id" id="admin-category-list" class="fLeft" data-bind="change:loadCategoryFields">
                    </select>
                    <button class="delete-option" data-bind="click:deleteCategory">X</button>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
        <div class="section">
            <h2>Category info</h2>
            <div class="fieldset">
                <div class="field">
                    <label for="category-name-field">Naam</label>
                    <input type="text" name="name" id="category-name-field">
                </div>
                <div class="field">
                    <label for="category-image-field">Afbeelding</label>
                    <input type="text" name="image_path" id="category-image-field">
                </div>
            </div>
        </div>
    </div>
    <div class="section fLeft">
        <h2>Afbeelding Uploaden</h2>
        <div class="field">
            <input type="file" name="image" id="category-image-upload">
        </div>
        <button data-bind="click:uploadImage">
            Uploaden
        </button>
    </div>
    <div class="clear"></div>
    <input type="submit" value="Opslaan">
</form>