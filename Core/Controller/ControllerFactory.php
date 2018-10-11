<?php

namespace Hybrid\Core\Controller;

use \Hybrid\Core\Controller\PageController;
use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Core\Controller\ControllerInterface;
use \Hybrid\Lib\Config\ConfigInterface;

class ControllerFactory implements FactoryInterface {

    private $factoryMethod;
    private $viewFactory;
    private $appConfig;

    public function __construct(
        FactoryInterface $viewFactory,
        ConfigInterface $appConfig,
        callable $factoryMethod) {

        $this->appConfig = $appConfig;
        $this->viewFactory = $viewFactory;
        $this->factoryMethod = $factoryMethod;
    }

    public function create(string $name): ?ControllerInterface {
        $controller = call_user_func($this->factoryMethod, $name);
        
        if (!($controller instanceof PageController)) {
            return $controller;
        }
        $controller->init($this->viewFactory, $this->appConfig);
        return $controller;
    }
}