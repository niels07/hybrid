<?php

namespace Hybrid\Core\Controller\Page\Store;

use \Hybrid\Core\Controller\PageController;
use \Hybrid\Core\Model\Product\ProductCollectionInterface;
use Hybrid\Core\HTTP\Request\RequestInterface;
use Hybrid\Core\HTTP\Response\ResponseInterface;

class ProductsController extends PageController {

    private $productCollection;

    public function __construct(ProductCollectionInterface $productCollection) {
        parent::__construct([
            'actions' => [
                'renderView' => 'renderViewAction'
            ],
            'defaultAction' => 'defaultAction',
        ]);
        $this->productCollection = $productCollection;
    }

    private function getProducts($categoryId) {
        $this->productCollection->clearFilters();
        $this->productCollection->addFilter("categoryId = $categoryId");
        return $this->productCollection->getItems();
    }

    public function renderViewAction(RequestInterface $request, ResponseInterface $response): void {
        $categoryId = $request->get('categoryId');
        $products = $this->getProducts($categoryId);
        $view = $this->getView('page/store/products', $products);
        $this->prepareViewResponse($response, $view);
    }

    private function defaultAction(RequestInterface $request): void {
        $categoryId = $request->get('categoryId');
        $products = $this->getProducts($categoryId);
        $view = $this->getView('page/store/products', $products);
        $view->render();
    }
}
