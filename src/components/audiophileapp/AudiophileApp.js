import designSystemImport from '../../lib/designSystem.js';
import AppHeader from '../appheader/AppHeader.js';

class AudiophileApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
        this.css();
        this.importedCSS();
    }

    html() {
        this.shadowRoot.innerHTML = `
            <app-header></app-header>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {margin:0;padding:0;}

                :host {
                    display: block;
                    outline: 2px solid red;
                }
            </style>
        `;
    }

    importedCSS() {
        this.shadowRoot.innerHTML += `${designSystemImport()};`;
    }
}

if (!window.customElements.get('audiophile-app')) {
    window.customElements.define('audiophile-app', AudiophileApp)
}