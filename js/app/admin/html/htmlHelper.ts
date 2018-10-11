
import { singleton } from 'lib/di';

@singleton()
export class HTMLHelper {

    createSelectOption(id: number, text: string): HTMLOptionElement;
    createSelectOption(type: string, id: number, text: string): HTMLOptionElement;
    createSelectOption(...args: any[]) {
        var opt = document.createElement('option');
        
        if (args.length == 2) {
            opt.value = args[0].toString();
            opt.text = args[1];
        } else {
            var type = args[0];
            var id = args[1].toString();
            opt.value = id;
            opt.text = args[2];
            opt.id = `${type}-${id}`;
        }
        return opt;
    }

    getSelectOption(el: HTMLSelectElement): HTMLOptionElement | null;
    getSelectOption(elName: string): HTMLOptionElement | null;
    getSelectOption(arg: any): HTMLOptionElement | null {
        var el: HTMLSelectElement = typeof (arg) === 'string'
            ? <HTMLSelectElement>document.getElementById(arg)
            : arg;

        var index = el.selectedIndex;
        if (index == -1) {
            return null;
        }
        return el.options[index];
    }

    getSelectText(el: HTMLSelectElement): string
    getSelectText(elName: string): string;
    getSelectText(arg: any): string | null {
        var opt = this.getSelectOption(arg);
        return opt ? opt.text : null;
    }

    deleteSelectOption(el: HTMLSelectElement): void;
    deleteSelectOption(elName: string): void;
    deleteSelectOption(arg: any): void {
         var el: HTMLSelectElement = typeof (arg) === 'string'
            ? <HTMLSelectElement>document.getElementById(arg)
            : arg;

         var opt = this.getSelectOption(arg);
         if (opt) {
             el.removeChild(opt);
         }
    }
}