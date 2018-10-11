import { XHRequestHandler } from 'core/http';
import { ViewManager, onLoad, callback, PageView } from 'core/view';
import { inject } from 'lib/di';
import { StoreManager } from 'app/admin/model/store/storeManager';
import { Output } from 'app/admin/io/output';
import { HTMLHelper } from 'app/admin/html/htmlHelper';
import { StoreModel } from 'app/admin/model/store/storeModel';

export class StoresView extends PageView {
    private storesSelect: HTMLSelectElement;
    private stores: { [id: number]: StoreModel};

    constructor(
        @inject(XHRequestHandler) private requestHandler: XHRequestHandler,
        @inject(StoreManager) private storeManager: StoreManager,
        @inject(Output) private output: Output,
        @inject(HTMLHelper) private htmlHelper: HTMLHelper) {

        super('admin/stores');
    }

    private addStoreOption = (store: StoreModel): void => {
        var opt = this.htmlHelper.createSelectOption('store', store.getId(), store.getName());
        this.storesSelect.add(opt);
    }

    private setField = (name: string, value: any): void => {
        var elName = 'admin-store-' + name;
        var el = <HTMLInputElement>document.getElementById(elName);
        if (el) {
            el.value = value; 
        }
    }

    private clearDayFields = (): void => {
        var elements = document.getElementsByClassName('store-day');
        var days = [];

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            (<HTMLInputElement>el.querySelector('.day-open')).value = '';
            (<HTMLInputElement>el.querySelector('.day-closed')).value = '';
        }
        this.setField('days', '');
    }

    private clearFields = (): void => {
        this.setField('name', '');
        this.setField('street', '');
        this.setField('street_number', '');
        this.setField('zipcode', '');
        this.setField('phone', '');
        this.setField('country', '');
        this.setField('city', '');
        this.setField('email', '');
    }

    @callback()
    loadStoreFields = (): void => {
        var storeId = parseInt(this.storesSelect.value);
        this.clearDayFields();

        if (storeId == 0) {
            this.clearFields();
            return;
        }

        var store: StoreModel = this.stores[storeId];
        this.setField('name', store.getName());
        this.setField('street', store.getStreet());
        this.setField('street_number', store.getStreetNumber());
        this.setField('zipcode', store.getZipcode());
        this.setField('phone', store.getPhone());
        this.setField('country', store.getCountry());
        this.setField('city', store.getCity());
        this.setField('email', store.getEmail());

        var days = store.getDays();
        this.setField('days', JSON.stringify(days));

        for (var i = 0; i < days.length; i++) {
            var day = days[i];
            this.setField(`day-${day['name']}-open`, day['open']);
            this.setField(`day-${day['name']}-closed`, day['closed']);
        }
    }

    private getForm = (): HTMLFormElement => {
        return <HTMLFormElement>document.getElementById('admin-store-form');
    }

    private setStoreOption = (store: StoreModel): void => {
        var id = store.getId();
        var name = store.getName();
        var opt = <HTMLOptionElement>document.getElementById('store-' + id);
        if (opt) {
            opt.value = id.toString();
            opt.text = name;
        } else {
            this.addStoreOption(store);
        }
    }

    @onLoad()
    onViewLoad = (): void => {
        this.storesSelect = <HTMLSelectElement>document.getElementById('admin-store-list');
        this.storeManager.fetch().then(stores => {
            this.stores = {};
            for (var i = 0; i < stores.length; i++) {
                var store = stores[i];
                this.addStoreOption(store);
                this.stores[store.getId()] = store;
            }
        });
    }

    private updateDays = (): void => {
        var elements = document.getElementsByClassName('store-day');
        var days = [];

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var timeOpen = (<HTMLInputElement>el.querySelector('.day-open')).value
            var timeClosed = (<HTMLInputElement>el.querySelector('.day-closed')).value
            var dayName = (<HTMLInputElement>el.querySelector('.day-name')).value;
            if (!timeOpen || !timeClosed) {
                continue;
            }
            var day = {
                'name': dayName,
                'open': timeOpen,
                'closed': timeClosed
            }
            days.push(day);
        }
        this.setField('days', JSON.stringify(days));
    }

    @callback()
    private saveStore = (): void => {
        this.updateDays();
        var form = this.getForm();
        this.storeManager.save(form).then(s => {
            this.setStoreOption(s);
            this.output.write('Filiaal is opgeslagen.');
        });
    }

    @callback()
    private deleteStore = (): void => {
        var id = parseInt(this.storesSelect.value);
        if (id == 0) {
            return;
        }
        this.storeManager.delete(id).then(s => {
            var opt = document.getElementById('store-' + id);
            if (opt) {
                this.storesSelect.removeChild(opt);
            }
            this.output.write('Filiaal is verwijderd.');
        });
    }
}
