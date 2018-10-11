<?php

namespace Hybrid\Core\HTTP;

interface FileUploaderInterface {
    function upload(
        Request\RequestInterface $request,
        Response\ResponseInterface $response,
        string $name,
        string $targetDir): bool;
}
