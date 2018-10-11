import { service } from 'lib/di';

@service()
export class TabControl {
    private tabs: { [key: string]: { [key: string]: HTMLElement | null } };

    private setTabActive = (name: string): void => {
        for (var tabName in this.tabs) {
            var tab = this.tabs[tabName];
            tab['tab']!.classList.remove('active');
            tab['btn']!.classList.remove('active');
        }
        var tab = this.tabs[name];
        tab['tab']!.classList.add('active');
        tab['btn']!.classList.add('active');
    }

    private loadTabElements = (elements: NodeList): void => {
        for (var i = 0; i < elements.length; i++) {
            var el = <HTMLElement>elements[i];
            var name = el.dataset['tabName'];
            if (!name) {
                continue;
            }
            this.tabs[name] = {
                'tab': el,
                'btn': null
            }
        }
    }

    private loadTabButtons = (buttons: NodeList): void => {
        for (var i = 0; i < buttons.length; i++) {
            var btn = <HTMLButtonElement>buttons[i];
            var target = btn.dataset['tabTarget'];
            if (!target || !(target in this.tabs)) {
                continue;
            }
            this.tabs[target]['btn'] = btn;
            (t => { btn.onclick = (e) => {
                e.preventDefault();
                this.setTabActive(t); 
            }})(target);
        }
    }

    init = (el: HTMLElement): void => {
        var buttons = el.querySelectorAll('.tab-button');
        var tabElements = el.querySelectorAll('.tab'); 
        this.tabs = {};
        this.loadTabElements(tabElements);
        this.loadTabButtons(buttons);
    }
}
