namespace Components {
    export class Header {
        constructor() {
            const elem = document.createElement('div');
            elem.innerText = 'this is header';
            document.body.appendChild(elem);
        }
    }

    export class Content {
        constructor() {
            const elem = document.createElement('div');
            elem.innerText = 'this is content';
            document.body.appendChild(elem);
        }
    }

    export class Footer {
        constructor() {
            const elem = document.createElement('div');
            elem.innerText = 'this is footer';
            document.body.appendChild(elem);
        }
    }
}