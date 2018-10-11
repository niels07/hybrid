import { service } from  'lib/di';

@service()
export class Carousel {

    private images: NodeListOf<HTMLDivElement>;
    private index: number;
    private active: boolean = false;;
    private element: HTMLElement;

    start = (element: HTMLElement): void => {
        this.index = 0;
        this.images = <NodeListOf<HTMLDivElement>>element.getElementsByClassName('image');
        for (var i = 1; i < this.images.length; i++) {
            var image = this.images[i];
            image.style.left = '500px';
        }
        this.images[0].classList.add('animate');
        this.element = element;
    }

    prev(): void {
        if (this.active) {
            return;
        }
        this.active = true;
        var curr = this.images[this.index];
        if (--this.index < 0) {
            this.index = this.images.length - 1;
        }
        var prev = this.images[this.index];
        prev.style.left = '-500px';
        prev.offsetHeight;

        curr.classList.add('animate');
        prev.classList.add('animate');

        prev.style.left = '0px';
        curr.style.left = '500px';

        setTimeout(() => {
            curr.classList.remove('animate');
            prev.classList.remove('animate');
            this.active = false;
        }, 500);
    }

    next(): void {
        if (this.active) {
            return;
        }
        this.active = true;
        var curr = this.images[this.index];
        if (++this.index == this.images.length) {
            this.index = 0;
        }
        var next = this.images[this.index];
        next.style.left = '500px';
        next.offsetHeight;

        next.classList.add('animate');
        curr.classList.add('animate');

        next.style.left = '0px';
        curr.style.left = '-500px';

        setTimeout(() => {
            curr.classList.remove('animate');
            next.classList.remove('animate');
            this.active = false;
        }, 500);
    }

    public getCurrentImage = (): HTMLImageElement => {
        var el = this.images[this.index];
        return <HTMLImageElement>el.firstElementChild;
    }
}
