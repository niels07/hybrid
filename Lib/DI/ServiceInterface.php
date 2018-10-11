<?php

namespace Hybrid\Lib\DI;

interface ServiceInterface {
    function resolveParam(string $name, string $service);
    function valueParam(string $name, $data);
    function getParams();
    function getClass();
}
