<?php

namespace Hybrid\Lib\DI\Exception;

class ServiceNotFoundException extends \Hybrid\Lib\Exception\NotFoundException {
    public function __construct($name = null, $code = 0, Exception $previous = null) {
        $message = $name
            ? "The requested service '$name' could not be found"
            : "The requested service could not be found";
        parent::__construct($message, $code, $previous);
    }
}
