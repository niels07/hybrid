<?php

namespace Hybrid\Lib\Data;

interface DbTableInterface {
    function getColumns();
    function getName();
}
