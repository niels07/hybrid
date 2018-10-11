<div class="content" id="category-items">
    <?php
    foreach ($this->getCategories() as $categoryId => $category) {
        $this->renderTemplate('page/store/categories/category', $category);
    }
    ?>
    <div class="clear"></div>
</div>
