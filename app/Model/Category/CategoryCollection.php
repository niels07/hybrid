<?php

namespace Hybrid\Core\Model\Category;

use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Lib\Data\DbProviderInterface;
use \Hybrid\Core\Model\Collection\DatabaseCollection;

class CategoryCollection extends DatabaseCollection implements CategoryCollectionInterface {

    public function __construct(DbProviderInterface $database, FactoryInterface $categoryFactory) {
        parent::__construct($database, $categoryFactory, 'category', 'id');
    }
}
