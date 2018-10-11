<?php

namespace Hybrid\Core\Model\Collection;

use \Hybrid\Lib\DI\FactoryInterface;

class BaseCollection implements CollectionInterface {

    private $factory;
    private $items;

    public function __construct(
        FactoryInterface $factory,
        $items = []) {

        $this->factory = $factory;
        $this->items = $items;
    }

    public function add(array $data) {
        $item = $this->factory->create($data);
        $this->items[] = $item;
        return $item;
    }

    private function getItems() {
        return $this->items;
    }

    public function find($field, $value) {
        $item = reset($this->getItems());

        if ($item && $item->hasProperty($field)) {
            foreach ($this->items as $item) {
                if ($item->{$field} == $value) {
                    return $item;
                }
            }
        }
        return null;
    }

    public function delete($index) {
        unset($this->items[$index]);
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
        $this->delete($id);
    }

    public function offsetGet($offset) {
        return $this->items[$offset];
    }
}
