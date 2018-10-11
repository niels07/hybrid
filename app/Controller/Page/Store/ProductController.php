<?php

namespace Hybrid\Core\Controller\Page\Store;

use \Hybrid\Core\Controller\PageController;
use \Hybrid\Core\Model\Product\ProductCollectionInterface;
use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Lib\Config\ConfigInterface;
use \Hybrid\Core\HTTP\Request\RequestInterface;
use \Hybrid\Core\HTTP\Response\ResponseInterface;
use \Hybrid\Core\HTTP\Session\SessionInterface;
use \Hybrid\Core\Model\Product\ProductModelInterface;

class ProductController extends PageController {

    private $productCollection;

    public function __construct(ProductCollectionInterface $productCollection) {
        parent::__construct([
            'defaultAction' => 'defaultAction',
            'actions' => [
                'renderView' => 'renderViewAction'
            ]
        ]);
        $this->productCollection = $productCollection;
    }

    private function getProduct(RequestInterface $request): ProductModelInterface {
        $productId = $request->get('productId');
        $product = $this->productCollection[$productId];
        return $product;
    }

    public function renderViewAction(RequestInterface $request, ResponseInterface $response): void {
        $product =  $this->getProduct($request, $response);
        $view = $this->getView('page/store/product', $product);
        $this->prepareViewResponse($response, $view);
    }

    private function defaultAction(RequestInterface $request, ResponseInterface $response): void {
        $product =  $this->getProduct($request, $response);
        $view = $this->getView('page/store/product', $product);
        $view->render();
    }
}
