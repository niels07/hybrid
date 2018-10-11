<?php

namespace Hybrid\Core\Model\Product;

use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Lib\Data\DbProviderInterface;
use \Hybrid\Core\Model\Collection\DatabaseCollection;

class ProductCollection extends DatabaseCollection implements ProductCollectionInterface {

    public function __construct(DbProviderInterface $database, FactoryInterface $productFactory) {
        parent::__construct($database, $productFactory, 'product', 'id');
    }
}
