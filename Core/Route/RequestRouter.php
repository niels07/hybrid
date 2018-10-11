<?php

namespace Hybrid\Core\Route;

use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Lib\Config\ConfigInterface;
use \Hybrid\Core\Controller\ControllerInterface;
use \Hybrid\Core\HTTP\Server\ServerInterface;

class RequestRouter implements RouterInterface {

    private $requestFactory;
    private $controllerFactory;
    private $responseFactory;
    private $sessionFactory;
    private $defaultRoute;
    private $server;

    public function __construct(
        ConfigInterface $config,
        FactoryInterface $controllerFactory,
        FactoryInterface $requestFactory,
        FactoryInterface $responseFactory,
        FactoryInterface $sessionFactory,
        ServerInterface $server) {

        $this->controllerFactory = $controllerFactory;
        $this->requestFactory = $requestFactory;
        $this->responseFactory = $responseFactory;
        $this->sessionFactory = $sessionFactory;
        $this->server = $server;
        $this->defaultRoute = $config->get('index_page');
    }

    public function getRoute(): string {
        if (array_key_exists('route', $_POST)) {
            return $_POST['route'];
        }

        if (array_key_exists('route', $_GET)) {
            return $_GET['route'];
        }
        return $this->server->getUrlPath();
    }

    private function getController($route): ?ControllerInterface {
        $controller = $this->controllerFactory->create($route);
        
        if ($controller) {
            return $controller;
        }

        $pathParts = explode('/', $route);

        while (!$controller && count($pathParts) > 1) {
            array_pop($pathParts);
            $route = implode('/', $pathParts);
            $controller = $this->controllerFactory->create($route);
        }

        return $controller;
    }

    public function route(): void {
        $route = $this->getRoute();
        $controller = $this->getController($route);

        if (!$controller) {
            $controller = $this->getController($this->defaultRoute);
        }

        if (!$controller) {
            throw new Exception\InvalidRouteException($route);
        }
        $request = $this->requestFactory->create();
        $response = $this->responseFactory->create();
        $session = $this->sessionFactory->create();

        $action = array_key_exists('action', $_POST) ? $_POST['action'] : null;
        $controller->dispatch($action, $request, $response, $session, $this->server);
    }
}
