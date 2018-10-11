<?php

namespace Hybrid\Lib\DI;

class Service implements ServiceInterface {

    private $class;
    private $params;

    public function __construct(?string $class) {
        $this->class = $class;
        $this->params = [];
    }

    public function resolveParam(string $name, string $service): ServiceInterface {
        $this->params[$name] = [
            'data' => $service,
            'resolve' => true,
        ];
        return $this;
    }

    public function valueParam(string $name, $data): ServiceInterface {
        $this->params[$name] = [
            'data' => $data,
            'resolve' => false,
        ];
        return $this;
    }

    public function getParams(): array {
        return $this->params;
    }

    public function getClass(): ?string {
        return $this->class;
    }

    public function setClass(string $class) {
        $this->class = $class;
    }
}
