<div id="contact-page">
    <h1>Contact</h1>
    <hr />
    <p>
        contact
        <ul class="offices">
            <?php foreach ($this->getStores() as $store) { ?>
                <li>
                    <a href="/page/stores" data-bind="showStore" data-bind-args="<?php echo $store->id; ?>">
                        <?php echo $store->name; ?>
                    </a>
                </li>
            <?php } ?>
        </ul>
    </p>

    <p>
        <ul>
            <li>Name</li>
            <li>Company</li>
            <li>Street Number</li>
            <li>ZipCode Area</li>
        </ul>
    </p>

    <p>
        <ul>
            <li>phone</li>
            <li>info@gmail.com</li>
        </ul>
    </p>
</div>
