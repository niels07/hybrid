<?php

namespace Hybrid\Lib\IO;

use \Hybrid\Lib\DI\FactoryInterface;

class FileManager implements FileManagerInterface {
    private $fileFactory;

    public function __construct(FactoryInterface $fileFactory) {
        $this->fileFactory = $fileFactory;
    }

    public function writeAllText(string $path, string $text): void {
        $file = $this->fileFactory->create($path);
        $file->open(FileMode::Write, true);
        $file->write($text);
        $file->close();
    }

    public function readAllText(string $path): string {
        $file = $this->fileFactory->create($path) ;
        $file->open(FileMode::Read);
        $result = $file->read($file->getSize());
        $file->close();
        return $result;
    }
}