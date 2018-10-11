<?php

namespace Hybrid\Core\Controller\Admin;

use \Hybrid\Core\Controller\AbstractController;
use \Hybrid\Core\Model\Collection\DatabaseCollectionInterface;
use \Hybrid\Core\HTTP\Request\RequestInterface;
use \Hybrid\Core\HTTP\Response\ResponseInterface;
use \Hybrid\Core\HTTP\Session\SessionInterface;

abstract class ModelController extends AbstractController {

    private $collection;
    private $keyName;

    public function __construct(
        DatabaseCollectionInterface $collection,
        string $keyName = 'id',
        array $config = []) {

        $this->collection = $collection;
        $this->keyName = $keyName;

        $config['actions'] = array_merge([
            'save' => 'saveAction',
            'delete' => 'deleteAction',
            'getById' => 'getByIdAction',
            'getByField' => 'getByFieldAction',
            'getAll' => 'getAllAction'
        ], $config['actions']);

        $config['preAction'] = $config['preAction'] ?? 'preAction';
        parent::__construct($config);
    }

    public function getCollection(): DatabaseCollectionInterface {
        return $this->collection;
    }

    public function saveAction(RequestInterface $request, ResponseInterface $response): void {
        $data = $request->getData();
        $item = $this->collection->save($data);
        $response->set('item', $item->toJson());
        $response->send();
    }

    public function getAllAction(ResponseInterface $response): void {
        $responseData = [];
        foreach ($this->collection as $id => $item) {
            $responseData[] = $item->toArray();
        }
        $response->set('items', $responseData);
        $response->send();
    }

    public function deleteAction(RequestInterface $request, ResponseInterface $response): void {
        $id = $request->get($this->keyName);
        $item = $this->collection->delete($id);
        $response->set('item', $item->toJson());
        $response->send();
    }

    public function getByIdAction(RequestInterface $request, ResponseInterface $response): void {
        $id = $request->get($this->keyName);
        if (!$id) {
            $response->send('item', '{}');
            return;
        }
        $item = $this->collection[$id];
        $response->set('item', $item->toJson());
        $response->send();
    }

    public function getByFieldAction(RequestInterface $request, ResponseInterface $response): void {
        $responseData = [];
        $field = $request->get('field');
        $value = $request->get('value');

        $this->collection->addFilter("$field = '$value'");

        foreach ($this->collection as $id => $item) {
            $responseData[] = $item->toArray();
        }
        $response->set('items', $responseData);
        $response->send();
    }

    public function preAction(
        RequestInterface $request,
        ResponseInterface $response,
        SessionInterface $session): bool {
        if ($session->get('authorized')) {
            return true;
        }
        $response->error('unauthorized');
        return false;
    }
}
