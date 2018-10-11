<?php

namespace Hybrid\Lib\Data;

use \Hybrid\Lib\DI\Factory;

class DbTable implements DbTableInterface {

    private $name;
    private $columns;
    private $database;

    public function __construct($name, DbProviderInterface $database) {
        $this->name = $name;
        $this->database = $database;
    }

    private function loadColumns() {
        $result = $this->database->call('getFields', [$this->name]);
        $this->columns = $result->fetchAll();
    }

    public function getColumns() {
        if (!$this->columns) {
            $this->loadColumns();
        }
        return $this->columns;
    }

    public function getName() {
        return $this->name;
    }
}

