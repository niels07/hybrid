<?php

namespace Hybrid\Core\View\Page;

use \Hybrid\Core\View\PageView;
use \Hybrid\Core\Model\Store\StoreCollectionInterface;

class ContactView extends PageView {

    private $storeCollection;

    public function __construct(StoreCollectionInterface $storeCollection) {
        $this->storeCollection = $storeCollection;
        parent::__construct('page', 'page/contact', 'Contact');
    }

    protected function getStores() {
        return $this->storeCollection->toArray();
    }
}
