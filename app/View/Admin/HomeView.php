<?php

namespace Hybrid\Core\View\Admin;

use \Hybrid\Core\View\AbstractView;
use \Hybrid\Core\View\PageViewInterface;
use \Hybrid\Core\Model\Category\CategoryCollection;

class HomeView extends AbstractView implements PageViewInterface {

    public function __construct() {
        parent::__construct('admin', 'admin/home');
    }

    public function getContent() {
        return $this->getTemplate('admin/home');
    }

    public function renderContent() {
        $this->renderTemplate('admin/home');
    }

    public function render() {
        $this->renderLayout('admin');
    }

    public function getTitle() {
        return 'Home';
    }

    public function getData() {
        return null;
    }
}
