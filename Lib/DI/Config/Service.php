<?php

namespace Hybrid\Lib\DI\Config;

class Service {

    private $class;
    private $params;

    public function __construct($class) {
        $this->class = $class;
        $this->params = [];
    }

    public function resolveParam() {
        $args = func_get_args();
        if (count($args) == 0) {
            throw new InvalidArgumentException('Service::resolveParam expects at least 1 argument');
        }
        $param = array_shift($args);
        $this->params[] = [
            'data' => $param,
            'resolve' => true,
            'args' => $args
        ];
        return $this;
    }

    public function valueParam($param) {
        $this->params[] = [
            'data' => $param,
            'resolve' => false,
            'args' => []
        ];
        return $this;
    }

    }
