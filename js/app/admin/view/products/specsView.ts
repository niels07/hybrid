import { BaseView, callback } from 'core/view';
import { inject } from 'lib/di';
import { ProductModel } from '../../model/product/productModel';
import { SpecModel } from '../../model/product/spec/specModel';
import { SpecFactory } from '../../model/product/spec/specFactory';

export class SpecsView extends BaseView {

    private specs: Array<SpecModel>;

    constructor(@inject(SpecFactory) private specFactory: SpecFactory) {
        super('admin/products/specs');
        this.specs = [];
    }

    protected getListElement(): HTMLUListElement {
        return <HTMLUListElement>this.getElement('#admin-product-specs');
    }

    protected deleteSpec = (name: string, index: number): void => {
        var el = document.getElementById('spec-' + name);
        if (el) {
            el.outerHTML = '';
        }
        this.specs.splice(index, 1);
    }

    protected addSpecElement(name: string, text: string): void {
        var ul = document.getElementById('admin-product-specs');
        if (!ul) {
            return;
        }
        var li = document.createElement('li');
        var a  = document.createElement('a');
        var index = this.specs.length - 1;

        li.id = 'spec-' + name;
        a.className = 'deleteItem';
        a.href = '';

        a.onclick = (e) => {
            e.preventDefault();
            this.deleteSpec(name, index);
        }
        a.appendChild(document.createTextNode('Verwijderen'));
        li.appendChild(document.createTextNode(text));
        li.appendChild(a);
        ul.appendChild(li);
    }

    private shorten(text: string, max: number): string {
        if (text.length >= max) {
            text = text.substring(0, max - 3) + '...';
        }
        return text;
    }

    protected addSpecItem(spec: SpecModel): void {
        if (!spec) { return; }
        var name = spec[0];
        var value = spec[1];
        var text;

        if (value != '') {
            var sName  = this.shorten(name, 15);
            var sValue = this.shorten(value, 15);
            text = `${sName}: ${sValue}`;
        } else {
            text = this.shorten(name, 30);
        }
        this.addSpecElement(name, text);
    }

    loadSpecs(product: ProductModel) {
        var specs = product.getSpecs();
        if (!specs) {
            return;
        }
        var list = this.getListElement();
        list.innerHTML = '';

        for (var i = 0; i < specs.length; i++) {
            var spec = specs[i];
            this.addSpecItem(spec);
            this.specs.push(spec);
        }
    }

    getSpec(): SpecModel | undefined {
        var name  = (<HTMLInputElement>document.getElementById('admin-spec-name')).value;
        if (name == '') {
            return undefined;
        }
        var value = (<HTMLInputElement>document.getElementById('admin-spec-value')).value;
        return this.specFactory.create({ name: name, value: value });
    }

    @callback()
    addSpec = (): void => {
        var spec = this.getSpec();
        if (spec) {
            this.specs.push(spec);
            this.addSpecItem(spec);
        }
    }

    getSpecs(): Array<SpecModel> {
        return this.specs;
    }

    clear(): void {
        var list = this.getListElement();
        this.specs = [];
        list.innerHTML = '';
    }
}
