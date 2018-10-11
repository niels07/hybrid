<?php

namespace Hybrid\Core\View\Admin;

use \Hybrid\Core\View\AbstractView;
use \Hybrid\Core\View\PageView;

class ProductsView extends PageView {

    public function __construct() {
        parent::__construct('admin', 'admin/products', 'Producten');
    }
}
