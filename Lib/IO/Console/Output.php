<?php

namespace Hybrid\Lib\IO\Console;

class Output implements OutputInterface {
    public function write() {
        $args = func_get_args();
        $fmt = array_shift($args);
        printf($fmt, $args);
    }

    public function writeLn() {
        $args = func_get_args();
        $fmt = array_shift($args) . PHP_EOL;
        printf($fmt, $args);
    }
}
