<?php

namespace Hybrid\Lib\Request;

abstract class AbstractRequestHandler implements RequestHandlerInterface {

    private $request;

    public function __construct() {}

    protected function getRequest($name = null, $default = null) {
        if (!$this->request) {
            $this->request = array_merge($_POST, $_GET);
        }

        if (!$name) {
            return $this->request;
        }

        if (array_key_exists($name, $this->request)) {
            return $this->request[$name];
        }
        return $default;
    }

    protected function getUrl() {
        $url = 'http://' . $_SERVER['SERVER_NAME'];
        if ($_SERVER['SERVER_PORT'] != '80') {
            $url .= ':' .$_SERVER['SERVER_PORT'];
        }
        $url .= $_SERVER['REQUEST_URI'];
        return $url;
    }

    protected function parseUrl($component) {
        return parse_url($this->getUrl(), $component);
    }

    protected function getPath() {
        $path = $this->parseUrl(PHP_URL_PATH);
        $path = str_replace('index.php', '', $path);
        return $path;
    }
}
