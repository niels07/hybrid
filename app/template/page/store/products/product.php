<?php $product = $this->getArgs()[0]; ?>
<div class="item">
    <a href="/page/store/product?productId=<?php echo $product->id; ?>" data-bind="click:loadProduct" data-bind-args='{"productId": "<?php echo $product->id; ?>"}'>

    <div class="hover-text">
        <?php echo $product->title; ?>
    </div>
    <div class="hover-overlay">
    </div>
        <div class="title">
            <h1><?php echo $product->title; ?></h1>
        </div>
        <div class="image">
            <img src="<?php echo $product->getThumbnailPath(); ?>" alt="<?php echo $product->name; ?>" />
        </div>
        <div class="price">
            Vanaf
            <?php if ($product->actionPrice > 0 && $product->actionPrice < $product->price) { ?>
                <s><?php echo $product->getCurrency('price'); ?></s>
                <span class="action-price">
                    <?php echo $product->getCurrency('action_price'); ?>
                </span>
            <?php } else { ?>
                <?php echo $product->getCurrency('price'); ?>
            <?php } ?>
        </div>
    </a>
</div>
