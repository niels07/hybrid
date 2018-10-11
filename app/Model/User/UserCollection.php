<?php

namespace Hybrid\Core\Model\User;

use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Lib\Data\DbProviderInterface;
use \Hybrid\Core\Model\Collection\DatabaseCollection;

class UserCollection extends DatabaseCollection implements UserCollectionInterface {

    public function __construct(DbProviderInterface $database, FactoryInterface $userFactory) {
        parent::__construct($database, $userFactory, 'user', 'id');
    }
}
