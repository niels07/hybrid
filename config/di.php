<?php

use \Hybrid\Core;
use \Hybrid\Core\Model;
use \Hybrid\Core\View;
use \Hybrid\Core\Controller;
use \Hybrid\Core\Route;

use \Hybrid\Lib;
use \Hybrid\Lib\IO;
use \Hybrid\Lib\Config;
use \Hybrid\Lib\Data;
use \Hybrid\Lib\Http;

return [
    Config\ConfigInterface::class
        => $this->service(Config\ConfigHandler::class)
        ->valueParam('path', '/config/appSettings.php'),

    IO\Console\OutputInterface::class
        => $this->service(IO\Console\Output::class),

    IO\FileHandlerInterface::class
        => $this->service(IO\FileHandler::class),

    IO\FileManagerInterface::class
        => $this->service(IO\FileManager::class)
        ->resolveParam('fileFactory', 'FileFactory'),

    Core\HTTP\UploadedFileInterface::class
        => $this->service(Core\HTTP\UploadedFile::class),

    Core\HTTP\ImageUploaderInterface::class
        => $this->service(Core\HTTP\ImageUploader::class),

    Model\Category\CategoryModel::class
        => $this->service(),
    Core\HTTP\Server\ServerInterface::class
        => $this->service(Core\HTTP\Server\HTTPServer::class),
    Model\Product\ProductModel::class
        => $this->service(),

    Model\User\UserModel::class
        => $this->service(),

    Model\Template\TemplateModel::class
        => $this->service(),

    Model\Store\StoreModel::class
        => $this->service(),

    Core\HTTP\Response\ResponseInterface::class
        => $this->service(Core\HTTP\Response\HTTPResponse::class),

    Core\HTTP\Request\RequestInterface::class
        => $this->service(Core\HTTP\Request\HTTPRequest::class)
        ->resolveParam('fileFactory', 'UploadedFileFactory'),

    Core\HTTP\Session\SessionInterface::class
        => $this->service(Core\HTTP\Session\HTTPSession::class),

    'CategoryFactory'
        => $this->factory(Model\Category\CategoryModel::class),

    'ProductFactory'
        => $this->factory(Model\Product\ProductModel::class),

    'UserFactory'
        => $this->factory(Model\User\UserModel::class),

    'TemplateFactory'
        => $this->factory(Model\Template\TemplateModel::class),

    'StoreFactory'
        => $this->factory(Model\Store\StoreModel::class),

    Route\RouteConverterInterface::class
        => $this->service(Route\RouteConverter::class),

    'ControllerFactory'
        => $this->service(Controller\ControllerFactory::class)
        ->resolveParam('viewFactory', 'ViewFactory')
        ->valueParam('factoryMethod', function(string $name) {
            $routeConverter = $this->resolve(Route\RouteConverterInterface::class);
            $className = $routeConverter->getControllerClass($name);
            return $this->tryResolve($className);
        }),

    'ViewFactory'
        => $this->factory(function() {
            $args = func_get_args();
            if (count($args) === 0) {
                return null;
            }
            $routeConverter = $this->resolve(Route\RouteConverterInterface::class);
            $name = array_shift($args);
            $class = $routeConverter->getViewClass($name);
            $view = $this->tryResolve($class, $args);
            if ($view) {
                return $view;
            }
            $layout = explode('/', $name)[0];
            return $this->resolve(View\BaseView::class, [$layout, $name]);
        }),

    'UploadedFileFactory'
            => $this->factory(function(array $file)  {
            $name = basename($file['name']);
            $ext  = substr($name, strrpos($name, '.') + 1);
            $name = substr($name, 0, strlen($name) - strlen($ext) - 1);
            $size = $file['size'] / 1024;
            $path = $file['tmp_name'];
            return $this->newInstance(Core\HTTP\UploadedFileInterface::class, [$name, $ext, $size, $path]);
        }),

    'FileFactory'
        => $this->factory(Lib\IO\FileHandlerInterface::class),

    'RequestFactory'
        => $this->factory(Core\HTTP\Request\RequestInterface::class),

    'ResponseFactory'
        => $this->factory(Core\HTTP\Response\ResponseInterface::class),

    'SessionFactory'
        => $this->factory(Core\HTTP\Session\SessionInterface::class),

    View\Page\HomeView::class
        => $this->service(),

    View\Page\FaqView::class
        => $this->service(),

    View\Page\ContactView::class
        => $this->service(),

    View\Page\StoreView::class
        => $this->service(),

    View\Page\OffersView::class
        => $this->service(),

    View\Page\Store\CategoriesView::class => $this->service(),
    View\Page\Store\ProductsView::class => $this->service(),
    View\Page\Store\ProductView::class => $this->service(),
    View\Page\StoresView::class => $this->service(),
    View\Page\FooterView::class => $this->service(),
    View\BaseView::class => $this->service(),
    View\Admin\HomeView::class => $this->service(),
    View\Admin\LoginView::class => $this->service(),
    View\Admin\UsersView::class => $this->service(),
    View\Admin\CategoriesView::class => $this->service(),
    View\Admin\ProductsView::class => $this->service(),
    View\Admin\TemplatesView::class => $this->service(),
    View\Admin\StoresView::class => $this->service(),

    \PDO::class => $this->service(\PDO::class)
        ->valueParam('dsn','mysql:host=localhost;dbname=hybrid;charset=utf8')
        ->valueParam('username', 'hybrid')
        ->valueParam('passwd', 'hybrid'),

    Data\DbProviderInterface::class => $this->service(Data\DbProvider::class),

    Model\Product\ProductCollectionInterface::class
        => $this->service(Model\Product\ProductCollection::class)
        ->resolveParam('productFactory', 'ProductFactory'),

    Model\Category\CategoryCollectionInterface::class
        => $this->service(Model\Category\CategoryCollection::class)
        ->resolveParam('categoryFactory', 'CategoryFactory'),

    Model\Store\StoreCollectionInterface::class
        => $this->service(Model\Store\StoreCollection::class)
        ->resolveParam('storeFactory', 'StoreFactory'),

    Model\User\UserCollectionInterface::class
         => $this->service(Model\User\UserCollection::class)
        ->resolveParam('userFactory', 'UserFactory'),

    Model\Template\TemplateCollectionInterface::class
        => $this->service(Model\Template\TemplateCollection::class)
        ->resolveParam('templateFactory', 'TemplateFactory'),

    Lib\Http\SessionManagerInterface::class
        => $this->service(Lib\Http\SessionManager::class),

    Route\RequestRouter::class => $this->service()
        ->resolveParam('controllerFactory', 'ControllerFactory')
        ->resolveParam('requestFactory', 'RequestFactory')
        ->resolveParam('responseFactory', 'ResponseFactory')
        ->resolveParam('sessionFactory', 'SessionFactory'),

    Controller\AdminController::class
        => $this->service()
        ->resolveParam('viewFactory', 'ViewFactory'),

    Controller\Admin\ProductController::class => $this->service(),
    Controller\Admin\CategoryController::class => $this->service(),
    Controller\Admin\StoreController::class => $this->service(),
    Controller\Admin\UserController::class => $this->service(),
    Controller\Admin\TemplateController::class => $this->service(),

    Controller\PageController::class
        => $this->service()
        ->resolveParam('viewFactory', 'ViewFactory'),

    Controller\Page\Store\ProductController::class
        => $this->service()
        ->resolveParam('viewFactory', 'ViewFactory'),

    Controller\Page\Store\ProductsController::class
        => $this->service()
        ->resolveParam('viewFactory', 'ViewFactory'),

];
