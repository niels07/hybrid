<?php

namespace Mail;

class Mailer implements MailerInterface {

    private $attachment;
    private $addresses;
    private $messageInfo;
    private $uid;

    const EOL = "\r\n";

    public function __construct() {
        $this->addresses = [];
        $this->messageInfo = [
            'message' => '',
            'subject' => '',
            'from'    => '',
            'replyTo' => ''
        ];
    }

    public function addAttachment($attachment) {
        $this->attachment = $attachment;
    }

    public function addAddress($address) {
        $this->addresses[] = $address;
    }

    public function __set($name, $value) {
        if (array_key_exists($name, $this->messageInfo)) {
            $this->messageInfo[$name] = $value;
            return;
        }

        $trace = debug_backtrace()[0];
        $file = $trace['file'];
        $line = $trace['line'];
        throw new \Exception("Undefined property: $name in $file on line $line");
    }

    public function __get($name) {
        if (array_key_exists($name, $this->messageInfo)) {
            return $this->messageInfo[$name];
        }

        $trace = debug_backtrace()[0];
        $file = $trace['file'];
        $line = $trace['line'];
        throw new \Exception("Undefined property: $name in $file on line $line");
    }

    private function getHeaders() {
        $headers = 'From: ' . $this->from . self::EOL;
        $headers .= 'Reply-To: ' . $this->replyTo. self::EOL;
        $headers .= 'MIME-Version: 1.0' . self::EOL;
        $headers .= 'Content-Type: multipart/mixed; boundary="' . $this->uid. '"' . self::EOL;
        return $headers;
    }

    private function getAttachment() {
        $content = file_get_contents($this->attachment);
        $content = chunk_split(base64_encode($content));
        $body = '--' . $this->uid . self::EOL;
        $body .= 'Content-Type: application/octet-stream; name="' . $this->attachment . '"' . self::EOL;
        $body .= 'Content-Transfer-Encoding: base64' . self::EOL;
        $body .= 'Content-Disposition: attachment' . self::EOL . self::EOL;
        $body .= $content . self::EOL . self::EOL;
        $body .= '--' . $this->uid. '--';
        return $body;
    }

    private function getBody() {
        $body = '--' . $this->uid. self::EOL;
        $body .= 'Content-Type: text/plain; charset="iso-8859-1"' . self::EOL;
        $body .= 'Content-Transfer-Encoding: 7bit' . self::EOL . self::EOL;
        $body .= $this->message . self::EOL . self::EOL;
        return $body;
    }

    public function send() {
        $this->uid = md5(uniqid(time()));
        $body = $this->getBody();

        if ($this->attachment != null) {
            $body .= $this->getAttachment();
        }
        $headers = $this->getHeaders();

        foreach ($this->addresses as $to) {
            mail($to, $this->subject, $body, $headers);
        }
    }
}
