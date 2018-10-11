<?php

namespace Hybrid\Core\Route;

use \Hybrid\Lib\Config\ConfigInterface;

class RouteConverter implements RouteConverterInterface {
    private $config;

    public function __construct(ConfigInterface $config) {
        $this->config = $config;
    }

    public function getRouteClass(string $route, string $type): string {
        $type = ucfirst($type);
        $path = str_replace('/', '\\', str_replace('-', '', ucwords($route, '/-')));
        return "{$this->config->get('root_namespace')}\\{$type}\\{$path}{$type}"; 
    }

    public function getViewClass(string $route): string {
        return $this->getRouteClass($route, 'view');
    }

    public function getControllerClass(string $route): string {
        return $this->getRouteClass($route, 'controller');
    }
}