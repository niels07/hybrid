<?php

namespace Hybrid\Lib\IO;
	
interface FileManagerInterface {
    function writeAllText(string $path, string $text): void;
    function readAllText(string $path): string;
}