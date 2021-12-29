import styleSheet from './cartitem.css' assert { type: 'css' };

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
                if (this.shadowRoot.querySelector('#controlsContainer #display')) {
                    this.shadowRoot.querySelector('#controlsContainer #display').setAttribute('value', this.getAttribute('quantity'));
                    // this.shadowRoot.querySelector('#controlsContainer #display').textContent = newValue;
                }
            }
		}
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const imageContainer = document.createElement('picture');

        const cartItemImage = document.createElement('img');
        cartItemImage.src = `../src/${this.getAttribute('image')}`;
        cartItemImage.alt = `Image of ${this.getAttribute('product')} in the cart`;
        imageContainer.appendChild(cartItemImage);
        this.shadowRoot.appendChild(imageContainer);

        const detailsContainer = document.createElement('div');

        const product = document.createElement('p');
        product.id = `product`;
        product.textContent = this.getAttribute('product');
        detailsContainer.appendChild(product);

        const price = document.createElement('p');
        price.id = `price`;
        price.textContent = this.getAttribute('price');
        detailsContainer.appendChild(price);
        this.shadowRoot.appendChild(detailsContainer);

        const controlsContainer = document.createElement('form');
        controlsContainer.id = 'controlsContainer';

        const decrementButton = document.createElement('button');
        decrementButton.type = `button`;
        decrementButton.className = `decrement`;
        decrementButton.setAttribute('data-productId', this.getAttribute('productId'));
        decrementButton.textContent = `-`;
        controlsContainer.appendChild(decrementButton);

        const display = document.createElement('input');
        display.id = 'display';
        display.type = 'number';
        display.min = `1`;
        display.max = `10`;
        display.setAttribute('value', this.getAttribute('quantity'));
        display.setAttribute('disabled', '');
        controlsContainer.appendChild(display);

        const incrementButton = document.createElement('button');
        incrementButton.type = `button`;
        incrementButton.className = `increment`;
        incrementButton.setAttribute('data-productId', this.getAttribute('productId'));
        incrementButton.textContent = `+`;
        controlsContainer.appendChild(incrementButton);

        this.shadowRoot.appendChild(controlsContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }
}

if (!window.customElements.get('cart-item')) {
    window.customElements.define('cart-item', CartItem)
}