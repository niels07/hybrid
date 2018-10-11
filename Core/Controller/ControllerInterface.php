<?php

namespace Hybrid\Core\Controller;

use \Hybrid\Core\HTTP\Request\RequestInterface;
use \Hybrid\Core\HTTP\Response\ResponseInterface;
use \Hybrid\Core\HTTP\Session\SessionInterface;
use \Hybrid\Core\HTTP\Server\ServerInterface;

interface ControllerInterface {
    function dispatch(
        string $action,
        RequestInterface $request,
        ResponseInterface $response,
        SessionInterface $session,
        ServerInterface $server): void;
}
