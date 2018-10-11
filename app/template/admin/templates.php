<div id="admin-templates-page">
    <h1>Templates</h1>
    <div class="field">
        <label for="template-selection">Template</label>
        <select id="template-selection" data-bind="change:loadTemplateContent">
            <?php foreach ($this->getTemplates() as $name => $template) { ?>
                <option value="<?php echo $name; ?>">
                    <?php echo $name; ?>
                </option>
            <?php } ?>
        </select>
    </div>
    <div id="editors" class="tab-control">
        <div class="tab-buttons">
            <a href="#" class="tab-button active" data-tab-target="html">HTML</a>
            <a href="#" class="tab-button" data-tab-target="css">CSS</a>
            <button id="save-template-button" data-bind="click:saveTemplate">Opslaan</button>
            <div class="clear"></div>
        </div>

        <div class="tab active" data-tab-name="html">
            <div class="editor-wrapper">
                <div id="template-editor" class="editor"></div>
            </div>
        </div>

        <div class="tab" data-tab-name="css">
            <div class="editor-wrapper">
                <div id="css-editor" class="editor"></div>
            </div>
        </div>
    </div>

    <div id="template-manager">
        <div id="template-image-uploader">
            <h2>Afbeelding Uploaden</h2>
            <div class="field">
                <label for="image-name">Naam afbeeling</label>
                <input type="text" id="image-name" />
            </div>
            <input type="file" id="upload-image" />
            <button data-bind="click:uploadImage">Uploaden</button>
        </div>

        <div id="template-image-selector">
            <h2>Afbeelding Invoegen</h2>
            <select id="image-selection"></select>
            <div id="image-preview"></div>

            <button data-bind="click:insertImage">Toevoegen</button>
        </div>
    </div>
    <div class="clear"></div>
</div>

