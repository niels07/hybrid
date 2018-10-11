<?php

namespace Hybrid\Core\Controller\Admin;

use \Hybrid\Core\Model\Category\CategoryCollectionInterface;
use \Hybrid\Core\HTTP\Request\RequestInterface;
use \Hybrid\Core\HTTP\ImageUploaderInterface;
use \Hybrid\Core\HTTP\Response\ResponseInterface;

class CategoryController extends ModelController {

    private $imageUploader;

    public function __construct(
        CategoryCollectionInterface $collection,
        ImageUploaderInterface $imageUploader) {

        $this->imageUploader = $imageUploader;
        parent::__construct($collection, 'id', [
            'actions' => [
                'uploadImage' => 'uploadImageAction'
            ]
        ]);
    }

    public function uploadImageAction(RequestInterface $request, ResponseInterface $response): void {
        $this->imageUploader->upload($request, $response, 'image', 'category');
        $response->send();
    }
}
