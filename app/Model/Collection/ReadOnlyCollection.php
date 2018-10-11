<?php

namespace Hybrid\Core\Model\Collection;

class ReadOnlyCollection implements ReadOnlyCollectionInterface {

    private $items;

    public function __construct(array $items = []) {
        $this->items = $items;
    }

    protected function setItems(array $items) {
        $this->items = $items;
    }

    public function getIterator() {
        return new \ArrayIterator($this->getItems());
    }

    public function offsetSet($offset, $value) {
        throw new \LogicException('Attemp to write to a readonly collection');
    }

    public function offsetUnset($offset) {
        throw new \LogicException('Attemp to write to a readonly collection');
    }

    public function offsetExists($offset) {
        return isset($this->items[$offset]);
    }

    public function offsetGet($offset) {
        return $this->items[$offset];
    }

    public function toArray() {
        return $this->items;
    }
}
