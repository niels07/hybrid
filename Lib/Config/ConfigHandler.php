<?php

namespace Hybrid\Lib\Config;

use \Hybrid\Lib\IO\Exception\FileNotFoundException;

class ConfigHandler implements ConfigInterface {

    private $configPath;
    private $config;

    private function getFullConfigPath($path) {
        if (is_readable($path)) {
            return $path;
        }

        if (substr($path, 0, 1) !== '/') {
            $path = "/$path";
        }

        $path = $_SERVER['DOCUMENT_ROOT'] . $path;

        if (!is_readable($path)) {
            throw new FileNotFoundException($path);
        }
        return $path;

    }

    public function __construct($path) {
        $this->configPath = $this->getFullConfigPath($path);
    }

    private function loadConfig() {
        $this->config = require $this->configPath;
    }

    public function get($key) {
        if (!$this->config) {
            $this->loadConfig();
        }

        if (!array_key_exists($key, $this->config)) {
            return null;
        }
        return $this->config[$key];
    }
}
