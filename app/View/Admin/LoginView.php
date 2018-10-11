<?php

namespace Hybrid\Core\View\Admin;

use \Hybrid\Core\View\PageView;

class LoginView extends PageView {

    public function __construct() {
        parent::__construct('admin/login', 'admin/login', 'Login');
    }
}
