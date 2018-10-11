<?php

namespace Hybrid\Core\View\Page;

use \Hybrid\Core\View\PageView;

class FaqView extends PageView {

    public function __construct() {
        parent::__construct('page', 'page/faq', 'FAQ');
    }
}
