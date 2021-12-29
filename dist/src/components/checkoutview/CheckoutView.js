import store from '../../lib/store/index.js';
import router from '../../lib/router/index.js';
import styleSheet from './checkoutview.css' assert { type: 'css' };
import CheckoutForm from '../checkoutform/CheckoutForm.js';
import SummaryCart from '../summarycart/SummaryCart.js';
import OrderConfirmed from '../orderconfirmed/OrderConfirmed.js';

export default class CheckoutView extends HTMLElement {
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
        this.SCRIPTS();
    }

    HTML() {
        const goBackLinkWrapper = document.createElement('div');
        goBackLinkWrapper.id = `goBackLinkWrapper`;

        const goBackLink = document.createElement('a');
        goBackLink.id = `goBack`;
        goBackLink.href = `#/`;
        goBackLink.textContent = `Go Back`;
        goBackLink.setAttribute('data-navigo', '');
        goBackLinkWrapper.appendChild(goBackLink);
        this.shadowRoot.appendChild(goBackLinkWrapper);

        const checkoutDetailsInnerContainer = document.createElement('div');
        checkoutDetailsInnerContainer.id = `checkoutDetailsInnerContainer`;

        const checkoutForm = document.createElement('checkout-form');
        checkoutDetailsInnerContainer.appendChild(checkoutForm);

        const summaryCart = document.createElement('summary-cart');
        checkoutDetailsInnerContainer.appendChild(summaryCart);

        const orderConfirmed = document.createElement('order-confirmed');
        orderConfirmed.setAttribute('activated', 'false');
        checkoutDetailsInnerContainer.appendChild(orderConfirmed);

        this.shadowRoot.appendChild(checkoutDetailsInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
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

        (input.validity.patternMismatch) ? patternErrorMessageLookup[field]() : null;
    }

    clickManager() {
        this.shadowRoot.addEventListener('click', (event) => {
            (event.composedPath()[0].id === `pay`) ? this.continueAndPay() : null;
            (event.composedPath()[0].id === `jumpHome`) ? this.backToHome() : null;
            // (event.composedPath()[0].id === `goBack`) ? this.goBack() : null;
        });
    }

    continueAndPay() {
        const theForm = this.shadowRoot.querySelector('checkout-Form').shadowRoot.querySelector('form');
        if (theForm.checkValidity()) {
            this.postFormDataToServer(theForm);
            const theOrder = this.shadowRoot.querySelector('summary-cart').order;
            const payload = { order: theOrder, success: true };
            this.store.dispatch(`processOrder`, payload);

        } else {
            this.showAllInputErrors();
        }
    }

    postFormDataToServer(form) {
        const formData = new FormData(form);
        // fetch(url, {method: 'POST', body: formData});
    }

    backToHome() {
        this.deactivateOrderConfirmationModal();
        router.navigate('/');
        this.store.dispatch(`clearCart`);
    }

    showAllInputErrors() {
        const theInputs = this.shadowRoot.querySelector('Checkout-Form').shadowRoot.querySelector('form').querySelectorAll('input');

        theInputs.forEach((aInput) => {
            if (!aInput.validity.valid) {
                this.showError(aInput.getAttribute('name'), aInput, aInput.previousElementSibling.querySelector('span.error'));
            }
        });
    }
}

if (!window.customElements.get('checkout-view')) {
    window.customElements.define('checkout-view', CheckoutView)
}