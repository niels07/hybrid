<div id="offers-page">
    <div class="title">
        <div id="offers-title-1">
            AANBIEDINGEN
        </div>
        <div id="offers-title-2">
            NIEUWSTE PROMOTIES
        </div>
        <div id="offers-title-3">
            Speciaal voor u ontwikkeld.
        </div>
    </div>

    <div class="offers">
        <?php
        foreach ($this->getProducts() as $product) {
            $this->renderTemplate('page/offers/offer', $product);
        }
        ?>
    </div>
</div>
