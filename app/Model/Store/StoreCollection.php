<?php

namespace Hybrid\Core\Model\Store;

use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Lib\Data\DbProviderInterface;
use \Hybrid\Core\Model\Collection\DatabaseCollection;

class StoreCollection extends DatabaseCollection implements StoreCollectionInterface {

    public function __construct(DbProviderInterface $database, FactoryInterface $storeFactory) {
        parent::__construct($database, $storeFactory, 'store', 'id');
    }
}
