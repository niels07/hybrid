<?php

namespace Hybrid\Core\HTTP;

interface UploadedFileInterface {
    function getName(): string;
    function getExtension(): string;
    function getPath(): string;
    function move(string $path): void;
}
