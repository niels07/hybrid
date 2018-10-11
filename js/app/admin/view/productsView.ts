import { XHRequestHandler } from 'core/http';

import { ImagesView } from './products/imagesView';
import { SpecsView } from './products/specsView';
import { ViewManager, onLoad, callback } from 'core/view';

import { inject } from 'lib/di';
import { ProductManager } from '../model/product/productManager';
import { HTMLHelper } from '../html/htmlHelper';
import { ProductModel } from '../model/product/productModel';
import { CategoryModel } from '../model/category/categoryModel';
import { CategoryManager } from '../model/category/categoryManager';
import { PageView } from 'core/view';
import { Output } from '../io/output';

export class ProductsView extends PageView {
    private productsSelect: HTMLSelectElement;
    private categoriesSelect: HTMLSelectElement;
    private products: Array<ProductModel>;
    private categories: Array<CategoryModel>;

    public constructor(
        @inject(ProductManager) private productManager: ProductManager,
        @inject(CategoryManager) private categoryManager: CategoryManager,
        @inject(HTMLHelper) private htmlHelper: HTMLHelper,
        @inject(Output) private output: Output) {

        super('admin/products');
    }

    private setField = (name: string, value: any): void => {
        var elName = 'admin-product-' + name;
        var el = <HTMLInputElement>document.getElementById(elName);
        if (el) {
            el.value = value;
        }
    }

    private addProductOption = (product: ProductModel): void => {
        var id = product.getId();
        var name = product.getName();
        var text = id !== 0 ? `[${id}] ${name}` : name;
        var opt = this.htmlHelper.createSelectOption('product', id, text);
        this.productsSelect.add(opt);
    }

    private addCategoryOption = (category: CategoryModel): void => {
        var id = category.getId();
        var name = category.getName();
        var text = id !== 0 ? `[${id}] ${name}` : name;
        var opt = this.htmlHelper.createSelectOption('category', id, text);
        this.categoriesSelect.add(opt);
    }

    private loadCategorySelection = (): void => {
        this.categoriesSelect.innerHTML = '';
        this.categoryManager.fetch().then(categories => {
            for (var i = 0; i < categories.length; i++) {
                this.addCategoryOption(categories[i]);
            }
        });
    }

    private getForm = (): HTMLFormElement => {
        return <HTMLFormElement>document.getElementById('admin-product-form');
    }

    private setProductField = (product: ProductModel, field: HTMLInputElement): void => {
        var name = field.name;
        var getMethod = 'get' + name.charAt(0).toUpperCase() + name.slice(1);
        if (getMethod in product) {
            field.value = (<{[index:string]:any}>product)[getMethod]();
        }
    }

    private clearProductFields = (): void => {
        var productFields = document.querySelectorAll('#admin-product-details input');

        for (var i = 0; i < productFields.length; i++) {
            (<HTMLInputElement>productFields[i]).value = '';
        }
    }

    private productSelectionChanged = (product?: ProductModel): void => {
        var e = new CustomEvent('ProductSelectionChanged', {
            detail: product,
            bubbles: true,
        });
        dispatchEvent(e);
    }

    @callback()
    private loadProductFields = (): void => {
        var id = parseInt(this.productsSelect.value);

        if (id == 0) {
            this.clearProductFields();
            this.productSelectionChanged();
            return;
        }

        var product = this.products[id];
        this.categoriesSelect.value = product.getCategoryId().toString();
        var productFields = document.querySelectorAll('\
            #admin-product-details input,   \
            #admin-product-details textarea \
        ');

        for (var i = 0; i < productFields.length; i++) {
            this.setProductField(product, <HTMLInputElement>productFields[i])
        }
        console.log(product);
        this.productSelectionChanged(product);
    }

    @onLoad()
    onViewLoad = (): void => {
        this.products = [];
        this.productsSelect =
            <HTMLSelectElement>document.getElementById('admin-product-list');

        this.productManager.fetch().then(products => {
            for (var i = 0; i < products.length; i++) {
                var product = products[i];
                this.products[product.getId()] = product;
                this.addProductOption(product);
            }
        });

        this.categories = [];
        this.categoriesSelect =
            <HTMLSelectElement>document.getElementById('admin-product-category-list')

        this.categoryManager.fetch().then(categories => {
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                this.categories[category.getId()] = category;
                this.addCategoryOption(category);
            }
        });
    }

    @callback()
    private saveProduct = (): void => {
        var form = this.getForm();

        this.productManager.save(form).then(p => {
            this.addProductOption(p);
            this.output.write('Product is opgeslagen.');
        });
    }

    @callback()
    private deleteProduct = (): void => {
        var id = parseInt(this.productsSelect.value);
        if (id === 0) {
            return;
        }

        this.productManager.delete(id).then(p => {
            this.htmlHelper.deleteSelectOption(this.productsSelect);
            this.output.write('Product is verwijderd.')
        });
    }
}
