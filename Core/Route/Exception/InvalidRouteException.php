<?php

namespace Hybrid\Core\Route\Exception;

class InvalidRouteException extends \Exception {
    private $route;

    public function __construct(string $route, int $code = 0, \Throwable $previous = null) {
        $this->route = $route;
        parent::__construct("invalid route: $route", $code, $previous);
    }

    public function getRoute(): string {
        return $this->route; 
    }
}