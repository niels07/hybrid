<?php

namespace Hybrid\Lib\Text;

class TextHandler implements TextHandlerInterface {

    public function Slugify($string) {
        $string = preg_replace('~[^\pL\d]+~u', '-', $string);
        $string = iconv('utf-8', 'us-ascii//TRANSLIT', $string);
        $string = preg_replace('~[^-\w]+~', '', $string);
        $string = trim($string, '-');
        $string = preg_replace('~-+~', '-', $string);
        return strtolower($string);
    }
}
