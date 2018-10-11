<?php

namespace Hybrid\Lib\IO\Exception;

class FileNotFoundException extends IOException {

    public function __construct($path = null) {
        $message = $path !== null
            ? "File '$path' could not be found."
            : 'File could not be found.';

        parent::__construct($message, 0, null, $path);
    }
}
