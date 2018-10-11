<?php

namespace Hybrid\Core\Model\User;

use \Hybrid\Core\Model\AbstractModel;
use \Hybrid\Lib\Data\DbProviderInterface;

class UserModel extends AbstractModel {

    private $database;

    public function __construct(DbProviderInterface $database, array $data) {
        parent::__construct($data);
        $this->database = $database;
    }

    private function update() {
        $this->database->call('user_updateById', [
            $this->id,
            $this->name,
            $this->hash
        ]);
    }

    protected function insert() {
        $this->database->call('user_add', [
            $this->name,
            $this->hash
        ]);
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
        $this->database->call('user_deleteById', [ $this->id ]);
    }
}
