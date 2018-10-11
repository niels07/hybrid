<?php

namespace Hybrid\Lib\IO\CSV;

interface CSVFileInterface {
    function writeData();
    function getData();
    function setData(array $data);
}
