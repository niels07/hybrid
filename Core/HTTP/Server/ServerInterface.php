<?php

namespace Hybrid\Core\HTTP\Server;

interface ServerInterface {
    function getUrl(): string;
    function getUrlPath(): string;
    function getRootDir(): string;
    function getfullPath(string $file): string;
}
