<?php

namespace Hybrid\Core\Controller;

use \Hybrid\Core\HTTP\Request\RequestInterface;
use \Hybrid\Core\HTTP\Response\ResponseInterface;
use \Hybrid\Core\HTTP\Session\SessionInterface;
use \Hybrid\Core\HTTP\Server\ServerInterface;

abstract class AbstractController implements ControllerInterface {

    private $action;
    private $actions;
    private $config;
    private $request;
    private $response;
    private $session;
    private $server;

    public function __construct(array $config = []) {
        $this->config = $config;
        $this->actions = array_key_exists('actions', $config)  ? $config['actions'] : [];
    }

    protected function getAction(): ?string {
        return $this->action;
    }

    private function getActionArgs(\ReflectionFunctionAbstract $fn): array {
        $args = [];
        $params = $fn->getParameters();
        foreach ($params as $param) {
            switch ((string)$param->getType()) {
                case RequestInterface::class:
                    $args[] = $this->request;
                    break;

                case ResponseInterface::class:
                    $args[] = $this->response;
                    break;

                case SessionInterface::class:
                    $args[] = $this->session;
                    break;

                case ServerInterface::class:
                    $args[] = $this->server;
                    break;
            }
        }
        return $args;
    }

    private function invokeAction($action) {
        if ($action instanceof \Closure) {
            $fn = new \ReflectionFunction($action);
            $args = $this->getActionArgs($fn);
            return $fn->invokeArgs($args);
        } else {
            $fn = new \ReflectionMethod(get_class($this), $action);
            $fn->setAccessible(true);
            $args = $this->getActionArgs($fn);
            return $fn->invokeArgs($this, $args);
        }
    }

    private function invokePreAction(): bool {
        if (!array_key_exists('preAction', $this->config))  {
            return true;
        }
        $action = $this->config['preAction'];
        return $this->invokeAction($action);
    }

    private function invokeDefaultAction() {
        if (!array_key_exists('defaultAction', $this->config))  {
            return true;
        }
        $action = $this->config['defaultAction'];
        return $this->invokeAction($action);
    }

    private function invokePostAction(): void {
        if (!array_key_exists('postAction', $this->config))  {
            return;
        }
        $action = $this->config['postAction'];
        $this->invokeAction($action);
    }

    public function handleAction() : void {
        if (!$this->invokePreAction()) {
            return;
        }

        if (!$this->action) {
            $result = $this->invokeDefaultAction();
        } elseif (array_key_exists($this->action, $this->actions)) {
            $action = $this->actions[$this->action];
            $result = $this->invokeAction($action);
        } else {
            $result = false;
        }

        if ($result === false) {
            return;
        }
       
        if (!$this->response->isSend() && $this->request->isXHR()) {
            $this->response->send();
        }

        $this->invokePostAction();
    }

    public function dispatch(
        ?string $action,
        RequestInterface $request,
        ResponseInterface $response,
        SessionInterface $session,
        ServerInterface $server): void {

        $this->request = $request;
        $this->response = $response;
        $this->session = $session;
        $this->action = $action;
        $this->server = $server;

        $this->handleAction();
    }
}
