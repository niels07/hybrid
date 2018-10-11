<?php

namespace Hybrid\Core\View\Page\Store;

use \Hybrid\Core\View\AbstractView;
use \Hybrid\Core\View\PageViewInterface;

use \Hybrid\Core\Model\ModelInterface;
use \Hybrid\Core\Model\Collection\CollectionInterface;

class ProductView extends AbstractView implements PageViewInterface {

    private $product;

    public function __construct(ModelInterface $product) {
        $this->product = $product;
        parent::__construct('page', 'page/store/product');
    }

    protected function getProduct() {
        return $this->product;
    }

    public function getContent() {
        return $this->getTemplate('page/store/product');
    }

    public function renderContent() {
        $this->renderTemplate('page/store/product');
    }

    public function render() {
        $this->renderLayout('page');
    }

    public function getTitle() {
        return $this->product->title;
    }

    public function getData() {
        return [ 'product' => $this->product->getData() ];
    }
}
