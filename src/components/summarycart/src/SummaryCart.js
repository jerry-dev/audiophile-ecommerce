import store from '../../../lib/store/index.js';
import ItemCounter from '../../itemcounter/src/ItemCounter.js';
import SummaryItem from '../../summaryitem/src/SummaryItem.js';
import SummaryDetail from '../../summarydetail/src/SummaryDetail.js';
import ButtonTemplate from '../../buttontemplate/src/ButtonTemplate.js';


export default class SummaryCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
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
        this.mobileCSS();
        this.SCRIPTS();
    }

    HTML() {
        const markup =
            `<div id="CartInnerContainer">
                <h2>SUMMARY</h2>
                <span id="listOfCartItems"></span>
                <summary-detail text="TOTAL" amount="$0"></summary-detail>
                <summary-detail text="SHIPPING" amount="$0"></summary-detail>
                <summary-detail text="VAT (INCLUDED)" amount="$0"></summary-detail>
                <summary-detail text="GRAND TOTAL" amount="$0"></summary-detail>
                <button-template text="CONTINUE & PAY"></button-template>
            </div>`;
            
        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            :host {
                background-color: var(--white-1);
                border-radius: 0.5rem;
                display: block;
                max-width: 21.875rem;
            }

            #CartInnerContainer {
                height: auto;
                margin-left: auto;
                margin-right: auto;
                padding-bottom: 2rem;
                padding-top: 2rem;
                width: 81.14285%;
            }

            h2 {
                font-size: 1.125rem;
                font-weight: bold;
                letter-spacing: 0.080356875rem;
                line-height: 1.5625rem;
                margin-bottom: 1.9375rem;
                margin-top: 0;
            }

            summary-item:not(:last-child) {
                margin-bottom: 1.5rem;
            }

            #listOfCartItems {
                display: block;
                margin-bottom: 2rem;
            }

            summary-detail {
                margin-bottom: 0.5rem;
            }

            button-template {
                margin-top: 2rem;
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    mobileCSS() {
        const markup =
        `<style>
            @media screen and (max-width: 576px) {
                :host {
                    min-width: 20.4375rem;
                }

                #CartInnerContainer {
                    width: 82.87461%;
                }
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    componentHydration() {
        this.renderCartItems();
        this.hydrateItemQuantity();
        this.hydrateAmounts();
    }

    SCRIPTS() {
        this.componentHydration();
        this.clickManager();
    }

    clickManager() {
        this.shadowRoot.addEventListener('click', (event) => {
            console.log(`Clicked:`, event.composedPath()[0]);
            // const productID = Number(event.composedPath()[0].getAttribute('data-productId'));
            // const editType = event.composedPath()[0].className;

            // const payload = { id: productID };
            // (editType === `increment`)
            //     ? this.store.dispatch(`incrementQuantity`, payload)
            //     : this.store.dispatch(`decrementQuantity`, payload);
        });
    }


    hydrateAmounts() {
        const summaryDetails = this.shadowRoot.querySelectorAll('summary-detail');
        const vatRate = 0.20;
        const shipping = 50.00;
        const change = /\.[0-9][0-9]/;


        const totalPreformat = this.store.state.cartCalculations.totalCost;
        const totalReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalPreformat).replace(change, "");
        const shippingReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(shipping).replace(change, "");
        const vatPayed = (totalPreformat * vatRate);
        const vatPayedReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(vatPayed).replace(change, "");
        const grandTotal = totalPreformat + shipping;
        const grandTotalReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(grandTotal).replace(change, "");

        summaryDetails.forEach((detail, index) => {
            switch (index) {
                case 0:
                    detail.setAttribute('amount', totalReformatted);
                    break;
                case 1:
                    detail.setAttribute('amount', shippingReformatted);
                    break;
                case 2:
                    detail.setAttribute('amount', vatPayedReformatted);
                    break;
                case 3:
                    detail.setAttribute('amount', grandTotalReformatted);
                    break;
            }
        });
        
    }

    hydrateItemQuantity() {
        const summaryItemsData = this.store.state.cartItems;
        const summaryItems = this.shadowRoot.querySelectorAll('summary-item');

        summaryItems.forEach((item, index) => {
            let quantity = summaryItemsData[index].quantity;
            item.shadowRoot.querySelector('#quantity').innerText = `x${quantity}`;
        });
    }

    renderCartItems() {
        let itemsMarkup = ``;
        
        this.store.state.cartItems.forEach((item) => {
            const itemPriceReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price).replace(".00", "");
            itemsMarkup += `<summary-item image="${item.image}" productId="${item.id}" product="${item.name}" price="${itemPriceReformatted}" quantity="0"></summary-item>`;
        });

        this.shadowRoot.querySelector('#listOfCartItems').innerHTML = itemsMarkup;
    }
}

if (!window.customElements.get('summary-cart')) {
    window.customElements.define('summary-cart', SummaryCart)
}