import styleSheet from './summaryitem.css' assert { type: 'css' };

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
        const itemPictureContainer = document.createElement('picture');

        const itemImage = document.createElement('img');
        itemImage.src = `../src/${this.getAttribute('image')}`;
        itemImage.alt = `Image of ${this.getAttribute('product')}`;
        itemPictureContainer.appendChild(itemImage);

        this.shadowRoot.appendChild(itemPictureContainer);

        const itemDetailsContainer = document.createElement('div');

        const productName = document.createElement('p');
        productName.id = 'product';
        productName.textContent = this.getAttribute('product');
        itemDetailsContainer.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.id = 'price';
        productPrice.textContent = this.getAttribute('price');
        itemDetailsContainer.appendChild(productPrice);

        this.shadowRoot.appendChild(itemDetailsContainer);

        const productQuantity = document.createElement('p');
        productQuantity.id = 'quantity';
        productQuantity.textContent = `x${this.getAttribute('quantity')}`;


        this.shadowRoot.appendChild(productQuantity);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }

    attributeRefresh(attribute) {
        return {
            quantity: (this.shadowRoot.querySelector('#quantity'))
            ? this.shadowRoot.querySelector('#quantity').innerText = this.getAttribute('quantity')
            : "",
        }[attribute]
    }
}

window.customElements.define('summary-item', SummaryItem);