<?php

namespace Hybrid\Core\HTTP\Session;

interface SessionInterface {
    function get(string $name);
    function set(string $name, $value): void;
    function clear(): void;
}