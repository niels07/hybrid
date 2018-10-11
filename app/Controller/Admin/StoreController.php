<?php

namespace Hybrid\Core\Controller\Admin;

use \Hybrid\Core\Model\Store\StoreCollectionInterface;

class StoreController extends ModelController {
    public function __construct(StoreCollectionInterface $collection) { 
        parent::__construct($collection, 'id');
    }
}
