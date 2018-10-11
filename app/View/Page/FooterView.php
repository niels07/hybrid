<?php

namespace Hybrid\Core\View\Page;

use \Hybrid\Core\View\AbstractView;
use \Hybrid\Core\Model\Category\CategoryCollectionInterface;
use \Hybrid\Core\Model\Store\StoreCollectionInterface;

class FooterView extends AbstractView {

    private $categoryCollection;
    private $storeCollection;

    public function __construct(
        CategoryCollectionInterface $categoryCollection,
        StoreCollectionInterface $storeCollection) {

        $this->categoryCollection = $categoryCollection;
        $this->storeCollection = $storeCollection;

        parent::__construct(null, 'page/footer');
    }

    protected function getStores() {
        return $this->storeCollection->toArray();
    }

    protected function getCategories() {
        return $this->categoryCollection->toArray();
    }
}
