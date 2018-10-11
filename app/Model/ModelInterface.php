<?php

namespace Hybrid\Core\Model;

interface ModelInterface {
    function toJson();
    function toArray();
    function setData(array $data);
    function hasProperty($name);
}
