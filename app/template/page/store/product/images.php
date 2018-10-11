<?php $product = $this->getProduct(); ?>
<?php if (count($product->images) > 1) { ?>
    <div class="image-slider">
        <div class="carousel-prev">
            <a href="" data-bind="click:carouselPrev"></a>
        </div>
        <div class="carousel" id="product-image-gallery">
            <?php foreach ($product->images as $image) {
                if ($image[1] == 'gallery') { ?>
                    <div class="image">
                        <img src="<?php echo $image[0]; ?>" />
                    </div>
                <?php }
            } ?>
        </div>
        <div class="carousel-next">
            <a href="" data-bind="click:carouselNext"></a>
        </div>
    </div>
<?php } elseif (count($product->images) > 0) { ?>
    <div id="product-image">
        <img src="<?php echo $product->images[0][0]; ?>" />
    </div>
<?php } ?>
