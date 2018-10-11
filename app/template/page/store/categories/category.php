<?php $category = $this->getArgs()[0]; ?>
<div class="item">
    <a
        href="/page/store/products?categoryId=<?php echo $category->id; ?>"
        data-bind="click:loadProducts"
        data-bind-args='{"categoryId": "<?php echo $category->id; ?>"}'>

        <div class="hover-overlay"></div>
        <div class="hover-text">
            <?php echo $category->name; ?>
        </div>
        <div class="title">
            <h1><?php echo $category->name; ?></h1>
        </div>
        <div class="image">
            <img src="<?php echo $category->thumbnail; ?>" alt="<?php echo $category->name; ?> afbeelding" />
        </div>
    </a>
</div>
