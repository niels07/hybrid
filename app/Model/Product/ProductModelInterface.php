<?php

namespace Hybrid\Core\Model\Product;

use \Hybrid\Core\Model\ModelInterface;

interface ProductModelInterface extends ModelInterface {
    function save();
    function delete();
}
