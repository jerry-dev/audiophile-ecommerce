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
        this.tabletCSS();
        this.mobileCSS();
        this.SCRIPTS();
    }

    HTML() {
        const markup =
        `<div id="checkoutFormInnerContainer">
            <h3 class="h3-design-system">CHECKOUT</h3>
            <form novalidate>
                <h6 class="subtitle-design-system title">BILLING DETAILS</h6>
                <section id="billingDetails">
                    <div class="labelInputCombo" id="labelInputNameCombo">
                        <label for="customerName">Name<span class="error" aria-live="polite"></span></label>
                        <input type="text" id="name" name="name" placeholder="Alexei Ward"
                        required minlength="5" maxlength="50" pattern="[a-zA-Z ]*">
                    </div>
                    <div class="labelInputCombo" id="labelInputEmailCombo">
                        <label for="email">Email Address<span class="error" aria-live="polite"></span></label>
                        <input type="email" id="email" name="email" placeholder="alexei@mail.com"
                        required minlength="8" maxlength="62" pattern=".*\.(com|net|org|gov|edu|de)$">
                    </div>
                    <div class="labelInputCombo" id="labelInputTelephoneCombo">
                        <label for="telephone">Phone Number<span class="error" aria-live="polite"></span></label>
                        <input type="tel" id="telephone" name="telephone" placeholder="+1 202-555-0136"
                        required minlength="10" maxlength="15" pattern="[\+0-9- ]*">
                    </div>
                </section>

                <h6 class="subtitle-design-system title">SHIPPING INFO</h6>
                <section id="shippingInfo">
                    <div class="labelInputCombo" id="labelInputAddressCombo">
                        <label for="address">Address<span class="error" aria-live="polite"></span></label>
                        <input type="text" id="address" name="address" placeholder="1137 Williams Avenue"
                        required minlength="8" maxlength="62" pattern="[a-zA-Z0-9- .'#@%&/]*">
                    </div>
                    <div class="labelInputCombo" id="labelInputZipCodeCombo">
                        <label for="zipcode">Zip Code<span class="error" aria-live="polite"></span></label>
                        <input type="text" id="zipcode" name="zipcode" placeholder="10001"
                        required pattern="([0-9]{5}|[0-9]{5}-[0-9]{4})">
                    </div>
                    <div class="labelInputCombo" id="labelInputCityCombo">
                        <label for="city">City<span class="error" aria-live="polite"></span></label>
                        <input type="text" id="city" name="city" placeholder="New York"
                        required minlength="5" maxlength="40" pattern="[a-zA-Z- '\.]*">
                    </div>
                    <div class="labelInputCombo" id="labelInputCountryCombo">
                        <label for="country">Country<span class="error" aria-live="polite"></span></label>
                        <input type="text" id="country" name="country" placeholder="United States"
                        required minlength="5" maxlength="40" pattern="[a-zA-Z- '\.]*">
                    </div>
                </section>

                <h6 class="subtitle-design-system title">PAYMENT DETAILS</h6>
                <section id="paymentDetails">
                    
                    <label id="paymentLabel">Payment Method</label>
                    <ul class="labelInputCombo" id="paymentOptions">
                        <li class="checked">
                            <label id="eMoneyLabel" class="paymentRadio"><span class="radioCheckOutLine"><span class="radioCheck"></span></span>e-Money<span class="error" aria-live="polite"></span></label>
                            <input type="radio" id="eMoney" name="paymentMethod" checked>
                        </li>
                        <li>
                            <label id="cashLabel" class="paymentRadio"><span class="radioCheckOutLine"><span class="radioCheck"></span></span>Cash on Delivery<span class="error" aria-live="polite"></span></label>
                            <input type="radio" id="cash" name="paymentMethod">
                        </li>
                    </ul>

                    <div class="labelInputCombo" id="labelInputEmoneyCombo">
                        <label for="enumber">e-Money Number<span class="error" aria-live="polite"></span></label>
                        <input type="password" id="enumber" name="enumber" placeholder="238521993"
                        required minlength="9" maxlength="9" pattern="[0-9]{9}">
                    </div>
                    <div class="labelInputCombo" id="labelInputEmoneyPinCombo">
                        <label for="enumberPin">e-Money PIN<span class="error" aria-live="polite"></span></label>
                        <input type="password" id="enumberPin" name="enumberPin" placeholder="6891"
                        required minlength="4" maxlength="4" pattern="[0-9]{4}">
                    </div>

                    <article id="cashArticle">
                        <img src="../src/assets/misc/Shape.svg" class="removed"/>
                        <p class="removed">
                            The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier
                            arrives at your residence. Just make sure your address is correct so that your
                            order will not be cancelled.
                        </p>
                    </article>
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
                border-radius: 0.5rem;
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

            #billingDetails,
            #shippingInfo {
                display: grid;
                grid-template-columns: repeat(2, 48.73817%);
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
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size: 0.75rem;
                font-weight: bold;
                letter-spacing: -0.013392875rem;
                line-height: 1rem;
                margin-bottom: 0.5625rem;
            }

            .labelInputCombo input:focus {
                outline: none;
                border: 0.0625rem solid var(--brown-2);
            }

            input {
                padding-left: 7.76699%;
            }

            input,
            #paymentOptions li {
                border: 0.0625rem solid rgba(207, 207, 207, 1);
                border-radius: 0.5rem;
                height: 3.5rem;
            }

            .labelInputCombo input {
                cursor: pointer;
            }

            #labelInputAddressCombo input {
                padding-left: 3.78548%;
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

            #paymentDetails {
                display: grid;
                grid-template-columns: repeat(2, 48.73817%);
                grid-column-gap: 1rem;
                grid-row-gap: 1.5rem;
            }

            #paymentDetails .labelInputCombo {
                grid-column: span 1;
            }

            ul {
                list-style: none;
            }

            #paymentLabel {
                grid-row: 1 / span 1;
            }

            #paymentOptions li {
                align-items: center;
                display: flex;
                flex-direction: row;
                padding: 0;
            }

            #paymentOptions label {
                padding-left: 2.52365%;
                justify-content: left;
            }

            #paymentOptions li input[type="radio"] {
                visibility: hidden;
            }

            #paymentOptions li.checked {
                border-color: var(--brown-2);
            }

            #paymentOptions li:first-child {
                margin-bottom: 1rem;
            }

            .paymentRadio {
                align-items: center;
                cursor: pointer;
                display: flex;
                height: 100%;
                width: 100%;
            }

            .radioCheckOutLine {
                align-items: center;
                border: 1px solid #CFCFCF;
                border-radius: 50%;
                display: flex;
                height: 20px;
                margin-right: 1rem;
                width: 20px;
            }

            .radioCheckOutLine > .radioCheck {
                background-color: var(--brown-2);
                border-radius: 50%;
                display: none;
                height: 10px;
                margin-left: auto;
                margin-right: auto;
                width: 10px;
            }

            .labelInputCombo li.checked .radioCheck {
                display: block;
            }

            #cashArticle {
                align-items: center;
                display: flex;
                flex-direction: row;
                grid-column: 1 / span 2;
            }

            #cashArticle img {
                height: 3rem;
                margin-right: 2rem;
                width: 3rem;
            }

            #cashArticle p {
                font-size: 0.9375rem;
                line-height: 1.5625rem;
                opacity: 0.5;
                max-width: 58ch;
            }

            .removed {
                display: none;
            }

            .labelInputCombo input.error {
                border: 2px solid #CD2C2C;
            }

            .labelInputCombo label.error {
                color: #CD2C2C;
            }

            .labelInputCombo span.error {
                color: #CD2C2C;
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    tabletCSS() {
        const markup =
        `<style>
            @media screen and (max-width: 768px) {
                :host {
                    margin-bottom: 2rem;
                    width: 100%;
                }

                #checkoutFormInnerContainer {
                    padding-bottom: 1.875rem;
                    padding-top: 1.875rem;
                    width: 92.01741%;
                }

                #paymentOptions label {
                    padding-left: 5.17799%;
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
                    margin-bottom: 2rem;
                }

                #checkoutFormInnerContainer {
                    padding-bottom: 1.875rem;
                    padding-top: 1.5rem;
                    width: 92.01741%;
                }

                h3 {
                    font-size: 16rem;
                    margin-bottom: 2rem;
                }

                #billingDetails,
                #shippingInfo {
                    margin-bottom: 2rem;
                }

                #billingDetails,
                #shippingInfo,
                #paymentDetails {
                    display: flex;
                    flex-direction: column;
                }

                input,
                #labelInputAddressCombo input,
                #paymentOptions li {
                    XXXpadding-left: 8.57142%;
                }


                input,
                #labelInputAddressCombo input {
                    padding-left: 8.57142%;
                }

                #paymentOptions label {
                    padding-left: 1rem;
                    padding-left: 5.71428%;
                    width: 100%;
                }

                #eMoneyLabel::after {
                    left: -90px;
                }
    
                #eMoneyLabel::before {
                    left: -24px;
                }

                #cashLabel::after {
                    left: -134px;
                }
    
                #cashLabel::before {
                    left: -24px;
                }

                #cashArticle {
                    flex-direction: column;
                }

                #cashArticle img {
                    height: 6rem;
                    margin-bottom: 1rem;
                    margin-right: 0rem;
                    width: 6rem;
                }

                #cashArticle p {
                    max-width: 60ch;
                }
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    importedCSS() {
        this.shadowRoot.innerHTML += designSystemImport();
    }

    SCRIPTS() {
        this.clickHandler();
    }

    targetManager(theClass, event) {
        return {
            paymentRadio: this.paymentSelectedStyling(event),
        }[theClass];
    }

    clickHandler() {
        this.shadowRoot.addEventListener('click', (event) => {
            const theClass = event.target.classList.value;
            (theClass === 'paymentRadio') ? this.targetManager(theClass, event) : "";
        });
    }

    paymentSelectedStyling(event) {
        const theListElements = this.shadowRoot.querySelector('#paymentOptions').children;

        for (let i = 0; i < theListElements.length; i++) {
            theListElements[i].classList.remove('checked');
        }

        event.target.parentNode.classList.add('checked');

        this.removeEmoneyInputsAndCashArticle();

        (event.target.id === `cashLabel`) ? this.showCashArticle() : this.showEmoneyInputs();
    }

    removeEmoneyInputsAndCashArticle() {
        this.shadowRoot.querySelector('#labelInputEmoneyCombo').classList.add('removed');
        this.shadowRoot.querySelector('#labelInputEmoneyPinCombo').classList.add('removed');
        this.shadowRoot.querySelector('#cashArticle img').classList.add('removed');
        this.shadowRoot.querySelector('#cashArticle p').classList.add('removed');
    }

    showCashArticle() {
        this.shadowRoot.querySelector('#cashArticle img').classList.remove('removed');
        this.shadowRoot.querySelector('#cashArticle p').classList.remove('removed');
    }

    showEmoneyInputs() {
        this.shadowRoot.querySelector('#labelInputEmoneyCombo').classList.remove('removed');
        this.shadowRoot.querySelector('#labelInputEmoneyPinCombo').classList.remove('removed');
    }
}

if (!window.customElements.get('checkout-form')) {
    window.customElements.define('checkout-form', CheckoutForm)
}