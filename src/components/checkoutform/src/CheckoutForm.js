import designSystemImport from '../../../lib/designSystem.js';

export default class CheckoutForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.importedCSS();
        this.CSS();
    }

    HTML() {
        const markup =
        `<div id="checkoutFormInnerContainer">
            <h3 class="h3-design-system">CHECKOUT</h3>
            <form>
                <h6 class="subtitle-design-system title">BILLING DETAILS</h6>
                <section id="billingDetails">
                    <div class="labelInputCombo" id="labelInputNameCombo">
                        <label for="customerName">Name</label>
                        <input type="text" id="name" name="name" placeholder="Alexei Ward">
                    </div>
                    <div class="labelInputCombo" id="labelInputEmailCombo">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="alexei@mail.com">
                    </div>
                    <div class="labelInputCombo" id="labelInputTelephoneCombo">
                        <label for="telephone">Phone Number</label>
                        <input type="tel" id="telephone" name="telephone" placeholder="+1 202-555-0136">
                    </div>
                </section>

                <h6 class="subtitle-design-system title">SHIPPING INFO</h6>
                <section id="shippingInfo">
                    <div class="labelInputCombo" id="labelInputAddressCombo">
                        <label for="address">Address</label>
                        <input type="text" id="address" name="address" placeholder="1137 Williams Avenue">
                    </div>
                    <div class="labelInputCombo" id="labelInputZipCodeCombo">
                        <label for="zipcode">Zip Code</label>
                        <input type="number" id="zipcode" name="zipcode" placeholder="10001">
                    </div>
                    <div class="labelInputCombo" id="labelInputCityCombo">
                        <label for="city">City</label>
                        <input type="text" id="city" name="city" placeholder="New York">
                    </div>
                    <div class="labelInputCombo" id="labelInputCountryCombo">
                        <label for="country">City</label>
                        <input type="text" id="country" name="country" placeholder="United States">
                    </div>
                </section>
            </form>
        </div>`;
        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            *,*::before,*::after { padding: 0; margin: 0; }

            :host {
                background-color: var(--white-1);
                display: block;
                width: 65.76576%;
            }

            #checkoutFormInnerContainer {
                margin-left: auto;
                margin-right: auto;
                padding-bottom: 3rem;
                padding-top: 3.375rem;
                width: 86.84931%;
            }

            h3 {
                margin-bottom: 2.5625rem;
            }

            .title {
                color: var(--brown-2);
                margin-bottom: 1rem;
            }

            section {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-column-gap: 1rem;
                grid-row-gap: 1.5rem;
            }

            #billingDetails {
                margin-bottom: 3.3125rem;
            }

            #shippingInfo {
                margin-bottom: 3.8125rem;
            }

            label {
                font-size: 0.75rem;
                font-weight: bold;
                letter-spacing: -0.013392875rem;
                line-height: 1rem;
            }

            input {
                border: 0.0625rem solid rgba(207, 207, 207, 1);
                border-radius: 0.5rem;
                height: 3.5rem;
                padding-left: 1.5rem;
            }

            input::placeholder {
                font-size: 0.875rem;
                font-weight: bold;
                letter-spacing: -0.015625rem;
                line-height: 1.1875rem;
                opacity: 0.4;
            }

            .labelInputCombo {
                display: flex;
                flex-direction: column;
            }

            #labelInputAddressCombo {
                grid-column: 1 / span 2;
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    importedCSS() {
        this.shadowRoot.innerHTML += designSystemImport();
    }
}

if (!window.customElements.get('checkout-form')) {
    window.customElements.define('checkout-form', CheckoutForm)
}