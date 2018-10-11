<?php

namespace Hybrid\Core\View\Admin;

use \Hybrid\Core\View\PageView;
use \Hybrid\Core\Model\Category\CategoryCollectionInterface;

class CategoriesView extends PageView {

    private $categoryCollection;

    public function __construct(CategoryCollectionInterface $categoryCollection) {
        $this->categoryCollection = $categoryCollection;
        parent::__construct('admin', 'admin/categories', 'Filialen');
    }

    public function getCategories(): array {
        return $this->categoryCollection->toArray();
    }

    public function getData(): array {
        return [ 'categories' => $this->getCategories() ] ;
    }
}
