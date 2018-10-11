<?php

namespace Hybrid\Lib\IO;

interface FileHandlerInterface {
    function isOpen(): bool;
    function open(int $mode, bool $overwrite = false): void;
    function write(string $str): void;
    function read(int $size): string;
    function getSize(): int;
    function close(): void;
}
