<?php

namespace Hybrid\Core\Controller\Admin;

use \Hybrid\Core\Model\Product\ProductCollectionInterface;

class ProductController extends ModelController {
    public function __construct(ProductCollectionInterface $collection) {
        parent::__construct($collection, 'id');
    }
}
