import designSystemImport from '../../lib/designSystem.js';

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
            <div id="app-inner-container">
                <h1>TEST</h1>
            </div>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { margin: 0; padding: 0; }

                :host {
                    display: block;
                    outline: 2px solid red;
                }

                #app-inner-container {
                    margin-left: auto;
                    margin-right: auto;
                    max-width: 1110px;
                    outline: 2px solid blue;
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