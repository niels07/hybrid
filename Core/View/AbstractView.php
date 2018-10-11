<?php

namespace Hybrid\Core\View;

abstract class AbstractView implements ViewInterface {

    private $args = [];
    private $templateFile;
    private $templatePath;
    private $layoutPath;
    private $translations;
    private $locale;

    private function parseLocale($path): array {
        $path = implode(DIRECTORY_SEPARATOR, [ 'locale', $this->locale, $path ]);
        $path .= '.csv';
        if (!file_exists($path)) {
            return [];
        }
        $file = fopen($path, "r");

        if (!$file) {
            return [];
        }
        while (($line = fgetcsv($file, 0, ',')) !== FALSE) {
            $key = $line[0];
            $val = $line[1];
            $this->translations[$key] = $val;
        }
        return $this->translations;
    }

    public function __construct($layout = null, $template = null) {
        $this->templatePath = $template;
        $this->layoutPath = $layout;
        $this->locale = null;
    }

    public function getLocale(): string {
        return $this->locale;
    }

    public function setLocale(?string $locale): void {
        $this->locale = $locale;
    }

    public function loadTranslations(): void {
        $this->translations = [];
        $this->parseLocale($this->templatePath);
        $this->parseLocale($this->layoutPath);
    }

    protected function gettext($text) {
        if (!$this->locale) {
            return $text;
        }

        if (!$this->translations) {
            $this->loadTranslations();
        }

        if (!array_key_exists($text, $this->translations)) {
            return $text;
        }

        return $this->translations[$text];
    }

    protected function _($text) {
        echo $this->gettext($text);
    }

    protected function renderLayout($name) {
        $path = "layout/$name.php";
        require $path;
    }

    protected function getArgs() {
        return $this->args;
    }

    public function getTemplatePath() {
        return 'template/' . $this->templatePath . '.php';
    }

    public function getLayoutPath() {
        return 'layout/' . $this->layoutPath . '.php';
    }

    private function handleArgs(array $args) {
        if (count($args) == 0) {
            return false;
        }
        $name = array_shift($args);
        $this->templateFile = "template/$name.php";
        $this->args = $args;
        return true;
    }

    protected function renderTemplate() {
        $args = func_get_args();
        if (!$this->handleArgs($args)) {
            return;
        }
        require $this->templateFile;
    }

    protected function getTemplate(): ?string {
        $args = func_get_args();
        if (!$this->handleArgs($args)) {
            return null;
        }
        ob_start();
        require $this->templateFile;
        return ob_get_clean();
    }

    public function renderContent() {
        if ($this->templatePath) {
            $this->renderTemplate($this->templatePath);
        }
    }

    public function getContent() {
        return $this->templatePath
            ? $this->getTemplate($this->templatePath)
            : null;
    }

    public function render() {
        if ($this->layoutPath) {
            $this->renderLayout($this->layoutPath);
        } elseif ($this->templatePath) {
            $this->renderTemplate($this->templatePath);
        }
    }

    public function getUrl() {
        return 'http://' . $_SERVER['SERVER_NAME'] . '/' . $this->templatePath;
    }
}
