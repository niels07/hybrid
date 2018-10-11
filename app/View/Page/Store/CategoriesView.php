<?php

namespace Hybrid\Core\View\Page\Store;

use \Hybrid\Core\View\AbstractView;
use \Hybrid\Core\View\PageViewInterface;

use \Hybrid\Core\Model\Category\CategoryModel;
use Hybrid\Core\Model\Category\CategoryCollectionInterface;

class CategoriesView extends AbstractView implements PageViewInterface {

    private $collection;
    private $category;

    public function __construct(CategoryCollectionInterface $collection) {
        $this->collection = $collection;
        parent::__construct('page', 'page/store/categories');
    }

    protected function getCategories() {
        return $this->collection->toArray();
    }

    public function getContent() {
        return $this->getTemplate('page/store/categories');
    }

    public function renderContent() {
        $this->renderTemplate('page/store/categories');
    }

    public function render() {
        $this->renderLayout('page');
    }

    public function getTitle() {
        return 'Categoriën';
    }

    public function setCategory(CategoryModel $category) {
        $this->category = $category;
    }

    public function getCategory() {
        return $this->category;
    }

    public function getData() {
        return $this->category;
    }
}
