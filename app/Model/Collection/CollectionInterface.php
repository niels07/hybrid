<?php

namespace Hybrid\Core\Model\Collection;

interface CollectionInterface extends \IteratorAggregate, \ArrayAccess {

    function add(array $data);
    function toArray();

}
