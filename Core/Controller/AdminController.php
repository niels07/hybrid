<?php

namespace Hybrid\Core\Controller;

use \Hybrid\Core\Model\User\UserCollectionInterface;
use \Hybrid\Core\HTTP\Request\RequestInterface;
use \Hybrid\Core\HTTP\Response\ResponseInterface;
use \Hybrid\Core\HTTP\Session\SessionInterface;

class AdminController extends \Hybrid\Core\Controller\PageController {

    private $userCollection;

    public function __construct(UserCollectionInterface $userCollection) {
        $this->userCollection = $userCollection;
        parent::__construct([
            'actions' => [
                'login' => 'loginAction',
                'verifyLogin' => 'verifyLoginAction',
                'logout' => 'logoutAction',
            ],
            'preAction' => 'preAction'
        ]);
    }

    public function login(RequestInterface $request, SessionInterface $session): bool {
        $username = $request->get('username');
        $password = $request->get('password');

        if (!$username || !$password) {
            return false;
        }

        $user = $this->userCollection->get('name', $username);
        if (!$user) {
            return false;
        }

        $authorized = password_verify($password, $user->hash);

        if (!$authorized) {
            return false;
        }

        $session->set('authorized', true);
        return true;
    }

    private function userAuthorized(SessionInterface $session) {
        return ($session->get('authorized') === true);
    }

    private function checkLogin(RequestInterface $request, SessionInterface $session) {
        if ($this->userAuthorized($session)) {
            return true;
        }
        return $this->login($request, $session);
    }

    public function loginAction(
        RequestInterface $request,
        ResponseInterface $response,
        SessionInterface $session): void {

        $loggedIn = $this->checkLogin($request, $session);
        $response->set('authorized', $loggedIn);
    }

    public function logoutAction(SessionInterface $session): void {
        $session->clear();
    }

    public function verifyLoginAction(ResponseInterface $response, SessionInterface $session): void {
        $response->set('authorized', $this->userAuthorized($session));
    }

    public function preAction(RequestInterface $request, SessionInterface $session): bool {
        if ($this->userAuthorized($session)) {
            return true;
        }
        $allowedActions = [
            'verifyLogin',
            'login',
        ];
        $action = $this->getAction();

        if ($action == 'renderView') {
            return $request->get('view') == 'admin/login';
        }
        return !$action || in_array($action, $allowedActions);
    }
}
