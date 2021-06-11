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
        const markup =
        `<p>${this.getAttribute('text')}</p><output>${this.getAttribute('amount')}</output>`;

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

            :host([text="GRAND TOTAL"]) output {
                color: var(--brown-2);
            }

            :host([text="GRAND TOTAL"]) {
                margin-top: 1.5rem;
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
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