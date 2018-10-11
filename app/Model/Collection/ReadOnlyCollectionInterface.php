<?php

namespace Hybrid\Core\Model\Collection;

interface ReadOnlyCollectionInterface extends \IteratorAggregate, \ArrayAccess {

    function toArray();

}
