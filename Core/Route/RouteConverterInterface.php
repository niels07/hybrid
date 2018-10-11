<?php

namespace Hybrid\Core\Route;

interface RouteConverterInterface {
    function getRouteClass(string $route, string $type): string;
    function getViewClass(string $route): string;
    function getControllerClass(string $route): string;
}
