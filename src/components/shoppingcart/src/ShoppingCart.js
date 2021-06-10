import store from '../../../lib/store/index.js';
import ItemCounter from '../../itemcounter/src/ItemCounter.js';
import CartItem from '../../cartitem/src/CartItem.js';
import TotalCost from '../../totalcost/src/TotalCost.js';
import ButtonTemplate from '../../buttontemplate/src/ButtonTemplate.js';

export default class ShoppingCart extends HTMLElement {
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
                <item-counter count="0"></item-counter>
                <span id="listOfCartItems"></span>
                <total-cost cost="$0"></total-cost>
                <button-template text="CHECKOUT"></button-template>
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
                max-width: 23.5625rem;
            }

            #CartInnerContainer {
                padding-top: 1.9375rem;
                height: auto;
                margin-left: auto;
                margin-right: auto;
                padding-bottom: 1.9375rem;
                padding-top: 1.9375rem;
                width: 83.02387%;
            }

            cart-item:not(:last-child) {
                margin-bottom: 1.5rem;
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
        this.hydrateItemCounter();
        this.renderCartItems();
        this.hydrateItemQuantity();
        this.hydrateTotalCost();
    }

    SCRIPTS() {
        this.componentHydration();
        this.clickManager();
    }

    clickManager() {
        const itemCounter = this.shadowRoot.querySelector('item-counter');

        itemCounter.shadowRoot.addEventListener('click', (event) => {
            if (event.target.id === `clearCart`) {
                this.store.dispatch(`clearCart`);
            }
        });

        this.shadowRoot.addEventListener('click', (event) => {
            const productID = Number(event.composedPath()[0].getAttribute('data-productId'));
            const editType = event.composedPath()[0].className;

            const payload = { id: productID };
            (editType === `increment`)
                ? this.store.dispatch(`incrementQuantity`, payload)
                : this.store.dispatch(`decrementQuantity`, payload);
        });
    }

    hydrateItemCounter() {
        const numberOfItems = this.store.state.cartCalculations.numberOfDistinctItems;
        this.shadowRoot.querySelector('item-counter').setAttribute('count', numberOfItems);
    }

    hydrateTotalCost() {
        const totalPreformat = this.store.state.cartCalculations.totalCost;
        const totalReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalPreformat).replace(".00", "");
        this.shadowRoot.querySelector('total-cost').setAttribute('cost', totalReformatted);
    }

    hydrateItemQuantity() {
        const cartItemsData = this.store.state.cartItems;
        const cartItemsElements = this.shadowRoot.querySelectorAll('cart-item');

        cartItemsElements.forEach((element, index) => {
            let quantity = cartItemsData[index].quantity;
            element.setAttribute('quantity', quantity);
        });
    }

    renderCartItems() {
        let itemsMarkup = ``;
        
        this.store.state.cartItems.forEach((item) => {
            const itemPriceReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price).replace(".00", "");
            itemsMarkup += `<cart-item image="${item.image}" productId="${item.id}" product="${item.name}" price="${itemPriceReformatted}" quantity="0"></cart-item>`;
        });

        this.shadowRoot.querySelector('#listOfCartItems').innerHTML = itemsMarkup;
    }
}

if (!window.customElements.get('shopping-cart')) {
    window.customElements.define('shopping-cart', ShoppingCart)
}