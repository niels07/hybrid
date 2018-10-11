<?php

namespace Hybrid\Core\Model\Store;

use \Hybrid\Core\Model\AbstractModel;
use \Hybrid\Lib\Data\DbProviderInterface;

class StoreModel extends AbstractModel implements StoreModelInterface {

    private $database;

    public function __construct(DbProviderInterface $database, array $data) {
        parent::__construct($data);
        $this->database = $database;
    }

    private function update() {
        $this->database->call('store_updateById', [
            $this->id,
            $this->name,
            $this->street,
            $this->street_number,
            $this->city,
            $this->zipcode,
            $this->country,
            $this->phone,
            $this->email,
            json_encode($this->days)
        ]);
    }

    protected function insert() {
        $this->database->call('store_add', [
            $this->name,
            $this->street,
            $this->street_number,
            $this->city,
            $this->zipcode,
            $this->country,
            $this->phone,
            $this->email,
            json_encode($this->days)
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
        $this->database->call('store_deleteById', [ $this->id ]);
    }
}
