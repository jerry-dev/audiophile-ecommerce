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
            <section id="section-1">
                <div id="section-1-inner-container">
                    <app-header></app-header>
                </div>
            </section>
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

                #section-1 {
                    background-color: var(--black-1);
                }

                #section-1-inner-container {
                    margin-left: auto;
                    margin-right: auto;
                    width: 77.083%;
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