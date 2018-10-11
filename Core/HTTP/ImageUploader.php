<?php

namespace Hybrid\Core\HTTP;

use \Hybrid\Lib\Config\ConfigInterface;

class ImageUploader implements ImageUploaderInterface {
    private $config;

    public function __construct(ConfigInterface $config) {
        $this->config = $config;
    }

    public function upload(
        Request\RequestInterface $request,
        Response\ResponseInterface $response,
        string $name,
        string $targetDir): bool {

        $uploadedImage = $request->getUploadedFile($name);
        $filename = $uploadedImage->getFileName();
        $imagesPath = "{$this->config->get('images_path')}/$targetDir/";
        $targetPath = "$imagesPath/$filename";

        try {
            $uploadedImage->move("{$_SERVER['DOCUMENT_ROOT']}/$targetPath");
            $response->set('path', $targetPath);
            return true;
        } catch (\Exception $e) {
            $response->error($e->getMessage);
            return false;
        }
    }
}