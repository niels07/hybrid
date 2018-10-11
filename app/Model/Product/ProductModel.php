<?php

namespace Hybrid\Core\Model\Product;

use \Hybrid\Core\Model\AbstractModel;
use \Hybrid\Lib\Data\DbProviderInterface;

class ProductModel extends AbstractModel implements ProductModelInterface {

    private $database;

    public function __construct(DbProviderInterface $database, array $data) {
        parent::__construct($data);
        $this->database = $database;
    }

    private function update() {
        $this->database->call('product_updateById', [
            $this->id,
            $this->categoryId,
            $this->name,
            $this->title,
            $this->description,
            $this->imagePath,
            $this->sku,
            $this->price,
            $this->actionPrice,
            $this->storeUrl
        ]);
    }

    protected function insert() {
        $this->database->call('product_add', [
            $this->categoryId,
            $this->name,
            $this->title,
            $this->description,
            $this->imagePath,
            $this->sku,
            $this->price,
            $this->actionPrice,
            $this->storeUrl,
        ]);
        $this->setProperty('id', $this->database->getInsertId());
    }

    private function saveSpecs() {
        $this->database->call('product_setSpecs', [
            $this->id,
            $this->specs
        ]);
    }

    private function saveImages() {
        $this->database->call('product_setImages', [
            $this->id,
            $this->images
        ]);
    }

    public function save() {
        if (!$this->id) {
            $this->insert();
        } else {
            $this->update();
        }
        $this->saveSpecs();
        $this->saveImages();
        return $this;
    }

    public function delete() {
        $this->database->call('product_deleteById', [ $this->id ]);
    }

    public function getThumbnailPath() {
        if ($this->imagePath) {
            return $this->imagePath;
        }
        if ($this->images == null || count($this->images) == 0) {
            return '';
        }
        return $this->images[0][0];
    }
}
