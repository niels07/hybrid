import { XHRequestHandler, XHResponse } from 'core/http';
import { ViewManager, onLoad, callback } from 'core/view';
import { inject } from 'lib/di';
import { PageView } from 'core/view';
import { Output } from '../io/output';
import { TabControl } from 'lib/html';

declare function require(
    moduleNames: string[],
    onLoad: (a: any) => void
): void

export class TemplatesView extends PageView {
    private tplEditor: any;
    private cssEditor: any;
    private imgSelect: HTMLSelectElement;

    constructor(
        @inject(XHRequestHandler) private requestHandler: XHRequestHandler,
        @inject(TabControl) private tabControl: TabControl,
        @inject(Output) private output: Output) {
        super('admin/templates');
    }

    private getSelectedTemplate = (): string => {
        var select = <HTMLSelectElement>document.getElementById('template-selection');
        return select.value;
    }

    @onLoad()
    loadView = (): void => {
        require(['lib/ace/ace'], () => {
            var editors = document.getElementById('editors');
            if (!editors) {
                return;
            }
            var w = <{ [index: string]: any }>window;
            this.tplEditor = w['ace'].edit('template-editor');
            this.tplEditor.session.setMode('ace/mode/php');
            this.cssEditor = w['ace'].edit('css-editor');
            this.cssEditor.session.setMode('ace/mode/less');
            this.loadTemplateContent();
            this.tabControl.init(editors);
            this.imgSelect = <HTMLSelectElement>document.getElementById('image-selection');
        });
    }

    private addImageOption = (src?: string): void => {
        var opt = <HTMLOptionElement>document.createElement('option');
        if (src) {
            opt.text = src.replace(/^.*[\\\/]/, '');
            opt.value = src;
        } else {
            opt.value = '';
            opt.text = '';
        }
        this.imgSelect.add(opt);
    }

    private addImages = (images: Array<string>): void => {
        this.imgSelect.innerHTML = '';
        this.addImageOption(undefined);

        if (!images || images.length == 0) {
            return;
        }
        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            this.addImageOption(img);
        }
        this.imgSelect.onchange = () => {
            var preview = document.getElementById('image-preview');
            if (!preview) {
                return;
            }
            preview.innerHTML = '';
            if (this.imgSelect.value == '') {
                return;
            }
            var img = <HTMLImageElement>document.createElement('img');
            img.src = this.imgSelect.value;
            preview.appendChild(img);
        }
    }

    @callback()
    loadTemplateContent = (): void => {
        var template = this.getSelectedTemplate();
        this.requestHandler.sendRequest({
            'route': 'admin/template',
            'action': 'getTemplate',
            'data': { 'template': template }
        }).then(r => {
            var data = r['data'];
            this.tplEditor.setValue(data['content'], -1);
            this.cssEditor.setValue(data['css'], -1);
            this.addImages(data['images']);
        });
    }

    private getImageName(file: File): string {
        var nameEl = <HTMLInputElement>document.getElementById('image-name');
        var name = nameEl.value.trim();
        return (name == '') ? file.name.replace(/\.[^/.]+$/, '') : name;
    }

    private buildCss = (css: string, onLoad: (r: XHResponse) => void): void => {
        require(['lib/less/less'], l => {
            l.render(css, {
                'rootpath': '/css/',
            }, (error: string, output: any) => {
                this.requestHandler.sendRequest({
                    'route': 'admin/template',
                    'action': 'savePageCss',
                    'data': { 'css': output.css }
                }).then(r => onLoad(r));
            });
        });
    }

    @callback()
    uploadImage = (): void => {
        var input = <HTMLInputElement>document.getElementById('upload-image');
        if (!input || !input.files) {
            return;
        }
        var tpl = this.getSelectedTemplate();
        var img = input.files[0];
        var name = this.getImageName(img);
        this.requestHandler.sendRequest({
            'route': 'admin/template',
            'action': 'uploadImage',
            'data': {
                'template': tpl,
                'image': img,
                'name': name
            },
        }).then(r => {
            var imgPath = r.getData('path');
            this.addImageOption(imgPath);
            this.output.write('De afbeelding is geupload');
        }, e => {
            var msg = 'Fout bij het uploaden van de afbeelding';
            if (e) {
                msg += ': ' + e;
            }
            this.output.error(msg);
        });
    }

    @callback()
    insertImage = (): void => {
        var idx = this.imgSelect.selectedIndex;
        if (idx < 0) {
            return;
        }
        var opt = this.imgSelect.options[idx];
        if (opt.value == '') {
            return;
        }
        var alt = opt.text.replace(/\.[^/.]+$/, '');
        var src = opt.value;
        var str = `<img src="${src}" alt="${alt}" />`;
        this.tplEditor.insert(str);
    }

    @callback()
    saveTemplate = (): void => {
        var template = this.getSelectedTemplate();
        var content = this.tplEditor.getValue();
        var css = this.cssEditor.getValue();

        this.requestHandler.sendRequest({
            'route': 'admin/template',
            'action': 'saveTemplate',
            'data': {
                'template': template,
                'content': content,
                'css': css
            }
        }).then(r => {
            this.buildCss(r['data']['css'], r => {
                this.output.write('Template is gewijzigd');
            });
        }, e => {
            this.output.error('Fout bij het wijzigen van de template');
        });
    }
}
