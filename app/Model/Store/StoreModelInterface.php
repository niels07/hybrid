<?php

namespace Hybrid\Core\Model\Store;

use \Hybrid\Core\Model\ModelInterface;

interface StoreModelInterface extends ModelInterface {
    function save();
    function delete();
}
