<?php

namespace Hybrid\Core\View\Admin;

use \Hybrid\Core\View\PageView;

class StoresView extends PageView {
    public function __construct() {
        parent::__construct('admin', 'admin/stores', 'Filialen');
    }
}
