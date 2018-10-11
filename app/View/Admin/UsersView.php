<?php

namespace Hybrid\Core\View\Admin;

use \Hybrid\Core\View\PageView;
use \Hybrid\Core\Model\User\UserCollectionInterface;

class UsersView extends PageView {

    private $userCollection;

    public function __construct(UserCollectionInterface $userCollection) {
        $this->userCollection = $userCollection;
        parent::__construct('admin', 'admin/users', 'Gebruikers');
    }

    public function getUsers(): array {
        return $this->userCollection->toArray();
    }
}
