import styleSheet from './checkoutform.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };

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
        this.CSS();
        this.SCRIPTS();
    }

    HTML() {
        const checkoutFormInnerContainer = document.createElement('div');
        checkoutFormInnerContainer.id = `checkoutFormInnerContainer`;

        const checkoutTitle = document.createElement('h3');
        checkoutTitle.className = `h3-design-system`;
        checkoutTitle.textContent = `CHECKOUT`;
        checkoutFormInnerContainer.appendChild(checkoutTitle);

        const formContainer = document.createElement('form');
        formContainer.setAttribute('novalidate', '');

        // Billing Section
        const billingDetailsTitle = document.createElement('h6');
        billingDetailsTitle.className = `subtitle-design-system title`;
        billingDetailsTitle.textContent = `BILLING DETAILS`;
        formContainer.appendChild(billingDetailsTitle);

        const billingDetailsSection = document.createElement('section');
        billingDetailsSection.id = `billingDetails`;

        // Name Input & Lable Container
        const labelInputNameCombo = document.createElement('div');
        labelInputNameCombo.id = `labelInputNameCombo`;
        labelInputNameCombo.className = `labelInputCombo`;

        // Name Label
        const customerNameLabel = document.createElement('label');
        customerNameLabel.htmlFor = 'customerName';
        customerNameLabel.innerHTML = 'Name<span class="error" aria-live="polite"></span>';
        labelInputNameCombo.appendChild(customerNameLabel);

        const nameInput = document.createElement('input');
        nameInput.id = 'name';
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.placeholder = 'Alexei Ward';
        nameInput.setAttribute('required', '');
        nameInput.minlength = '5';
        nameInput.maxlength = '50';
        nameInput.pattern = '[a-zA-Z ]*';
        labelInputNameCombo.appendChild(nameInput);

        // Appending name combo in billing details section
        billingDetailsSection.appendChild(labelInputNameCombo);

        // Email Input & Label Container
        const labelInputEmailCombo = document.createElement('div');
        labelInputEmailCombo.id = `labelInputEmailCombo`;
        labelInputEmailCombo.className = `labelInputCombo`;

        // Email Label
        const customerEmailLabel = document.createElement('label');
        customerEmailLabel.htmlFor = 'email';
        customerEmailLabel.innerHTML = 'Email Address<span class="error" aria-live="polite"></span>';
        labelInputEmailCombo.appendChild(customerEmailLabel);

        // Email Input
        const emailInput = document.createElement('input');
        emailInput.id = 'email';
        emailInput.type = 'email';
        emailInput.name = 'email';
        emailInput.placeholder = 'alexei@mail.com';
        emailInput.setAttribute('required', '');
        emailInput.minlength = '8';
        emailInput.maxlength = '62';
        emailInput.pattern = '.*\.(com|net|org|gov|edu|de)$';
        labelInputEmailCombo.appendChild(emailInput);

        // Appending email combo in billing details section
        billingDetailsSection.appendChild(labelInputEmailCombo);

        // Telephone Input & Label Container
        const labelInputTelephoneCombo = document.createElement('div');
        labelInputTelephoneCombo.id = `labelInputTelephoneCombo`;
        labelInputTelephoneCombo.className = `labelInputCombo`;

        // Telephone Label
        const customerTelephoneLabel = document.createElement('label');
        customerTelephoneLabel.htmlFor = 'telephone';
        customerTelephoneLabel.innerHTML = 'Phone Number<span class="error" aria-live="polite"></span>';
        labelInputTelephoneCombo.appendChild(customerTelephoneLabel);

        // Telephone Input
        const telephoneInput = document.createElement('input');
        telephoneInput.id = 'telephone';
        telephoneInput.type = 'tel';
        telephoneInput.name = 'telephone';
        telephoneInput.placeholder = '+1 202-555-0136';
        telephoneInput.setAttribute('required', '');
        telephoneInput.minlength = '10';
        telephoneInput.maxlength = '15';
        telephoneInput.pattern = '[\+0-9- ]*';
        labelInputTelephoneCombo.appendChild(telephoneInput);

        // Appending telephone combo in billing details section
        billingDetailsSection.appendChild(labelInputTelephoneCombo);

        formContainer.appendChild(billingDetailsSection);

        // Shipping Information Section
        const shippingDetailsTitle = document.createElement('h6');
        shippingDetailsTitle.className = `subtitle-design-system title`;
        shippingDetailsTitle.textContent = `SHIPPING INFO`;
        formContainer.appendChild(shippingDetailsTitle);

        const shippingInfo = document.createElement('section');
        shippingInfo.id = `shippingInfo`;

        // Address Container
        const labelInputAddressCombo = document.createElement('div');
        labelInputAddressCombo.id = `labelInputAddressCombo`;
        labelInputAddressCombo.className = `labelInputCombo`;

        // Address Label
        const customerAddressLabel = document.createElement('label');
        customerAddressLabel.htmlFor = 'address';
        customerAddressLabel.innerHTML = 'Address<span class="error" aria-live="polite"></span>';
        labelInputAddressCombo.appendChild(customerAddressLabel);

        // Address Input
        const addressInput = document.createElement('input');
        addressInput.id = 'address';
        addressInput.type = 'text';
        addressInput.name = 'address';
        addressInput.placeholder = '1137 Williams Avenue';
        addressInput.setAttribute('required', '');
        addressInput.minlength = '8';
        addressInput.maxlength = '62';
        addressInput.pattern = `[a-zA-Z0-9- .'#@%&/]*`;
        labelInputAddressCombo.appendChild(addressInput);

        // Appending address combo in shippinginfo section
        shippingInfo.appendChild(labelInputAddressCombo);

        // Zipcode Container
        const labelInputZipCodeCombo = document.createElement('div');
        labelInputZipCodeCombo.id = `labelInputZipCodeCombo`;
        labelInputZipCodeCombo.className = `labelInputCombo`;

        // Zipcode Label
        const customerZipCodeLabel = document.createElement('label');
        customerZipCodeLabel.htmlFor = 'zipcode';
        customerZipCodeLabel.innerHTML = 'Zip Code<span class="error" aria-live="polite"></span>';
        labelInputZipCodeCombo.appendChild(customerZipCodeLabel);

        // Zipcode Input
        const zipcodeInput = document.createElement('input');
        zipcodeInput.id = 'zipcode';
        zipcodeInput.type = 'text';
        zipcodeInput.name = 'zipcode';
        zipcodeInput.placeholder = '10001';
        zipcodeInput.setAttribute('required', '');
        zipcodeInput.pattern = `([0-9]{5}|[0-9]{5}-[0-9]{4})`;
        labelInputZipCodeCombo.appendChild(zipcodeInput);

        // Appending zipcode combo in shippinginfo section
        shippingInfo.appendChild(labelInputZipCodeCombo);

        // City Container
        const labelInputCityCombo = document.createElement('div');
        labelInputCityCombo.id = `labelInputCityCombo`;
        labelInputCityCombo.className = `labelInputCombo`;

        // City Label
        const customerCityLabel = document.createElement('label');
        customerCityLabel.htmlFor = 'city';
        customerCityLabel.innerHTML = 'City<span class="error" aria-live="polite"></span>';
        labelInputCityCombo.appendChild(customerCityLabel);

        // City Input
        const cityInput = document.createElement('input');
        cityInput.id = 'city';
        cityInput.type = 'text';
        cityInput.name = 'city';
        cityInput.placeholder = 'New York';
        cityInput.setAttribute('required', '');
        cityInput.minlength = '5';
        cityInput.maxlength = '40';
        cityInput.pattern = `[a-zA-Z- '\.]*`;
        labelInputCityCombo.appendChild(cityInput);

        // Appending city combo in shippinginfo section
        shippingInfo.appendChild(labelInputCityCombo);

        // Country Container
        const labelInputCountryCombo = document.createElement('div');
        labelInputCountryCombo.id = `labelInputCountryCombo`;
        labelInputCountryCombo.className = `labelInputCombo`;

        // Country Label
        const customerCountryLabel = document.createElement('label');
        customerCountryLabel.htmlFor = 'country';
        customerCountryLabel.innerHTML = 'Country<span class="error" aria-live="polite"></span>';
        labelInputCountryCombo.appendChild(customerCountryLabel);

        // Country Input
        const countryInput = document.createElement('input');
        countryInput.id = 'country';
        countryInput.type = 'text';
        countryInput.name = 'country';
        countryInput.placeholder = 'United States';
        countryInput.setAttribute('required', '');
        countryInput.minlength = '5';
        countryInput.maxlength = '40';
        countryInput.pattern = `[a-zA-Z- '\.]*`;
        labelInputCountryCombo.appendChild(countryInput);shippingDetailsTitle

        // Appending coutry combo in shippinginfo section
        shippingInfo.appendChild(labelInputCountryCombo);

        // Appending the shippinginfo section in the form
        formContainer.appendChild(shippingInfo);


        // Payment Details Section
        const paymentDetailsTitle = document.createElement('h6');
        paymentDetailsTitle.className = `subtitle-design-system title`;
        paymentDetailsTitle.textContent = `PAYMENT DETAILS`;
        formContainer.appendChild(paymentDetailsTitle);

        const paymentDetailsSection = document.createElement('section');
        paymentDetailsSection.id = `paymentDetails`;

        // Payment Label
        const paymentLabel = document.createElement('label');
        paymentLabel.id = 'paymentLabel';
        paymentLabel.textContent = 'Payment Method';
        paymentDetailsSection.appendChild(paymentLabel);

        // Payment List
        const paymentOptionsUl = document.createElement('ul');
        paymentOptionsUl.id = 'paymentOptions';
        paymentOptionsUl.className = 'labelInputCombo';

        const eMoneyLabelListElement = document.createElement('li');
        eMoneyLabelListElement.className = `checked`;

        const eMoneyLabel = document.createElement('label');
        eMoneyLabel.id = 'eMoneyLabel';
        eMoneyLabel.className = "paymentRadio";
        eMoneyLabel.innerHTML = `<span class="radioCheckOutLine"><span class="radioCheck"></span></span>e-Money<span class="error" aria-live="polite"></span>`;
        eMoneyLabelListElement.appendChild(eMoneyLabel);

        const eMoneyInput = document.createElement('input');
        eMoneyInput.id = `eMoney`;
        eMoneyInput.type = `radio`;
        eMoneyInput.name = `paymentMethod`;
        eMoneyInput.value = `eMoney`;
        eMoneyInput.checked = ``;
        eMoneyLabelListElement.appendChild(eMoneyInput);

        paymentOptionsUl.appendChild(eMoneyLabelListElement);

        const cashLabelListElement = document.createElement('li');

        const cashLabel = document.createElement('label');
        cashLabel.id = 'cashLabel';
        cashLabel.className = "paymentRadio";
        cashLabel.innerHTML = `<span class="radioCheckOutLine"><span class="radioCheck"></span></span>Cash on Delivery<span class="error" aria-live="polite"></span>`;
        cashLabelListElement.appendChild(cashLabel);     

        const cashInput = document.createElement('input');
        cashInput.id = `cash`;
        cashInput.type = `radio`;
        cashInput.name = `paymentMethod`;
        cashInput.value = `cashOnDemand`;
        cashInput.checked = ``;
        cashLabelListElement.appendChild(cashInput);

        paymentOptionsUl.appendChild(cashLabelListElement);
        paymentDetailsSection.appendChild(paymentOptionsUl);

        // Emoney Container
        const labelInputEmoneyCombo = document.createElement('div');
        labelInputEmoneyCombo.id = `labelInputEmoneyCombo`;
        labelInputEmoneyCombo.className = `labelInputCombo`;

        // Emoney label
        const enumberLabel = document.createElement('label');
        enumberLabel.htmlFor = 'enumber';
        enumberLabel.innerHTML = `e-Money Number<span class="error" aria-live="polite"></span>`;
        labelInputEmoneyCombo.appendChild(enumberLabel);

        // Emoney Number input
        const enumberInput = document.createElement('input');
        enumberInput.id = `enumber`;
        enumberInput.type = `password`;
        enumberInput.name = `enumber`;
        enumberInput.placeholder = `238521993`;
        enumberInput.setAttribute('required', '');
        enumberInput.minLength = `9`;
        enumberInput.maxLength = `9`;
        enumberInput.pattern = `[0-9]{9}`;
        labelInputEmoneyCombo.appendChild(enumberInput);

        paymentDetailsSection.appendChild(labelInputEmoneyCombo);

        // Emoney Pin Label and Input Container
        const labelInputEmoneyPinCombo = document.createElement('div');
        labelInputEmoneyPinCombo.id = `labelInputEmoneyPinCombo`;
        labelInputEmoneyPinCombo.className = `labelInputCombo`;

        // Emoney label
        const enumberPinLabel = document.createElement('label');
        enumberPinLabel.htmlFor = 'enumberPin';
        enumberPinLabel.innerHTML = `e-Money PIN<span class="error" aria-live="polite"></span>`;
        labelInputEmoneyPinCombo.appendChild(enumberPinLabel);

        // Emoney Pin input
        const enumberPinInput = document.createElement('input');
        enumberPinInput.id = `enumberPin`;
        enumberPinInput.type = `password`;
        enumberPinInput.name = `enumberPin`;
        enumberPinInput.placeholder = `6891`;
        enumberPinInput.setAttribute('required', '');
        enumberPinInput.minLength = `4`;
        enumberPinInput.maxLength = `4`;
        enumberPinInput.pattern = `[0-9]{4}`;
        labelInputEmoneyPinCombo.appendChild(enumberPinInput);

        paymentDetailsSection.appendChild(labelInputEmoneyPinCombo);

        const cashArticle = document.createElement('article');
        cashArticle.id = 'cashArticle';

        const cashArticleImage = document.createElement('img');
        cashArticleImage.src = '../src/assets/misc/Shape.svg';
        cashArticleImage.alt = 'Image of cash being given for a delivery';
        cashArticleImage.className = 'removed';
        cashArticle.appendChild(cashArticleImage);

        const cashArticleParagraph = document.createElement('p');
        cashArticleParagraph.className = 'removed';
        cashArticleParagraph.textContent = `The ‘Cash on Delivery’ option enables you to pay in cash
        when our delivery courier arrives at your residence. Just make sure your address is correct
        so that your order will not be cancelled.`;
        cashArticle.appendChild(cashArticleParagraph);

        paymentDetailsSection.appendChild(cashArticle);

        formContainer.appendChild(paymentDetailsSection);
        
        checkoutFormInnerContainer.appendChild(formContainer);
        this.shadowRoot.appendChild(checkoutFormInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
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
            (event.target.classList.contains('paymentRadio')) ? this.targetManager(theClass, event) : null;
        });
    }

    paymentSelectedStyling(event) {
        const theListElements = this.shadowRoot.querySelector('#paymentOptions').children;

        for (let i = 0; i < theListElements.length; i++) {
            theListElements[i].classList.remove('checked');
            theListElements[i].querySelector('input').removeAttribute('checked');
        }

        event.target.parentNode.classList.add('checked');
        event.target.nextElementSibling.setAttribute('checked', "");

        this.removeEmoneyInputsAndCashArticle();
        (event.target.id === `cashLabel`) ? this.showCashArticle() : this.showEmoneyInputs();
    }

    removeEmoneyInputsAndCashArticle() {
        this.removeRequiredAttributeFromEmoneyInputs();

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
        this.addRequiredAttributeFromEmoneyInputs();

        this.shadowRoot.querySelector('#labelInputEmoneyCombo').classList.remove('removed');
        this.shadowRoot.querySelector('#labelInputEmoneyPinCombo').classList.remove('removed');
    }

    removeRequiredAttributeFromEmoneyInputs() {
        this.shadowRoot.querySelector('#labelInputEmoneyCombo > input').removeAttribute('required');
        this.shadowRoot.querySelector('#labelInputEmoneyPinCombo > input').removeAttribute('required');
    }

    addRequiredAttributeFromEmoneyInputs() {
        this.shadowRoot.querySelector('#labelInputEmoneyCombo > input').setAttribute('required', "");
        this.shadowRoot.querySelector('#labelInputEmoneyPinCombo > input').setAttribute('required', "");
    }
}

if (!window.customElements.get('checkout-form')) {
    window.customElements.define('checkout-form', CheckoutForm)
}