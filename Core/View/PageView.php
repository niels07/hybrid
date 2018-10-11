<?php

namespace Hybrid\Core\View;

class PageView extends AbstractView implements PageViewInterface {

    private $data;
    private $title;

    public function __construct($layout = null, $template = null, $title = null, $data = null) {
        parent::__construct($layout, $template);
        $this->title = $title;
        $this->data = $data;
    }

    public function getTitle(): string {
        return $this->title;
    }

    public function getData() {
        return $this->data;
    }
}
