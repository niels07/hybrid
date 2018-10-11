<?php

namespace Hybrid\Lib\Data;

interface DbProviderInterface {

    function query(string $sql, array $args = []): DbProviderInterface;
    function fetchAll(): array;
    function fetch();

}
