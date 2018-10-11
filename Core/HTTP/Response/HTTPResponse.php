<?php

namespace Hybrid\Core\HTTP\Response;

class HTTPResponse implements ResponseInterface {
    private $data;
    private $error;
    private $isSend;

    public function __construct() {
        $this->data = []; 
        $this->isSend = false;
    }

    public function set(string $key, $value): void {
        $this->data[$key] = $value;
    }

    public function error(string $message): void {
        $this->error = $message;
    }

    public function isSend(): bool {
        return $this->isSend;
    }

    private function createResponseString(): string {
        $response = [ 'data' => json_encode($this->data) ];
        if ($this->error) {
            $response['error'] = $this->error;
            $response['status'] = 'failure';
        } else {
            $response['status'] = 'success';
        }
        return json_encode($response);
    }

    public function send(): void {
        $response = $this->createResponseString();
        $this->isSend = true;
        echo $response;
    }
}