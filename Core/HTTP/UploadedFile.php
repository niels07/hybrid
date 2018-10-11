<?php

namespace Hybrid\Core\HTTP;
use \Hybrid\Lib\IO\Exception\FileNotFoundException;

class UploadedFile implements UploadedFileInterface {
    private $name;
    private $extension;
    private $size;
    private $tmpPath;
    private $path;

    public function __construct(string $name, string $extension, int $size, string $tmpPath) {
        $this->name = $name;
        $this->extension = $extension;
        $this->size = $size;
        $this->tmpPath = $tmpPath;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getExtension(): string {
        return $this->extension;
    }

    public function getFileName(): string {
        return "{$this->name}.{$this->extension}" ;
    }

    public function getPath(): string {
        return $this->path ? $this->path : $this->tmpPath;
    }

    public function move(string $path, bool $createDir = true): void {
        $dirname = dirname($path);
        if (!file_exists($dirname)) {
            if ($createDir) {
                mkdir($dirname, 0777, true);
            } else {
                throw new FileNotFoundException($dirname);
            }
        }
        move_uploaded_file($this->tmpPath, $path);
        $this->path = $path;
    }
}