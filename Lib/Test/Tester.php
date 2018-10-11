<?php

namespace Hybrid\Lib\Test;

class Tester {

    private $success = true;
    private $errors;

    private function printSuccess($method) {
        $class = get_class($this);
        echo "[SUCCESS] $class - $method" . PHP_EOL;
    }

    private function printError($method, array $error) {
        $class = get_class($this);
        $type = $error['type'];
        $message = $error['message'];
        echo "[FAILURE] $class - $method: $message" . PHP_EOL;
    }

    private function runTestMethod($method) {
        $this->success = true;
        $this->errors = [];

        try {
            $this->{$method}();
        } catch (Exception $e) {
            $this->errors[] = $e->getMessage();
            $this->success = false;
        }

        if ($this->success) {
            $this->printSuccess($method);
        } else {
            $this->printError($method, $this->errors[0]);
        }
    }

    private function runAll() {
        $methods = get_class_methods($this);
        $class = get_class($this);
        foreach ($methods as $method) {
            if (substr($method, -4) === 'Test') {
                $this->runTestMethod($method);
            }
        }
    }

    public function run($method = null) {
        if ($method) {
            $this->runTestMethod($method);
        } else {
            $this->runAll();
        }
    }

    private function failure($message, $type) {
        $this->errors[] = [
            'type' => $type,
            'message' => $message
        ];
        $this->success = false;
    }

    public function assert($condition) {
        if ($condition == false) {
            $this->failure('condition should evaluate to true', 'assert');
        }
    }

    public function assertTrue($value) {
        if ($value !== true) {
            $this->failure('value should be true', 'assertTrue');
        }
    }

    public function assertFalse($value) {
        if ($value === true) {
            $this->failure('value should be false', 'assertFalse');
        }
    }

    public function assertNull($value) {
        if ($value !== null) {
            $this->failure('value should be null', 'assertNull');
        }
    }

    public function assertNotNull($value) {
        if ($value === null) {
            $this->failure('value should not be null', 'assertNotNull');
        }
    }

    public function assertEquals($value1, $value2) {
        if ($value1 === $value2) {
            return;
        }
        if (is_array($value1)) {
            $value1 = 'Array: ' . json_encode($value1);
        }

        if (is_array($value2)) {
            $value2 = 'Array: ' . json_encode($value2);
        }
        $this->failure("values don't match: '$value1', '$value2'", 'assertEquals');
    }
}
