<?php

namespace Hybrid\Core\Model\Collection;

use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Lib\Data\DbProviderInterface;

class DatabaseCollection implements DatabaseCollectionInterface {

    private $factory;
    private $database;
    private $tableName;
    private $primaryKey;
    private $filters;
    private $items;

    public function __construct(
        DbProviderInterface $database,
        FactoryInterface $factory,
        $tableName,
        $primaryKey = 'id') {

        $this->database = $database;
        $this->tableName = $tableName;
        $this->primaryKey = $primaryKey;
        $this->factory = $factory;
        $this->items = null;
        $this->filters = [];
    }

    private function getProcName() {
        return count($this->filters) > 0 ? 'applyFilter': 'getAll';
    }

    private function fetchItems() {
        $procName = $this->getProcName();
        $result = $this->execute($procName, $this->filters);

        $this->items = [];
        while ($row = $result->fetch()) {
            $id = $row[$this->primaryKey];
            $this->items[$id] = $this->factory->create($row);
        }
    }

    private function execute($name, $args) {
        if (!is_array($args)) {
            $args = [ $args ];
        }
        return $this->database->call("{$this->tableName}_$name", $args);
    }

    public function getItems() {
        if (!$this->items) {
            $this->fetchItems();
        }
        return $this->items;
    }

    public function get($field, $value = null) {
        $items = $this->getItems();

        if ($field === $this->primaryKey || $value === null) {
            return array_key_exists($value, $items) ? $items[$value] : null;
        }
        $item = reset($items);

        if (!$item || !$item->hasProperty($field)) {
            return null;
        }
        foreach ($this->items as $key => $item) {
            if ($item->{$field} == $value) {
                return $item;
            }
        }
        return null;
    }

    public function addFilter($filter) {
        $this->filters[] = $filter;
        $this->items = null;
        return $this;
    }

    public function clearFilters() {
        $this->filters = [];
        $this->items = null;
        return $this;
    }

    public function refresh() {
        $this->fetchItems();
    }

    public function save($data) {
        $item = $this->factory->create($data);
        $item->save();
        $this->items = null;
        return $item;
    }

    public function add(array $data) {
        return $this->save($data);
    }

    public function delete($id) {
        if ($this->items && array_key_exists($id, $this->items)) {
            $item = $this->items[$id];
            unset($this->items[$id]);
        } else { 
            $item = $this->factory->create([
                $this->primaryKey => $id     
            ]);
        }
        $item->delete();
        return $item;
    }

    public function getIterator() {
        return new \ArrayIterator($this->getItems());
    }

    public function toArray() {
        return $this->getItems();
    }

    public function offsetSet($offset, $value) {
        $this->items[$offset] = $value;
    }

    public function offsetExists($offset) {
        return isset($this->items[$offset]);
    }

    public function offsetUnset($offset) {
        $this->delete($offset);
    }

    public function offsetGet($offset) {
        return $this->get($this->primaryKey, $offset);
    }
}
