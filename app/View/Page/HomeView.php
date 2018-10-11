<?php

namespace Hybrid\Core\View\Page;

use \Hybrid\Core\View\AbstractView;
use \Hybrid\Core\View\PageView;

class HomeView extends PageView {

    public function __construct() {
        parent::__construct('page', 'page/home', 'Home');
    }

}
