<div class="product-specs">
    <?php $product = $this->getProduct(); ?>
    <?php if ($product->specs) { ?>
        <label class="bold" for="product-specs">Specificaties: </label>
        <ul id="product-specs">
        <?php
            foreach ($product->specs as $spec) {
                $specStr = $spec[0];
                if ($spec[1] !== '') {
                    $specStr .= ': ' . $spec[1];
                }
                echo "<li>$specStr</li>";
            }
        ?>
        </ul>
    <?php } ?>
</div>
