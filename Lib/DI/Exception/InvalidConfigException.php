<?php

namespace Hybrid\Lib\DI\Exception;

class InvalidConfigException extends DIException {

    public function __construct(string $message = null, int $code = 0, \Throwable $previous = null) {
        $preMessage = 'Invalid service configuration';
        $message = $message ? "$preMessage: $message" : $preMessage;
        parent::__construct($message, $code, $previous);
    }
}