<div class="content" id="product-items">
    <div class="back">
        <a href="/page/store/categories" data-bind="click:loadCategories" class="back-button"></a>
        <div class="text">
            Terug
        </div>
        <div class="clear"></div>
    </div>

    <?php foreach ($this->getProducts() as $productId => $product) {
        $this->renderTemplate('page/store/products/product', $product);
    } ?>
    <div class="clear"></div>
</div>
