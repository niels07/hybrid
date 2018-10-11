<?php $product = $this->getProduct(); ?>

<div id="store-selection-open">
    <a href="" data-bind="click:showSelection"></a>
</div>

<div class="content">
    <div class="info">
        <div class="left-column">
            <?php $this->renderTemplate('page/store/product/images'); ?>
        </div>

        <div class="center-column">
            <div class="details">
                <h1><?php echo $product->name; ?></h1>
                <div class="to-store-button">
                    <?php if ($product->storeUrl) { ?>
                        <a href="<?php echo $product->storeUrl; ?>">
                            Naar Webwinkel
                        </a>
                    <?php } ?>
                </div>

                <?php if ($product->description) { ?>
                    <div class="product-info-field product-description">
                        <?php echo nl2br($product->description); ?>
                    </div>
                <?php } ?>

                <div class="product-info-field">
                    <?php $this->renderTemplate('page/store/product/specs'); ?>
                </div>

                <?php if ($product->price > 0) { ?>
                    <div class="product-info-field">
                        <?php if ($product->actionPrice > 0 && $product->actionPrice < $product->price) { ?>
                            <label>Prijs: </label>
                            <span class="old-price" id="old-price">
                                <?php echo $product->getCurrency('price'); ?>
                            </span>
                            <span class="new-price" id="new-price">
                                <?php echo $product->getCurrency('action_price'); ?>
                            </span>
                        <?php } else { ?>
                            <label for="product-price">Prijs: </label>
                            <span class="price" id="product-price">
                                <?php echo $product->getCurrency('price'); ?>
                            </span>
                        <?php } ?>
                    </div>
                <?php } ?>

            </div>
        </div>
        </div>
</div>

<div class="clear"></div>
<div id="product-footer"></div>
