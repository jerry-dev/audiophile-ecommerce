import CheckoutForm from '../../checkoutform/src/CheckoutForm.js';
import SummaryCart from '../../summarycart/src/SummaryCart.js';

export default class CheckoutDetails extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
        this.tabletCSS();
        this.mobileCSS();
    }

    HTML() {
        const markup =
        `<div id="checkoutDetailsInnerContainer">
            <checkout-form></checkout-form>
            <summary-cart></summary-cart>
        </div>`;
        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            :host {
                background-color: var(--grey-1);
                display: block;
            }

            #checkoutDetailsInnerContainer {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-left: auto;
                margin-right: auto;
                width: 77.08333%;
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    tabletCSS() {
        const markup =
        `<style>
            @media screen and (max-width: 768px) {
                #checkoutDetailsInnerContainer {
                    flex-direction: column;
                    width: 89.71354%;
                }
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    mobileCSS() {
        const markup =
        `<style>
            @media screen and (max-width: 375px) {
                #checkoutDetailsInnerContainer {
                    width: 87.2%;
                }
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }
}

if (!window.customElements.get('checkout-details')) {
    window.customElements.define('checkout-details', CheckoutDetails)
}