<?php

namespace Hybrid\Lib\DI;

class FactoryService extends Service {
    private $callback;

    public function __construct(\Closure $callback) {
        parent::__construct(null); 
        $this->callback = $callback;
        $this->valueParam('provider', $callback);
    }

    public function getCallback() {
        return $this->callback;
    }

}