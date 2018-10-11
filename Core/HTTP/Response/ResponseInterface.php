<?php

namespace Hybrid\Core\HTTP\Response;

interface ResponseInterface {
    function set(string $key, $value): void;
    function error(string $message): void;
    function send(): void;
}
