<?php

namespace Hybrid\Core\View\Page;

use \Hybrid\Core\View\AbstractView;
use \Hybrid\Core\View\PageViewInterface;
use \Hybrid\Core\Model\Product\ProductCollectionInterface;

class OffersView extends AbstractView implements PageViewInterface {

    private $productCollection;

    public function __construct(ProductCollectionInterface $productCollection) {
        $this->productCollection = $productCollection;
    }

    protected function getProducts() {
        return [];
    }

    public function getContent() {
        return $this->getTemplate('page/offers');
    }

    public function renderContent() {
        $this->renderTemplate('page/offers');
    }

    public function render() {
        $this->renderLayout('page');
    }

    public function getTitle() {
        return 'Aanbiedingen';
    }

    public function getData() {
        return [];
    }
}
