<?php

namespace Hybrid\Core\View\Page\Store;

use \Hybrid\Core\View\AbstractView;
use \Hybrid\Core\View\PageViewInterface;
use Hybrid\Core\Model\Product\ProductCollectionInterface;

class ProductsView extends AbstractView implements PageViewInterface {

    private $collection;
    private $category;

    public function __construct(ProductCollectionInterface $collection) {
        $this->collection = $collection;
        parent::__construct('page/products');
    }

    protected function getProducts() {
        return $this->collection->toArray();
    }

    public function getContent() {
        return $this->getTemplate('page/store/products');
    }

    public function renderContent() {
        $this->renderTemplate('page/store/products');
    }

    public function render() {
        $this->renderLayout('page');
    }

    public function getTitle() {
        return 'Producten';
    }

    public function getData() {
        return $this->getProducts();
    }
}
