import store from '../../../lib/store/index.js';
import CheckoutForm from '../../checkoutform/src/CheckoutForm.js';
import SummaryCart from '../../summarycart/src/SummaryCart.js';
import OrderConfirmed from '../../orderconfirmed/src/OrderConfirmed.js';

export default class CheckoutDetails extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.store = store;
        this.store.observer.subscribe('stateChange', () => {
            this.componentHydration();
        });
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
        this.tabletCSS();
        this.mobileCSS();
        this.SCRIPTS();
    }

    HTML() {
        const markup =
        `<div id="checkoutDetailsInnerContainer">
            <checkout-form></checkout-form>
            <summary-cart></summary-cart>
            <order-confirmed
                activated="false">
            </order-confirmed>
        </div>`;
        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            :host {
                background-color: var(--grey-1);
                display: block;
                padding-bottom: 8.8125rem;
            }

            #checkoutDetailsInnerContainer {
                align-items: flex-start;
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
                :host {
                    padding-bottom: 7.25rem;
                }

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
                :host {
                    padding-bottom: 6.0625rem;
                }

                #checkoutDetailsInnerContainer {
                    width: 87.2%;
                }
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    componentHydration() {
        this.activateOrderConfirmationModal();
    }

    activateOrderConfirmationModal() {
        if (this.store.state.order.success) {
            this.shadowRoot.querySelector('order-confirmed').setAttribute('activated', true);
        }
    }

    SCRIPTS() {
        this.clickManager();
        this.formValidationManager();
    }

    formValidationManager() {
        this.shadowRoot.addEventListener('input', (event) => {
            const inputId = event.composedPath()[0].id;

            const targetInput = this.shadowRoot.querySelector('Checkout-Form').shadowRoot.querySelector(`#${inputId}`);
            const labelInputContainerId = targetInput.parentNode.id;
            const errrorMessageContainer = this.shadowRoot.querySelector('Checkout-Form').shadowRoot.querySelector(`#${labelInputContainerId} span.error`);
            
            if (targetInput.validity.valid) {
                errrorMessageContainer.textContent = "";
                targetInput.classList.remove("error");
                targetInput.previousElementSibling.classList.remove("error");
            } else {
                this.showError(inputId, targetInput, errrorMessageContainer);
            }
        });
    }

    showError(field, input, messageContainer) {
        if (input.validity.typeMismatch) {
            messageContainer.textContent = "Wrong format";
        } else if (input.validity.tooShort) {
            messageContainer.textContent = `The ${field} should be at least ${input.minLength} characters`;
        } else if (input.validity.valueMissing) {
            messageContainer.textContent = "This field is required";
        } else if (field === "email" && input.validity.patternMismatch) {
            messageContainer.textContent = "Missing details";
        } else if (field === "name" && input.validity.patternMismatch) {
            messageContainer.textContent = "Alphabet characters only";
        } else if (field === "telephone" && input.validity.patternMismatch) {
            messageContainer.textContent = "Numeric characters only";
        } else if (field === "address" && input.validity.patternMismatch) {
            messageContainer.textContent = "Wrong format";
        } else if (field === "zipcode" && input.validity.patternMismatch) {
            messageContainer.textContent = "Wrong format";
        } else if (field === "city" && input.validity.patternMismatch) {
            messageContainer.textContent = "Wrong format";
        } else if (field === "country" && input.validity.patternMismatch) {
            messageContainer.textContent = "Wrong format";
        } else if (field === "enumber" && input.validity.patternMismatch) {
            messageContainer.textContent = "Numeric characters only";
        } else if (field === "enumberPin" && input.validity.patternMismatch) {
            messageContainer.textContent = "Numeric characters only";
        }

        input.classList.add("error");
        input.previousElementSibling.classList.add("error");
        
    }

    clickManager() {
        this.shadowRoot.addEventListener('click', (event) => {
            // const payload = { order: this.order, success: true };
            //  (event.composedPath()[0].id === `pay`) ? this.store.dispatch(`processOrder`, payload) : "";
            if (event.composedPath()[0].id === `pay`) {
                const theForm = this.shadowRoot.querySelector('Checkout-Form').shadowRoot.querySelector('form');
                // check if the form is valid. If so, dispatch with payload
                // Add form details with payload?
                
            }

            // Submit the purchas order with form details
            // processOrder
            // (event.target.id === `pay`) ? this.store.dispatch(`processOrder`, payload) : "";
        });
    }
}

if (!window.customElements.get('checkout-details')) {
    window.customElements.define('checkout-details', CheckoutDetails)
}