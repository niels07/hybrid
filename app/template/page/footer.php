<footer>
    <div class="footer-content">

        <div class="footer-block">
            <h1>Footer Header</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>

        <div class="footer-block">
            <h1>COLLECTIE</h1>
            <ul>
                <?php foreach ($this->getCategories() as $categoryId => $category) { ?>
                    <li>
                        <a href="/page/store/products?categoryId=<?php echo $categoryId; ?>"
                            data-bind="click:showCategory" data-bind-args='{"id": "<?php echo $categoryId; ?>"}'>
                           <?php echo $category->name; ?>
                        </a>
                    </li>
                <?php } ?>
            </ul>
        </div>

        <div class="footer-block">
            <h1>Verkooppunten</h1>
            <ul>
            <?php foreach ($this->getStores() as $store) { ?>
                <li>
                    <a href="/page/stores" data-bind="click:showStore" data-bind-args='{"id": "<?php echo $store->id; ?>"}'>
                        <?php echo $store->name; ?>
                    </a>
                </li>
            <?php } ?>
            </ul>

        </div>
    </div>
</footer>

