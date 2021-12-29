import styleSheet from './totalcost.css' assert { type: 'css' };

export default class TotalCost extends HTMLElement {
    static get observedAttributes() {
		return ['cost'];
    }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.hasAttribute(attrName);

            this.attributeSync(attrName);
		}
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const totalLabel = document.createElement('p');
        totalLabel.textContent = 'TOTAL';
        this.shadowRoot.appendChild(totalLabel);

        const displayedCost = document.createElement('output');
        displayedCost.textContent = this.getAttribute('cost');
        this.shadowRoot.appendChild(displayedCost);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }

    attributeSync(attribute) {
        return {
            cost: () => this.costManager(),
        }[attribute]();
    }

    costManager() {
         if (this.shadowRoot.querySelector('output')) {
            this.shadowRoot.querySelector('output').innerText = this.getAttribute('cost');
         }
    }
}

if (!window.customElements.get('total-cost')) {
    window.customElements.define('total-cost', TotalCost)
}