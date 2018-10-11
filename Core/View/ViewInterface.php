<?php

namespace Hybrid\Core\View;

interface ViewInterface {
    function getContent();
    function renderContent();
    function render();
}
