<?php

namespace Hybrid\Lib\IO\CSV;

class CSVFile {
    private $path;
    private $delimiter;
    private $enclosure;
    private $columns;
    private $rows;
    private $maxLineLength;

    public function __construct($path, $delimiter = ',', $enclosure = '"', $maxLineLength = 2048) {
        $this->path = $path;
        $this->delimiter = $delimiter;
        $this->enclosure = $enclosure;
        $this->maxLineLength = $maxLineLength;
    }

    private function parseLine($handle) {
        $line = fgetcsv($handle, $this->maxLineLength, $this->delimiter);

        if ($line === false) {
            return null;
        }

        if (!count($line) == count($this->columns)) {
            throw new \Exception('field count does not match number of columns');
        }

        $data = [];
        for ($i = 0; $i < count($this->columns); $i++) {
            $column = $this->columns[$i];
            $data[$column] = $line[$i];
        }

        return $data;
    }

    private function readData() {
        $handle = fopen($this->path, 'r');
        $header = fgetcsv($handle, $this->maxLineLength, $this->delimiter);

        for ($i = 0; $i < count($header); $i++) {
            $this->columns[] = $header[$i];
        }

        $this->rows = [];
        while ($line = $this->parseLine($handle)) {
            $this->rows[] = $line;
        }
        fclose($handle);
    }

    private function writeRow(resource $handle, array $row) {
        $line = implode($this->delimiter, array_values($row));
        fwrite($handle, $line . PHP_EOL);
    }

    public function writeData() {
        $handle = fopen($this->path, 'w');
        $header = implode($this->delimiter, $this->columns);
        fwrite($handle, $header);
        foreach ($this->rows as $row) {
            $this->writeRow($handle, $row);
        }
        fclose($handle);
    }

    public function getData() {
        if (!$this->rows) {
            $this->readData();
        }
        return $this->rows;
    }

    public function setData(array $data) {
        $this->columnNames = array_shift($data);
        $this->rows = $data;
    }
}
