import styleSheet from './itemcounter.css' assert { type: 'css' };

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
        const title = document.createElement('h6');
        title.textContent = this.getAttribute('count');
        this.shadowRoot.appendChild(title);

        const clearCartButton = document.createElement('button');
        clearCartButton.id = `clearCart`;
        clearCartButton.textContent = `Remove all`;
        clearCartButton.type = `button`;
        this.shadowRoot.appendChild(clearCartButton);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }
}

if (!window.customElements.get('item-counter')) {
    window.customElements.define('item-counter', ItemCounter)
}