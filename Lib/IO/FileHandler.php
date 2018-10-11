<?php

namespace Hybrid\Lib\IO;

class FileHandler implements FileHandlerInterface {
    private $path;
    private $file;
    private $isOpen;

    public function __construct(string $path) {
        $this->path = $path;
        $this->isOpen = false;
    }

    public function isOpen(): bool {
        return $this->isOpen; 
    }

    public function open(int $mode, bool $overwrite = false): void {
        $modeStr = '';

        switch ($mode) {
        case FileMode::Read:
            if (!file_exists($this->path)) {
                throw new Exception\FileNotFoundException($this->path);
            }
            $modeStr = 'r';
            break;
        case FileMode::Write:
            $modeStr = $overwrite ? 'w' : 'a';
            break;
        case FileMode::ReadWrite:
            $modeStr = $overwrite ? 'w+' : 'a+';
            break;
        }  
        $this->file = fopen($this->path, $modeStr);

        if ($this->file !== false) {
            $this->isOpen = true;
            return;
        }
        $err = "failed to open {$this->path}";
        $lastErr = error_get_last();
        if ($lastErr) {
            $err .= ": $lastErr";
        }
        throw new Exception\IOException($err, 0, null, $this->path);
    }

    public function write(string $str): void {
        if (!$this->isOpen) {
            throw new Exception\IOException("file is not open");
        }
        if (fwrite($this->file, $str) !== false) {
            return;
        }
        throw new Exception\WriteException($this->path);
    }

    public function read(int $size): string {
        if (!$this->isOpen) {
            throw new Exception\IOException("file is not open");
        }
        $result = fread($this->file, $size);
        if ($result !== false) {
            return $result;
        }
        throw new Exception\ReadException($this->path);
    }

    public function getSize(): int {
        return filesize($this->path);
    }

    public function close(): void {
        if ($this->isOpen) {
            fclose($this->file);
        }
    }
}