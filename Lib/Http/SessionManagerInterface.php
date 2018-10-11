<?php

namespace Hybrid\Lib\Http;

interface SessionManagerInterface {
    function getSession($name);
    function setSession($name, $value);
    function clearSession();
}
