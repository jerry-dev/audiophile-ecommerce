import styleSheet from './summarydetail.css' assert { type: 'css' };

export default class SummaryDetail extends HTMLElement {
    static get observedAttributes() {
		return ['text', 'amount'];
    }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.hasAttribute(attrName);
            this.attributeRefresh(attrName);
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
        const lineItem = document.createElement('p');
        lineItem.textContent = this.getAttribute('text');
        this.shadowRoot.appendChild(lineItem);

        const calculation = document.createElement('output');
        calculation.textContent = this.getAttribute('amount');
        this.shadowRoot.appendChild(calculation);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }

    attributeRefresh(attribute) {
        return {
            text: (this.shadowRoot.querySelector('p'))
            ? this.shadowRoot.querySelector('p').innerText = this.getAttribute('text')
            : "",
            amount: (this.shadowRoot.querySelector('output'))
            ? this.shadowRoot.querySelector('output').innerText = this.getAttribute('amount')
            : "",
        }[attribute]
    }
}

window.customElements.define('summary-detail', SummaryDetail)