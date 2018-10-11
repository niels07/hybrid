<?php

namespace Hybrid\Core\View\Page;

use \Hybrid\Core\View\AbstractView;
use \Hybrid\Core\View\PageViewInterface;
use \Hybrid\Core\Model\Store\StoreCollectionInterface;

class StoresView extends AbstractView implements PageViewInterface {

    private $collection;

    public function __construct(StoreCollectionInterface $collection) {
        $this->collection = $collection;
        parent::__construct('page', 'page/stores');
    }

    protected function getStores() {
        return $this->collection->toArray();
    }

    public function getTitle() {
        return 'Vestigingen';
    }

    public function getData() {
        return $this->getStores();
    }
}
