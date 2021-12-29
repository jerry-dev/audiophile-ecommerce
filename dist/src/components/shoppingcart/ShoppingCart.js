import store from '../../lib/store/index.js';
import router from '../../lib/router/index.js';
import styleSheet from './shoppingcart.css' assert { type: 'css' };
import ItemCounter from '../itemcounter/ItemCounter.js';
import CartItem from '../cartitem/CartItem.js';
import TotalCost from '../totalcost/TotalCost.js';
import ButtonTemplate from '../buttontemplate/ButtonTemplate.js';

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
        this.SCRIPTS();
    }
    
    HTML() {
        const cartInnerContainer = document.createElement('div');
        cartInnerContainer.id = `cartInnerContainer`;

        const itemCounter = document.createElement('item-counter');
        itemCounter.setAttribute('count', "0");
        cartInnerContainer.appendChild(itemCounter);

        const listOfCartItems = this.getCollectionOfCartItems(this.store.state.cartItems);
        cartInnerContainer.appendChild(listOfCartItems);

        const totalCost = document.createElement('total-cost');
        totalCost.setAttribute('cost', "$0");
        cartInnerContainer.appendChild(totalCost);

        const buttonTemplate = document.createElement('button-template');
        buttonTemplate.id = `checkout`;
        buttonTemplate.setAttribute('text', "CHECKOUT");
        cartInnerContainer.appendChild(buttonTemplate);

        this.shadowRoot.appendChild(cartInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }
    
    componentHydration() {
        if (this.getAttribute('state') === 'visible') {
            const cartItems = this.store.state.cartItems;

            this.hydrateItemCounter(cartItems);
            this.updateRenderedCartItems(cartItems);
            this.hydrateTotalCost();
        }
    }

    SCRIPTS() {
        this.componentHydration();
        this.clickManager();
    }

    clickManager() {
        this.shadowRoot.addEventListener('click', (event) => {
            if (event.composedPath()[0].id === `clearCart`) {
                return this.store.dispatch(`clearCart`);
            }

            if (event.composedPath()[0].id === `checkout`) {
                const numberOfItemsInCart = this.store.state.cartCalculations.numberOfDistinctItems;
                if (numberOfItemsInCart > 0) {
                    document.querySelector('body').classList.remove('lock');
                    router.navigate(`/checkout`);
                }
            }

            if (event.composedPath()[0].hasAttribute('data-productid')) {
                const productID = Number(event.composedPath()[0].getAttribute('data-productId'));
                const editType = event.composedPath()[0].className;

                const payload = { id: productID };
                (editType === `increment`)
                    ? this.store.dispatch(`incrementQuantity`, payload)
                    : this.store.dispatch(`decrementQuantity`, payload);
            }
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

    renderCartItems(cartItems) {
        // let itemsMarkup = ``;
        
        // this.store.state.cartItems.forEach((item) => {
        //     const itemPriceReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price).replace(".00", "");
        //     itemsMarkup += `<cart-item image="${item.image}" productId="${item.id}" product="${item.name}" price="${itemPriceReformatted}" quantity="0"></cart-item>`;
        // });

        // this.shadowRoot.querySelector('#listOfCartItems').innerHTML = itemsMarkup;

        const listOfCartItems = this.getCollectionOfCartItems(cartItems);
        this.shadowRoot.appendChild(listOfCartItems);
    }

    updateRenderedCartItems(cartItems) {
        if (this.shadowRoot.querySelector('#listOfCartItems')) {
            this.shadowRoot.querySelector('#listOfCartItems').remove();

            const cartItemsCollection = document.createElement('span');
            cartItemsCollection.id = `listOfCartItems`;
        
            cartItems.forEach((item) => {

                const itemPriceReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price).replace(".00", "");
                const cartItem = document.createElement('cart-item');
                const quantity = Number(item.quantity);

                cartItem.setAttribute('image', item.image);
                cartItem.setAttribute('productId', item.id);
                cartItem.setAttribute('product', item.name);
                cartItem.setAttribute('price', itemPriceReformatted);
                cartItem.setAttribute('quantity', quantity);

                cartItemsCollection.appendChild(cartItem);
            });

            this.shadowRoot.querySelector('item-counter').insertAdjacentElement('afterend', cartItemsCollection);
        }
    }

    getCollectionOfCartItems(cartItems) {
        const cartItemsCollection = document.createElement('span');
        cartItemsCollection.id = `listOfCartItems`;
        
        cartItems.forEach((item) => {
            const itemPriceReformatted = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price).replace(".00", "");
            const cartItem = document.createElement('cart-item');
            const quantity = Number(item.quantity);

            cartItem.setAttribute('image', item.image);
            cartItem.setAttribute('productId', item.id);
            cartItem.setAttribute('product', item.name);
            cartItem.setAttribute('price', itemPriceReformatted);
            cartItem.setAttribute('quantity', quantity);

            cartItemsCollection.appendChild(cartItem);
        });

        return cartItemsCollection;
    }
}

if (!window.customElements.get('shopping-cart')) {
    window.customElements.define('shopping-cart', ShoppingCart)
}