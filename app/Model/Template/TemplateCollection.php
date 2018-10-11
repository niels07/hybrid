<?php

namespace Hybrid\Core\Model\Template;

use \Hybrid\Core\Model\Collection\ReadOnlyCollection;
use \Hybrid\Lib\DI\FactoryInterface;
use \Hybrid\Lib\Config\ConfigInterface;

class TemplateCollection extends ReadOnlyCollection implements TemplateCollectionInterface {

    public function __construct(ConfigInterface $config, FactoryInterface $templateFactory) {
        $this->templateFactory = $templateFactory;
        $this->config = $config;
        parent::__construct($this->getTemplates());
    }

    private function addTemplate(array &$templates, string $root, string $dir): void {
        $path = "$root/$dir";

        if (!is_dir($path)) {
            $pathInfo = pathinfo($path);
            if (!array_key_exists('extension', $pathInfo) || $pathInfo['extension'] !== 'php') {
                return;
            }
            $name = str_replace('.php', '', $dir);
            $key = "page/$name";
            $templates[$key] =  $this->templateFactory->create($name);
            return;
        }
        $files = scandir($path);

        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $this->addTemplate($templates, $root, "$dir/$file");
            }
        }
    }

    private function getTemplates(): array {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $path = $this->config->get('template_path');
        $path = "$root/$path";
        $files = scandir($path);
        $templates = [];
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $this->addTemplate($templates, $path, $file);
            }
        }
        ksort($templates);
        return $templates;
    }
}
