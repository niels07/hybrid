<?php

namespace Hybrid\Lib\DI;

class Factory implements FactoryInterface {
    private $provider;

    public function __construct(callable $provider) {
        $this->provider = $provider;
    }

    public function create() {
        return call_user_func_array($this->provider, func_get_args());
    }
}