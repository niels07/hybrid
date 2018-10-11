<?php

namespace Hybrid\Core\HTTP\Request;

interface RequestInterface {
    function get(string $name);
    function getMethod(): string;
    function getUploadedFile(string $name): ?\Hybrid\Core\HTTP\UploadedFileInterface;
    function isXHR(): bool;
}