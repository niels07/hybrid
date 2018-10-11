<?php

namespace Hybrid\Lib\IO\Exception;

class ReadException extends IOException {
     public function __construct(string $path = null) {
        $lastError = error_get_last();
        $message = "failed to write to $path";
        if ($lastError) {
            $message .= ": {$lastError['message']}";
        }
        parent::__construct($message, 0, null, $path);
    }
}