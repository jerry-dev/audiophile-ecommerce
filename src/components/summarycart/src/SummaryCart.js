import store from '../../../lib/store/index.js';
import ItemCounter from '../../itemcounter/src/ItemCounter.js';
import SummaryItem from '../../summaryitem/src/SummaryItem.js';
import SummaryDetail from '../../summarydetail/src/SummaryDetail.js';
import ButtonTemplate from '../../buttontemplate/src/ButtonTemplate.js';


export default class SummaryCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.order = {};
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
            `<div id="CartInnerContainer">
                <h2>SUMMARY</h2>
                <span id="listOfCartItems"></span>
                <summary-detail text="TOTAL" amount="$0"></summary-detail>
                <summary-detail text="SHIPPING" amount="$0"></summary-detail>
                <summary-detail text="VAT (INCLUDED)" amount="$0"></summary-detail>
                <summary-detail text="GRAND TOTAL" amount="$0"></summary-detail>
                <button-template id="pay" text="CONTINUE & PAY"></button-template>
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
                height: auto;
                width: 31.53153%;
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

    tabletCSS() {
        const markup =
        `<style>
            @media screen and (max-width: 834px) {
                :host {
                    width: 100%;
                }

                #CartInnerContainer {
                    width: 90.42089%;
                }
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    mobileCSS() {
        const markup =
        `<style>
            @media screen and (max-width: 576px) {
                :host {
                    width: 100%;
                }

                #CartInnerContainer {
                    width: 85.32110%;
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
        // this.clickManager();
    }

    clickManager() {
        this.shadowRoot.addEventListener('click', (event) => {
            const payload = { order: this.order, success: true };
            console.log(`this.parentNode:`, this.parentNode);

            // (event.target.id === `pay`) ? this.store.dispatch(`processOrder`, payload) : "";
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
                    this.order.grandTotal = grandTotalReformatted;
                    break;
            }
        });
    }

    hydrateItemQuantity() {
        const summaryItemsData = this.store.state.cartItems;
        const summaryItems = this.shadowRoot.querySelectorAll('summary-item');

        summaryItems.forEach((item, index) => {
            let quantity = summaryItemsData[index].quantity;
            item.setAttribute('quantity', `x${quantity}`);
        });
    }

    renderCartItems() {
        const summaryItemsData = this.store.state.cartItems;
        let itemsMarkup = ``;
        this.order.items = [];
        
        this.store.state.cartItems.forEach((item, index) => {
            const itemPriceReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price).replace(".00", "");
            itemsMarkup += `<summary-item image="${item.image}" productId="${item.id}" product="${item.name}" price="${itemPriceReformatted}" quantity="${summaryItemsData[index].quantity}"></summary-item>`;

            this.order.items[this.order.items.length] = item;
        });

        this.order.numberOfItems = this.order.items.length;
        this.shadowRoot.querySelector('#listOfCartItems').innerHTML = itemsMarkup;
    }
}

if (!window.customElements.get('summary-cart')) {
    window.customElements.define('summary-cart', SummaryCart)
}