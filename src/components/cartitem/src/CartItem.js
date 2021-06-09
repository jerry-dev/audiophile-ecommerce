export default class CartItem extends HTMLElement {
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

            if (attrName === 'quantity') {
                if (this.shadowRoot.querySelector('#controlsContainer input')) {
                    this.shadowRoot.querySelector('#controlsContainer input').setAttribute('value', this.getAttribute('quantity'))
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
        `<picture>
            <img src="../src/${this.getAttribute('image')}"/>
        </picture>
        <div>
            <p id="product">${this.getAttribute('product')}</p>
            <p id="price">${this.getAttribute('price')}</p>
        </div>
        <form id="controlsContainer">
            <button type="button" data-productId="${this.getAttribute('productId')}"class="decrement">-</button>
            <input type="number" min=1 max=10 value=${this.getAttribute('quantity')} disabled>
            <button type="button" data-productId="${this.getAttribute('productId')}" class="increment">+</button>
        </form>`;

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

            #controlsContainer {
                background-color: var(--grey-1);
                display: flex;
                flex-direction: row;
                height: 2rem;
                margin-left: auto;
                width: 6rem;
            }

            #controlsContainer button {
                color: var(--black-2);
                opacity: 0.25;
                font-weight: bold;
                font-size: 0.8125rem;
                line-height: 1.125rem;
            }

            #controlsContainer button,
            #controlsContainer input {
                background-color: var(--grey-1);
                border: none;
                height: 100%;
                text-align: center;
                width: 33.3333%;
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }
}

if (!window.customElements.get('cart-item')) {
    window.customElements.define('cart-item', CartItem)
}