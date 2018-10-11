<?php

namespace Hybrid\Core\View\Page;

use \Hybrid\Core\View\PageView;

class StoreView extends PageView {

    public function __construct() {
        parent::__construct('page', 'page/store', 'Producten');
    }
}
