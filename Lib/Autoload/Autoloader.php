<?php

namespace Hybrid\Lib\Autoload;

class Autoloader {

    private $projectRoot;
    private $prefixes = ['Hybrid'];

    public function __construct($projectRoot) {
        $this->projectRoot = $projectRoot;
    }

    public function load(): void {
        spl_autoload_register([$this, 'loadClass']);
    }

    public function addPrefix($prefix): AutoLoader {
        $this->prefixes[] = $prefix;
        return $this;
    }

    public function addPath($path): AutoLoader {
        set_include_path(
            get_include_path() . PATH_SEPARATOR .
            $this->projectRoot . DIRECTORY_SEPARATOR .
            $path);
        return $this;
    }

    private function getFile($path) {
        $includeDirs = explode(PATH_SEPARATOR, get_include_path());
        foreach ($includeDirs as $includeDir) {
            $file = $includeDir . DIRECTORY_SEPARATOR . $path;
            if (@file_exists($file)) {
                return $file;
            }
        }
        return null;
    }

    private function findPrefix($class) {
        $foundPrefix = false;
        foreach ($this->prefixes as $prefix) {
            if (strpos($class, $prefix) === 0
            && (!$foundPrefix
                || strlen($prefix) > strlen($foundPrefix))) {
                $foundPrefix = $prefix;
            }
        }
        return $foundPrefix;
    }

    private function loadClass($class) {
        if (($prefix = $this->findPrefix($class)) !== false) {
            $class = substr($class, strlen($prefix));
        }

        $path = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
        $file = $this->getFile($path);

        if ($file !== null) {
            require_once $file;
        }
    }
}

