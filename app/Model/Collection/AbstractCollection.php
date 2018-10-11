<?php

namespace Hybrid\Core\Model\Collection;

use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Lib\Data\DbProviderInterface;

abstract class AbstractCollection implements CollectionInterface {

    private $items;
    private $factory;
    private $database;
    private $keyName;
    private $methodName;
    private $table;
    private $args;

    public function __construct(
        DbProviderInterface $database,
        FactoryInterface $factory,
        $table,
        $methodName,
        array $methodArgs = [],
        $keyName = 'id') {

        $this->items = [];
        $this->factory = $factory;
        $this->database = $database;
        $this->keyName = $keyName;
        $this->methodName = $methodName;
        $this->methodArgs = $methodArgs;
        $this->table = $table;
        $this->fetchItems();
    }

    private function fetchItems() {
        $this->data = [];

        $result = $this->database->call(
            $this->table . '_' . $this->methodName,
            $this->methodArgs);

        while ($row = $result->fetch()) {
            $this->add($row);
        }
    }

    private function add(array $data) {
        $item = $this->factory->create($data);
        $this->items[$item->{$this->keyName}] = $item;
        return $item;
    }

    private function getById($id) {
        return array_key_exists($id, $this->items)
            ? $this->items[$id]
            : null;
    }

    private function getByField($field, $value) {
        $item = reset($this->items);

        if (!$item->hasProperty($field)) {
            return null;
        }

        foreach ($this->items as $id => $item) {
            if ($item->{$field} === $value) {
                return $item;
            }
        }
        return null;
    }

    public function get($key, $value = null) {
        return $value ? $this->getByField($key, $value) : $this->getById($key);
    }

    public function save(array $data) {
        $item = null;
        if (array_key_exists($this->keyName, $data)) {
            $id = $data[$this->keyName];
            $item = $this->get($id);
        }
        if ($item) {
            $item->setData($data);
        } else {
            $item = $this->factory->create($data);
        }
        $item->save();
        $this->items[$item->{$this->keyName}] = $item;
        return $item;
    }

    public function saveAll(array $data) {
        $this->database->call($this->table . '_addCollection', [ $data ]);
    }

    public function delete($id) {
        if (!array_key_exists($id, $this->items)) {
            throw new \InvalidArgumentException("no item found with id '$id'");
        }
        $item = $this->items[$id];
        $item->delete();
        unset($this->items[$id]);
    }

    public function getIterator() {
        return new \ArrayIterator($this->items);
    }

    public function toArray() {
        return $this->items;
    }

    public function offsetSet($offset, $value) {
        throw new \Exception(get_class($this) . ' access is read only.');
    }

    public function offsetExists($offset) {
        return isset($this->items[$offset]);
    }

    public function offsetUnset($offset) {
        $this->delete($id);
    }

    public function offsetGet($offset) {
        return $this->get($offset);
    }
}
