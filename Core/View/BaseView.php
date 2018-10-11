<?php

namespace Hybrid\Core\View;

use \Hybrid\Core\View\AbstractView;
use \Hybrid\Core\Model\Category\CategoryCollection;

class BaseView extends AbstractView implements PageViewInterface {

    private $layout;
    private $template;
    private $title;

    public function __construct($layout, $template, $title = '') {
        $this->template = $template;
        $this->layout = $layout;
        $this->title = $title;
        parent::__construct($layout, $template);
    }

    public function getContent() {
        return $this->getTemplate($this->template);
    }

    public function renderContent() {
        $this->renderTemplate($this->template);
    }

    public function render() {
        $this->renderLayout($this->layout);
    }

    public function getTitle() {
        return $this->title;
    }

    public function getData() {
        return null;
    }
}
