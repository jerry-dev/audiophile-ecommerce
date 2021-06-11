export default class SummaryItem extends HTMLElement {
    static get observedAttributes() {
		return ['quantity'];
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

            this.attributeRefresh(attrName);
		}
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const markup =
        `<picture>
            <img src="../src/${this.getAttribute('image')}"/>
        </picture>
        <div>
            <p id="product">${this.getAttribute('product')}</p>
            <p id="price">${this.getAttribute('price')}</p>
        </div>

        <p id="quantity">x${this.getAttribute('quantity')}</p>`;

        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            *,*::before,*::after { padding: 0; margin: 0; }

            :host {
                align-items: center;
                display: flex;
                flex-direction: row;
            }

            picture {
                align-items: center;
                background-color: var(--grey-1);
                border-radius: 0.5rem;
                display: flex;
                height: 4rem;
                justify-content: center;
                margin-right: 1rem;
                width: 4rem;
            }

            picture img {
                max-width: 100%;
            }

            #product {
                color: var(--black-2);
                font-size: 0.9375rem;
                font-weight: bold;
                line-height: 1.5625rem;
            }

            #price {
                color: var(--black-2);
                font-size: 0.875rem;
                font-weight: bold;
                line-height: 1.5625rem;
                opacity: 0.5;
            }

            #quantity {
                font-size: 0.9375rem;
                font-weight: bold;
                line-height: 1.5625rem;
                margin-bottom: auto;
                margin-left: auto;
                margin-top: 0.4375rem;
                opacity: 0.5;
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    attributeRefresh(attribute) {
        return {
            quantity: (this.shadowRoot.querySelector('#controlsContainer input'))
            ? this.shadowRoot.querySelector('#controlsContainer input').setAttribute('value', this.getAttribute('quantity'))
            : "",
        }[attribute]
    }
}

if (!window.customElements.get('summary-item')) {
    window.customElements.define('summary-item', SummaryItem)
}