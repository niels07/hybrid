<?php

namespace Mail;

interface MailerInterface {
    function send();
    function addAddress($address);
    function addAttachment($attachment);
    function __set($name, $value);
    function __get($name);
}
