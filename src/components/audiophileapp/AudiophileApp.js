import AppHeader from '../appheader/AppHeader.js';
import AppFooter from '../appfooter/AppFooter.js';

class AudiophileApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.routerInit();
    }

    render() {
        this.html();
        this.css();
    }

    html() {
        this.shadowRoot.innerHTML = `
            <app-header></app-header>
            <output id="routerOutput"></output>
            <app-footer></app-footer>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                :host {
                    display: block;
                    min-height: 100%;
                    outline: 4px solid gold;
                }
            </style>
        `;
    }

    routerInit() {
        this.routerOutput = this.shadowRoot.querySelector("#routerOutput");
        this.router = new Navigo(window.location.origin);

        this.router.on('/', () => this.routerOutput.innerHTML = `<h1>TEST</h1>`);
        this.router.resolve();
    }
}

if (!window.customElements.get('audiophile-app')) {
    window.customElements.define('audiophile-app', AudiophileApp)
}