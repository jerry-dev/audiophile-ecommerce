export default class ItemCounter extends HTMLElement {
    static get observedAttributes() {
		return ['count'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.hasAttribute(attrName);

            if (attrName === 'count') {
                if (this.shadowRoot.querySelector('h6')) {
                    this.shadowRoot.querySelector('h6').innerText = `CART(${this.getAttribute('count')})`;
                }
            }
		}
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const markup =
        `<h6>CART(${this.getAttribute('count')})</h6>
        <button id="clearCart">Remove all</button>`;

        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            *,*::before,*::after { padding:0; margin: 0; }

            :host {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: 2rem;
                width: 100%;
            }

            h6 {
                color: var(--black-2);
                font-size: 1.125rem;
                font-weight: bold;
                letter-spacing: 0.080356875rem;
            }

            button {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 0.9375rem;
                font-weight: 500;
                line-height: 1.5625rem;
                opacity: 0.5;
                text-decoration-line: underline;
            }

            button:hover {
                color: var(--brown-2);
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }
}

if (!window.customElements.get('item-counter')) {
    window.customElements.define('item-counter', ItemCounter)
}