<?php

namespace Hybrid\Core\Controller\Admin;

use \Hybrid\Core\Controller\AbstractController;
use \Hybrid\Core\Model\Template\TemplateCollectionInterface;
use \Hybrid\Lib\IO\FileManagerInterface;
use \Hybrid\Core\HTTP\Request\RequestInterface;
use \Hybrid\Core\HTTP\Response\ResponseInterface;
use \Hybrid\Core\HTTP\Session\SessionInterface;
use Hybrid\Core\Model\Template\TemplateModel;

class TemplateController extends AbstractController {

    private $templateCollection;
    private $fileManager;

    public function __construct(
        TemplateCollectionInterface $templateCollection,
        FileManagerInterface $fileManager) {

        $this->templateCollection = $templateCollection;
        $this->fileManager = $fileManager;
        parent::__construct([
            'actions' => [
                'getTemplate' => 'getTemplateAction',
                'saveTemplate' => 'saveTemplateAction',
                'savePageCss' => 'savePageCssAction',
                'uploadImage' => 'uploadImageAction'
            ],
            'preAction' => 'preAction'
        ]);
    }

    private function getTemplate(string $name): TemplateModel {
        if (!isset($this->templateCollection[$name])) {
            throw new \InvalidArgumentException("template '$name' not found");
        }
        return $this->templateCollection[$name];
    }

    public function getTemplateAction(RequestInterface $request, ResponseInterface $response): void {
        $template = $this->getTemplate($request->get('template'));
        $response->set('content', $template->getContent());
        $response->set('css', $template->getCss());
        $response->set('images', $template->getImages());
    }

    public function saveTemplateAction(RequestInterface $request, ResponseInterface $response): void {
        $template = $this->getTemplate($request->get('template'));
        $content = $request->get('content');
        $css = $request->get('css');

        $template->setContent($content);
        $template->setCss($css);

        if ($template->save() === false) {
            $this->addError('failed to write to template');
        }
        $path = "{$_SERVER['DOCUMENT_ROOT']}/css/page.less";
        $response->set('css', $this->fileManager->readAllText($path));
    }

    public function savePageCssAction(RequestInterface $request): void {
        $css = $request->get('css');
        $path = "{$_SERVER['DOCUMENT_ROOT']}/css/page.css";
        $this->fileManager->writeAllText($path, $css);
    }

    public function uploadImageAction(RequestInterface $request, ResponseInterface $response): void {
        $name = $request->get('name');
        $imgData = $request->get('image');
        $template = $this->getTemplate($request->get('template'));
        try {
            $imgPath = $template->addImage($name, $imgData);
            $response->set('path', $imgPath);
        } catch (Exception $e) {
            $response->error($e->getMessage());
        }
    }

    public function preAction(ResponseInterface $response, SessionInterface $session) {
        if ($session->get('authorized')) {
            return true;
        }
        $response->error('unauthorized');
        return false;
    }
}
