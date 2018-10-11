<?php

namespace Hybrid\Lib\Data;

class DbProvider implements DbProviderInterface {

    private $conn;
    private $stmt;

    public function __construct(\PDO $conn) {
        $this->conn = $conn;
    }

    public function query(string $sql, array $args = []): DbProviderInterface {
        $this->stmt = $this->conn->prepare($sql);
        if (!$this->stmt->execute($args)) {
            var_dump($sql);
            var_dump($args);
            throw new \Exception($this->stmt->errorInfo()[2]);
        }
        return $this;
    }

    private function handleField(array &$row, string $key, $value) {
        $data = explode(':', $key);
        if (count($data) < 2) {
            return;
        }
        unset($row[$key]);
        $key = $data[1];
        switch ($data[0]) {
        case 'json':
            $row[$key] = json_decode($value);
            break;
        default:
            $row[$key] = $value;
            break;
        }
    }

    public function fetch() {
        $row = $this->stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$row) {
            return null;
        }
        foreach ($row as $key => $value) {
            $this->handleField($row, $key, $value);
        }
        return $row;
    }

    public function fetchAll(): array {
        $rows = [];
        while ($row = $this->fetch()) {
            $rows[] = $row;
        }
        return $rows;
    }

    private function getArg($arg) {
        if (!is_array($arg)) {
            return $arg;
        }
        $args = $arg;
        $argStr = '';
        foreach ($args as $arg) {
            if ($argStr !== '') $argStr .= ',';
            $argStr .= "('" . (is_array($arg) ? implode("','", $arg) : $arg) . "')";
        }
        return $argStr;
    }

    private function handleArgs(array &$args) {
        $argStr = '';
        $flatArgs = [];
        foreach ($args as $arg) {
            if ($argStr !== '') $argStr .= ',';
            $argStr .= '?';
            $flatArgs[] = $this->getArg($arg);
        }
        $args = $flatArgs;

        return $argStr;
    }

    public function call($name, array $data = []) {
        $sql = "CALL $name(";

        if (count($data) > 0) {
            $sql .= $this->handleArgs($data);
        }
        $sql .= ')';
        return $this->query($sql, $data);
    }

    public function getInsertId() {
        return $this->query('SELECT @insert_id AS id')->fetch()['id'];
    }
}
