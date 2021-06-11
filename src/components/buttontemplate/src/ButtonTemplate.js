export default class ButtonTemplate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const markup =
        `<button id="${this.getAttribute('id')}" type="button">${this.getAttribute('text')}</button>`;

        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            *,*::before,*::after { padding: 0; margin: 0; }

            :host {
                align-items: center;
                display: flex;
                height: 3rem;
                justify-content: center;
                width: 100%;
            }

            button {
                background-color: var(--brown-2);
                border: none;
                color: var(--white-1);
                cursor: pointer;
                font-size: 0.8125rem;
                font-weight: bold;
                height: 100%;
                letter-spacing: 0.0625rem;
                line-height: 1.125rem;
                width: 100%;
            }

            button:hover {
                background-color: var(--brown-1);
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }
}

if (!window.customElements.get('button-template')) {
    window.customElements.define('button-template', ButtonTemplate)
}