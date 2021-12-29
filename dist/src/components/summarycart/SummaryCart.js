import store from '../../lib/store/index.js';
import styleSheet from './summarycart.css' assert { type: 'css' };
import ItemCounter from '../itemcounter/ItemCounter.js';
import SummaryItem from '../summaryitem/SummaryItem.js';
import SummaryDetail from '../summarydetail/SummaryDetail.js';
import ButtonTemplate from '../buttontemplate/ButtonTemplate.js';


export default class SummaryCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.order = {
            items: [],
        };
    }

    connectedCallback() {
        this.store = store;
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
        this.SCRIPTS();
    }

    HTML() {
        const CartInnerContainer = document.createElement('div');
        CartInnerContainer.id = 'CartInnerContainer';

        const title = document.createElement('h2');
        title.textContent = 'SUMMARY';
        CartInnerContainer.appendChild(title);

        const listOfCartItems = document.createElement('span');
        listOfCartItems.id = 'listOfCartItems';
        CartInnerContainer.appendChild(listOfCartItems);

        const totalSummaryDetail = document.createElement('summary-detail');
        totalSummaryDetail.setAttribute('text', 'TOTAL');
        totalSummaryDetail.setAttribute('amount', "$0");
        CartInnerContainer.appendChild(totalSummaryDetail);

        const shippingSummaryDetail = document.createElement('summary-detail');
        shippingSummaryDetail.setAttribute('text', "SHIPPING");
        shippingSummaryDetail.setAttribute('amount', "$0");
        CartInnerContainer.appendChild(shippingSummaryDetail);

        const vatSummaryDetail = document.createElement('summary-detail');
        vatSummaryDetail.setAttribute('text', "VAT (INCLUDED)");
        vatSummaryDetail.setAttribute('amount', "$0");
        CartInnerContainer.appendChild(vatSummaryDetail);

        const grandTotalSummaryDetail = document.createElement('summary-detail');
        grandTotalSummaryDetail.setAttribute('text', "GRAND TOTAL");
        grandTotalSummaryDetail.setAttribute('amount', "$0");
        CartInnerContainer.appendChild(grandTotalSummaryDetail);

        const continueAndPayButton = document.createElement('button-template');
        continueAndPayButton.setAttribute('id', "pay");
        continueAndPayButton.setAttribute('text', "CONTINUE & PAY");
        CartInnerContainer.appendChild(continueAndPayButton);

        this.shadowRoot.appendChild(CartInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }

    componentHydration() {
        this.renderCartItems();
        this.hydrateItemQuantity();
        this.hydrateAmounts();
    }

    SCRIPTS() {
        this.componentHydration();
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
            if (summaryItemsData[index]) {
                let quantity = summaryItemsData[index].quantity;
                item.setAttribute('quantity', `x${quantity}`);
            }
        });
    }

    renderCartItems() {
        const summaryItemsData = this.store.state.cartItems;
        
        let summaryItemsCollection = document.createElement('span');

        this.store.state.cartItems.forEach((item, index) => {
            const itemPriceReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price).replace(".00", "");

            const summaryItem = document.createElement('summary-item');
            summaryItem.setAttribute('image', item.image);
            summaryItem.setAttribute('productId', item.id);
            summaryItem.setAttribute('product', item.name);
            summaryItem.setAttribute('price', itemPriceReformatted);
            summaryItem.setAttribute('quantity', item.quantity);

            summaryItemsCollection.appendChild(summaryItem);
            
            this.order.items[this.order.items.length] = item;
        });

        this.shadowRoot.querySelector('#listOfCartItems').appendChild(summaryItemsCollection);
    }
}

if (!window.customElements.get('summary-cart')) {
    window.customElements.define('summary-cart', SummaryCart)
}