import { service } from 'lib/di';

@service()
export class Magnifier {

    private zoom: number = 2;
    private image: HTMLImageElement;
    private element: HTMLDivElement;

    constructor(zoom: number = 2) {
        this.zoom = zoom;
    }

    private removeMagnifier = (): void => {
        if (!this.element) {
            return;
        }

        var parentElement = this.element.parentElement;

        if (parentElement) {
            parentElement.removeChild(this.element);
        }
    }

    private createMagnifier = (): void => {
        if (!this.image || !this.image.parentElement) {
            return;
        }
        this.removeMagnifier();
        this.element = document.createElement('div');
        this.element.setAttribute('class', 'magnifier');
        this.image.parentElement.insertBefore(this.element, this.image);
        this.element.style.backgroundImage = `url('${this.image.src}')`;
        this.element.style.backgroundRepeat = 'no-repeat';

        var bgWidth = this.image.clientWidth * this.zoom;
        var bgHeight = this.image.clientHeight * this.zoom;
        this.element.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
    }

    private getCursorPos = (e: MouseEvent) => {
        var a, x = 0, y = 0;
        e = e || window.event;
        a = this.image.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }

    public apply = (img: HTMLImageElement, offsetLeft: number = 0, offsetTop: number = 0): void => {
        var w: number
        var h: number;
        this.image = img;
        var zoom = this.zoom;
        this.createMagnifier();
        var borderWidth = 3;
        w = this.element.offsetWidth / 2;
        h = this.element.offsetHeight / 2;
        this.element.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);
        this.element.addEventListener("touchmove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);
        var magnifier = this.element;

        function moveMagnifier(e: MouseEvent) {
            var pos, x, y;
            e.preventDefault();
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;

            var bgX = -(x * zoom - w + borderWidth - offsetLeft);
            var bgY = -(y * zoom - h + borderWidth - offsetTop);

            magnifier.style.left = (x - w) + "px";
            magnifier.style.top = (y - h) + "px";
            magnifier.style.backgroundPosition = `${bgX}px ${bgY}px`;
        }
        function getCursorPos(e: MouseEvent) {
            var a, x = 0, y = 0;
            e = e || window.event;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        }
    }
}
