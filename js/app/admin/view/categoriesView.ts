import { XHRequestHandler } from 'core/http';
import { onLoad, callback } from 'core/view';
import { ImagesView } from './products/imagesView';
import { Output } from '../io/output';
import { inject } from 'lib/di';
import { PageView } from 'core/view';
import { CategoryManager } from '../model/category/categoryManager';
import { CategoryModel } from '../model/category/categoryModel'

export class CategoriesView extends PageView {

    private categoriesSelect: HTMLSelectElement;
    private categories: { [id: number]: CategoryModel };

    constructor(
        @inject(XHRequestHandler) private requestHandler: XHRequestHandler,
        @inject(CategoryManager) private categoryManager: CategoryManager,
        @inject(Output) private output: Output) {
        super('admin/categories');
    }

    @callback()
    loadCategoryFields = (): void => {
        var nameField = <HTMLInputElement>document.getElementById('category-name-field');
        var tnField = <HTMLInputElement>document.getElementById('category-image-field');
        var id = parseInt(this.categoriesSelect.value);

        if (id == 0) {
            nameField.value = '';
            tnField.value = '';
        } else {
            var category = this.categories[id];
            nameField.value = category.getName();
            tnField.value = category.getThumbNail();
        }
    }

    private getForm = (): HTMLFormElement => {
        return <HTMLFormElement>document.getElementById('admin-category-form');
    }

    private addSelectOption = (value: string, text: string): void => {
        var opt = document.createElement('option');
        opt.value = value;
        opt.text = text;
        this.categoriesSelect.add(opt);
    }

    private addCategoryOption = (category: CategoryModel): void => {
        var id = category.getId().toString();
        var name = category.getName();
        this.addSelectOption(id, name);
    }

    private addCategory = (category: CategoryModel): void => {
        this.addCategoryOption(category);
        this.categories[category.getId()] = category;
    }

    @onLoad()
    onViewLoad = (): void => {
        this.categoriesSelect = <HTMLSelectElement>document.getElementById('admin-category-list');
        this.categoryManager.fetch().then(categories => {
            this.categories = {};
            this.addSelectOption('0', 'Nieuwe Categorie');
            for (var i = 0; i < categories.length; i++) {
                this.addCategory(categories[i]);
            }
        })
    }

    @callback()
    saveCategory = (): void => {
        var form = this.getForm();
        this.categoryManager.save(form).then(c => {
            this.addCategory(c);
            this.output.write('Categorie is opgeslagen.')
        });
    }

    @callback()
    deleteCategory = (): void => {
        var id = parseInt(this.categoriesSelect.value);
        if (id == 0) {
            return;
        }
        this.categoryManager.delete(id).then(c => {
            var opt = this.categoriesSelect.options[this.categoriesSelect.selectedIndex];
            this.categoriesSelect.removeChild(opt);
            delete this.categories[id];
            this.output.write('Categorie is verwijderd.');
        });
    }

    @callback()
    uploadImage = (): void => {
        var input = <HTMLInputElement>document.getElementById('category-image-upload');
        var categoryId = parseInt(this.categoriesSelect.value)
        var img = input!.files![0];
        this.requestHandler.sendRequest({
            'route': 'admin/category',
            'action': 'uploadImage',
            'data': { 'image': img },
        }).then(r => {
            var tnField = <HTMLInputElement>document.getElementById('category-image-field');
            tnField.value = r.getData('path');
            this.output.write('De afbeelding is geupload');
        }, e => {
            var msg = 'Fout bij het uploaden van de afbeelding';
            if (e) {
                this.output.error(`${msg}: ${e}`);
            } else {
                this.output.error(msg);
            }
        });
    }
}

