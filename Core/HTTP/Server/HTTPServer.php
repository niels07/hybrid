<?php

namespace Hybrid\Core\HTTP\Server;

class HTTPServer implements ServerInterface {
    public function getUrl(): string {
        $url = 'http://' . $_SERVER['SERVER_NAME'];
        if ($_SERVER['SERVER_PORT'] != '80') {
            $url .= ':' . $_SERVER['SERVER_PORT'];
        }
        $url .= $_SERVER['REQUEST_URI'];
        return $url;
    }

    public function getUrlPath(): string {
        $path = parse_url($this->getUrl(), PHP_URL_PATH);
        $path = str_replace('index.php', '', $path);
        return $path;
    }

    public function getRootDir(): string {
        return $_SERVER['DOCUMENT_ROOT'];
    }

    public function getFullPath(string $file): string {
        $rootDir = $this->getRootDir();
        $path = "$rootDir/$file";
        if (is_dir($path)) {
            $path .= '/';
        }
        return $path;
    }
}