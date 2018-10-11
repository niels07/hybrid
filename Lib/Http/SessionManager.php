<?php

namespace Hybrid\Lib\Http;

class SessionManager implements SessionManagerInterface {

    public function getSession($name) {
        return array_key_exists($name, $_SESSION)
            ? $_SESSION[$name]
            : null;
    }

    public function setSession($name, $value) {
        $_SESSION[$name] = $value;
    }

    public function clearSession() {
        session_destroy();
    }
}
