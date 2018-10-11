<?php

namespace Hybrid\Core\Model\Category;

use \Hybrid\Core\Model\AbstractModel;
use \Hybrid\Lib\Data\DbProviderInterface;
use \Hybrid\Lib\Config\ConfigInterface;

class CategoryModel extends AbstractModel {

    private $database;
    private $config;

    public function __construct(DbProviderInterface $database, ConfigInterface $config, array $data) {
        parent::__construct($data);
        $this->database = $database;
        $this->config = $config;
    }

    private function update() {
        $this->database->call('category_updateById', [
            $this->id,
            $this->name,
            $this->imagePath
        ]);
    }

    protected function insert() {
        $this->database->call('category_add', [ $this->name, $this->imagePath ]);
        $this->setProperty('id', $this->database->getInsertId());
    }

    public function save() {
        if (!$this->id) {
            $this->insert();
        } else {
            $this->update();
        }
        return $this;
    }

    public function delete() {
        $this->database->call('category_deleteById', [ $this->id ]);
    }
}
