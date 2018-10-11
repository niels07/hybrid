<?php

namespace Hybrid\Lib\DI\Exception;

class ServiceNameInUseException extends \Hybrid\Lib\Exception\AlreadyExistsException {
    public function __construct($name = null, $code = 0, Exception $previous = null) {
        $message = $name
            ? "The specified service name '$name' is already in use"
            : "The specified service name is already in use";
        parent::__construct($message, $code, $previous);
    }
}
