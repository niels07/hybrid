<?php
session_start();
ini_set('html_errors', 0);

require 'Lib/Autoload/Autoloader.php';

(new \Hybrid\Lib\Autoload\Autoloader(__DIR__))
    ->addPath('Core')
    ->addPath('Lib')
    ->addPath('app')
    ->addPrefix('Hybrid')
    ->addPrefix('Hybrid\\Core')
    ->load();
