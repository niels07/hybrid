<?php $product = $this->getArgs()[0]; ?>

<div class="offer">
    <div class="image">
        <img src="/<?php echo $product->image; ?>" />
    </div>
    <div class="info">
        <h1>
            <?php echo $product->title ?>
        </h1>
        <hr />
        <div class="old-price">
            Oude Prijs: <?php echo $product->getCurrency('price'); ?>
        </div>
        <div class="new-price">
            Actie Prijs: <?php echo $product->getCurrency('action_price'); ?>
        </div>
        <a href="<?php echo $product->storeUrl; ?>" class="to-store">
            Naar Webwinkel
        </a>
    </div>
    <div class="clear"></div>
</div>
