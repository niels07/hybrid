<?php

namespace Hybrid\Core\Model;

abstract class AbstractModel implements ModelInterface {

    private $data;

    public function __construct(array $data = []) {
        $this->data = $data;
    }

    private function getKey($name) {
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $name));
    }

    protected function setProperty($name, $value) {
        $this->data[$name] = $value;
    }

    public function __get($name) {
        return $this->get($name);
    }

    public function hasProperty($name) {
        return array_key_exists($name, $this->data);
    }

    public function toJson() {
        return json_encode($this->data);
    }

    public function toArray() {
        return $this->data;
    }

    public function setData(array $data) {
        $this->data = $data;
    }

    public function getData() {
        return $this->data;
    }

    public function get($name) {
        if (!$this->data) {
            return null;
        }
        $key = $this->getKey($name);
        if (!array_key_exists($key, $this->data)) {
            return null;
        }

        return $this->data[$key];
    }

    public function getCurrency($name, $unit = 'eu') {
        $value = $this->get($name);

        if (!$value) {
            return null;
        }

        if (!is_numeric($value)) {
            return null;
        }
        $unit = strtolower($unit);

        switch ($unit) {
        case 'eu':
            $prefix = '&euro;';
            break;

        case 'usd':
            $prefix = '&#36;';
            $value = $value * 1.17579692576;
            break;

        default:
            return null;
        }

        $value = round($value, 2);
        $value = number_format($value, 2, ',', ' ');
        return "$prefix $value";
    }
}
