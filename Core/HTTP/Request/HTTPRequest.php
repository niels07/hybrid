<?php

namespace Hybrid\Core\HTTP\Request;

use \Hybrid\Core\HTTP\UploadedFileInterface;
use \Hybrid\Lib\DI\FactoryInterface;

class HTTPRequest implements RequestInterface {

    private $data;
    private $method;
    private $fileFactory;
    private $isXHR;

     private function decodeValue(string $value) {
        $result = json_decode($value, true);
        return $result !== null ? $result : $value;
    }

    protected function decode(string $data) {
        $result = $this->decodeValue($data);
        
        if (!is_array($result)) {
            return $result;
        }

        foreach ($result as $key => $value) {
            $result[$key] = $this->decodeValue($value);
        }
        return $result;
    }

    public function __construct(FactoryInterface $fileFactory) {
        $this->fileFactory = $fileFactory;
        if (array_key_exists('data', $_POST)) {
            $this->data = $this->decode($_POST['data']);
            $this->isXHR = array_key_exists('isXHR', $_POST) && $_POST['isXHR'] === 'true';
            $this->method = RequestMethod::Post;
        } else {
            $this->data = $_GET;
            $this->method = RequestMethod::Get;
            $this->isXHR = false;
        }
    }

    public function isXHR(): bool {
        return $this->isXHR;
    }

    public function getUploadedFile(string $name): ?UploadedFileInterface {
        if (!array_key_exists($name, $_FILES)) {
            return null; 
        }

        $file = $_FILES[$name];
        
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return null;
        }

        return $this->fileFactory->create($file);
    }

    public function get(string $name) {
        if (array_key_exists($name, $this->data)) {
            return $this->data[$name];
        } else {
            return null;    
        }
    }

    public function getData(): array {
        return $this->data; 
    }

    public function getMethod(): string {
        return $this->method;
    }
}