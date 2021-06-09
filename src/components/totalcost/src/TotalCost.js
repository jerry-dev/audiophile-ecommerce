export default class TotalCost extends HTMLElement {
    static get observedAttributes() {
		return ['cost'];
    }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.render();
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.hasAttribute(attrName);

            if (attrName === 'cost') {
                this.shadowRoot.querySelector('output').innerText = this.getAttribute('cost');
            }
		}
    }

    connectedCallback() {
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const markup =
        `<p>TOTAL</p><output>${this.getAttribute('cost')}</output>`;

        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            *,*::before,*::after { padding: 0; margin: 0; }

            :host {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: 2rem;
                margin-bottom: 1.5rem;
                width: 100%;
            }

            p {
                color: var(--black-2);
                font-size: 0.9375rem;
                font-weight: 500;
                line-height: 1.5625rem;
                opacity: 0.5;
            }

            output {
                font-size: 1.125rem;
                font-weight: bold;
                line-height: 1.5625rem;
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }
}

if (!window.customElements.get('total-cost')) {
    window.customElements.define('total-cost', TotalCost)
}