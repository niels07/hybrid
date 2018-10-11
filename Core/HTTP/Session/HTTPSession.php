<?php

namespace Hybrid\Core\HTTP\Session;

class HTTPSession implements SessionInterface {

    public function get(string $name) {
        return array_key_exists($name, $_SESSION) ? $_SESSION[$name] : null;
    }

    public function set(string $name, $value): void {
        $_SESSION[$name] = $value;
    }

    public function clear(): void {
        session_destroy();
    }
}
