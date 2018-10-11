import { BaseElement } from './baseElement';
import { service } from 'lib/di';

@service()
export class SelectElement extends BaseElement {
    
    private htmlElement: HTMLSelectElement;

    constructor(selector: string) {
        super();
        this.htmlElement = <HTMLSelectElement>document.querySelector(selector);
    }

    addOption = (type: string, id: string, text: string): HTMLOptionElement => {
        var opt = document.createElement('option');
        opt.value = id;
        opt.id = `${type}-${id}`;
        opt.text = text;
        this.htmlElement.add(opt);
        return opt;
    }

    setOnChange = (onChange: () => void): void => {
        this.htmlElement.onchange = onChange;
    }

    getValue = (): string => {
        return this.htmlElement.value;
    }

    clear = (): void => {
        this.htmlElement.innerHTML = '';
    }
}
