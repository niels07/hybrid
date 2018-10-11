<?php

namespace Hybrid\Core\Controller;

use \Hybrid\Core\View\PageViewInterface;
use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Lib\Config\ConfigInterface;
use \Hybrid\Core\HTTP\Request\RequestInterface;
use \Hybrid\Core\HTTP\Response\ResponseInterface;
use \Hybrid\Core\View\ViewInterface;
use Hybrid\Core\HTTP\Server\ServerInterface;

class PageController extends AbstractController implements PageControllerInterface {

    private $viewFactory;
    private $defaultView;
    private $locale;
    private $appConfig;

    public function __construct(array $config = []) {
        if (array_key_exists('locale', $_COOKIE)) {
            $this->locale = $_COOKIE['locale'];
        }

        $actions = [
            'renderView' => 'renderViewAction',
            'setLocale' => 'setLocaleAction'
        ];

        $config['actions'] = array_key_exists('actions', $config) 
            ? array_merge($actions, $config['actions'])
            : $actions;

        if (!array_key_exists('defaultAction', $config)) {
            $config['defaultAction'] = 'defaultAction';
        }

        parent::__construct($config);
    }

    public function init(FactoryInterface $viewFactory, ConfigInterface $appConfig): void {
        $this->viewFactory = $viewFactory;
        $this->appConfig = $appConfig;
    }

    protected function prepareViewResponse(ResponseInterface $response, ViewInterface $view): void {
        $response->set('content', $view->getContent());

        if (!($view instanceof PageViewInterface)) {
            return;
        }

        if ($title = $view->getTitle()) {
            $siteTitle = $this->appConfig->get('site_name');
            $response->set('title', "$siteTitle - $title");
        }
        $data = $view->getData();

        if (!$data) {
            return;
        }

        foreach ($data as $key => $value) {
            $response->set($key, $value);
        }
    }

    private function createView(array $args) {
        $view = call_user_func_array([$this->viewFactory,'create'], $args);
        $view->setLocale($this->locale);
        return $view;
    }

    protected function getView() {
        $args = func_get_args();
        if (count($args) == 0) {
            throw new \InvalidArgumentException('getView expects at least 1 argument');
        }
        return $this->createView($args);
    }

    protected function renderView() {
        $args = func_get_args();
        if (count($args) == 0) {
            throw new \InvalidArgumentException('renderView expects at least 1 argument');
        }
        $view = $this->createView($args);
        $view->render();
    }

    public function renderViewAction(RequestInterface $request, ResponseInterface $response): void {
        $name = $request->get('view');
        $view = $this->getView($name, $request);
        $this->prepareViewResponse($response, $view);
    }

    public function setLocaleAction(RequestInterface $request): void {
        $locale = $request->get('locale');
        $this->locale = $locale;
        setcookie("locale", $locale, time() + 3600 * 24);
    }

    private function getUrlPath(string $url): ?string {
        $path = preg_replace('/\/+/', '/', $url);
        $path = trim($path, '/');
        return ($path == '') ? null : $path;
    }

    private function defaultAction(RequestInterface $request, ServerInterface $server): void {
        $path = $this->getUrlPath($server->getUrl());
        $defaultPath = $this->appConfig->get('index_page');

        if (!$path) {
            $path = $defaultPath;
        }
        $requestData = $request->getData();
        $view = $this->createView([$path, $requestData]);
        
        $appPath = $server->getFullPath('app');
        if (file_exists($appPath . $view->getTemplatePath())
        &&  file_exists($appPath . $view->getLayoutPath())) {
            $view->render();
        } else {
            $view = $this->createView([$defaultPath]);
            $view->render();
        }
    }
}
