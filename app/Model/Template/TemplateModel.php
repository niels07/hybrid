<?php

namespace Hybrid\Core\Model\Template;

use \Hybrid\Core\Model\AbstractModel;
use \Hybrid\Lib\Config\ConfigInterface;
use \Hybrid\Lib\IO\FileManagerInterface;

class TemplateModel extends AbstractModel {

    private $fileManager;
    private $content;
    private $css;
    private $images;
    private $cssPath;
    private $tplPath;
    private $imgPath;
    private $rImgPath;

    private function getFullPath(string $path, ?string $ext = null): string {
        if ($ext) $ext = ".$ext";
        return preg_replace('#/+#', '/', "{$_SERVER['DOCUMENT_ROOT']}/{$path}{$ext}");
    }

    public function __construct(ConfigInterface $config, FileManagerInterface $fileManager, string $name) {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $tplPath = $config->get('template_path');
        $cssPath = $config->get('css_path');
        $imgPath = $config->get('images_path');

        $this->tplPath = preg_replace('#/+#','/', "$root/$tplPath/$name.php");
        $this->cssPath = preg_replace('#/+#','/', "$root/$cssPath/$name.less");
        $this->imgPath = preg_replace('#/+#','/', "$root/$imgPath/$name");
        $this->rImgPath = "$imgPath/$name";
        $this->fileManager = $fileManager;
        $this->loadImages();
    }

    private function loadImages(): void {
        if (!file_exists($this->imgPath)) {
            $this->images = [];
            return;
        }
        $files = scandir($this->imgPath);
        $exts = [ 'png', 'jpg', 'gif' ];

        foreach ($files as $file) {
            $pathInfo = pathinfo($file);
            if (array_key_exists('extension', $pathInfo)
                && in_array($pathInfo['extension'], $exts)) {
                $this->images[] = "{$this->rImgPath}/$file";
            }
        }
    }

    public function getContent(): string {
        if (!$this->content) {
            $this->content = file_get_contents($this->tplPath);
        }
        return $this->content;
    }

    public function getCss(): string {
        if (!$this->css) {
            $this->css = file_get_contents($this->cssPath);
        }
        return $this->css;
    }

    public function setContent(string $content): void {
        $this->content = $content;
    }

    public function setCss(string $css): void {
        $this->css = $css;
    }

    public function save(): void{
        if ($this->content) {
            $this->fileManager->writeAllText($this->tplPath, $this->content);
        }

        if ($this->css) {
            $this->fileManager->writeAllText($this->cssPath, $this->css);
        }
    }

    public function addImage(string $name, array $image): string {
        if (!file_exists($this->imgPath)) {
            mkdir($this->imgPath, 0777, true);
        }
        $filename = "$name.{$image['ext']}";
        $path = "{$this->imgPath}/$filename";
        move_uploaded_file($image['path'], $path);
        $rPath = "{$this->rImgPath}/$filename";
        $this->images[] = $rPath;
        return $rPath;
    }

    public function getImages() {
        return $this->images;
    }
}
