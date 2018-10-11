<?php

namespace Hybrid\Core\Controller\Admin;

use \Hybrid\Core\Model\User\UserCollectionInterface;
use \Hybrid\Core\Controller\Admin\ModelController;
use \Hybrid\Core\HTTP\Request\RequestInterface;
use Hybrid\Core\HTTP\Response\ResponseInterface;

class UserController extends ModelController {

    private $userCollection;

    public function __construct(UserCollectionInterface $userCollection)  {
        $this->userCollection = $userCollection;
        parent::__construct($userCollection, 'id');
    }

    public function saveAction(RequestInterface $request, ResponseInterface $response): void {
        $data = [ 'name' => $request->get('name') ];
        $id = $request->get('id');
        if ($id) {
            $data['id'] = $id;
        }
        $changePass = $request->get('changepass');

        if ($changePass == 'on') {
            $password = $request->get('password');
            $data['hash'] = \password_hash($password, PASSWORD_BCRYPT);
        } else {
            $data['hash'] = '';
        }

        $item = $this->userCollection->save($data);
        $response->add('item', $item->toJson());
    }
}
