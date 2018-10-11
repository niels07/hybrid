<?php

namespace Hybrid\Core;

use \Hybrid\Lib\DI\Container;

class App {

    private $container;

    public function __construct() {
        $this->container = new Container('config/di.php');
    }

    public function loadPage() {
        $pageController = $this->container->resolve(Controller\PageController::class);
        $pageController->loadContent();
    }

    public function loadAdmin() {
        $adminController = $this->container->resolve(Controller\AdminController::class);
        $adminController->loadContent();
    }

    public function dispatch() {
        $router = $this->container->resolve(Route\RequestRouter::class);
        $router->route();
    }
}
