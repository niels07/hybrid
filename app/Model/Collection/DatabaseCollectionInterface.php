<?php

namespace Hybrid\Core\Model\Collection;

interface DatabaseCollectionInterface extends CollectionInterface {
    function addFilter($filter);
    function clearFilters();
    function save($data);
    function delete($id);
    function refresh();
    function get($field, $value = null);
}
