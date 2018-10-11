<?php

namespace Hybrid\Core\View\Admin;

use \Hybrid\Core\View\PageView;
use \Hybrid\Core\Model\Template\TemplateCollectionInterface;

class TemplatesView extends PageView {

    private $templateCollection;

    public function __construct(TemplateCollectionInterface $templateCollection) {
        $this->templateCollection = $templateCollection;
        parent::__construct('admin', 'admin/templates', 'Templates');
    }

    public function getTemplates() {
        return $this->templateCollection->toArray();
    }
}
