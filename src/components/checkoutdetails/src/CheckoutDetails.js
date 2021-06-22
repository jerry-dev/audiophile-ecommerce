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

    deactivateOrderConfirmationModal() {
        this.shadowRoot.querySelector('order-confirmed').setAttribute('activated', false);
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
        }

        input.classList.add("error");
        input.previousElementSibling.classList.add("error");

        const patternErrorMessageLookup = {
            email: () => messageContainer.textContent = "Missing details",
            name: () => messageContainer.textContent = "Alphabet characters only",
            telephone: () => messageContainer.textContent = "Numeric characters only",
            address: () => messageContainer.textContent = "Wrong format",
            zipcode: () => messageContainer.textContent = "Wrong format",
            city: () => messageContainer.textContent = "Wrong format",
            country: () => messageContainer.textContent = "Wrong format",
            enumber: () => messageContainer.textContent = "Numeric characters only",
            enumberPin: () => messageContainer.textContent = "Numeric characters only",
        };

        (input.validity.patternMismatch) ? patternErrorMessageLookup[field]() : "";
    }

    clickManager() {
        this.shadowRoot.addEventListener('click', (event) => {
            event.preventDefault();
            (event.composedPath()[0].id === `pay`) ? this.continueAndPay() : "";
            (event.composedPath()[0].id === `jumpHome`) ? this.backToHome() : "";
        });
    }

    continueAndPay() {
        const theForm = this.shadowRoot.querySelector('Checkout-Form').shadowRoot.querySelector('form');
                
        if (theForm.checkValidity()) {
            this.postFormData(theForm);
            const theOrder = this.shadowRoot.querySelector('summary-cart').order;
            const payload = { order: theOrder, success: true };
            this.store.dispatch(`processOrder`, payload)
        }
    }

    postFormData(form) {
        const formData = new FormData(form);
        // fetch(url, {method: 'POST', body: formData});
    }

    backToHome() {
        this.deactivateOrderConfirmationModal();
        this.store.dispatch('backToHome', "/");
    }
}

if (!window.customElements.get('checkout-details')) {
    window.customElements.define('checkout-details', CheckoutDetails)
}