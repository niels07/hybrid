import { Output as OutputInterface } from 'lib/io';
import { singleton } from 'lib/di';

@singleton()
export class Output implements OutputInterface {

    private showMessage(message: string, className: string): void {
        var overlay = document.createElement('div');
        overlay.className = 'overlay';

        var popup = document.createElement('div');
        popup.className = 'popup ' + className;

        var button = document.createElement('button');
        button.onclick = () => {
            popup!.parentNode!.removeChild(popup);
            overlay!.parentNode!.removeChild(overlay);
        };
        button.innerHTML = 'OK';

        var text = document.createTextNode(message);
        popup.appendChild(text);
        popup.appendChild(button);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        window.scrollTo(0, 0);

    }
   
    public write(message: string): void {
        this.showMessage(message, 'info');
    }

    public error(message: string): void {
        this.showMessage(message, 'error'); 
    }
}
