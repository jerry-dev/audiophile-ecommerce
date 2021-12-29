import store from '../../lib/store/index.js';
import styleSheet from './orderconfirmed.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };
import SummaryItem from '../summaryitem/SummaryItem.js';
import ButtonTemplate from '../buttontemplate/ButtonTemplate.js';

export default class OrderConfirmed extends HTMLElement {
    static get observedAttributes() {
        return ['activated'];
    }
    
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
            this[attrName] = this.getAttribute(attrName);
        }
    }

    connectedCallback() {
        this.store = store;
        this.store.observer.subscribe('stateChange', () => {
            this.componentHydration();
        });
        this.render();
        this.componentHydration();
    }

    render() {
        this.HTML();
        this.CSS();
        this.SCRIPTS();
    }
    
    HTML() {
        const dialogBox = document.createElement('div');
        dialogBox.id = 'dialogBox';

        const dialogBoxInnerContainer = document.createElement('div');
        dialogBoxInnerContainer.id = 'dialogBoxInnerContainer';

        const confirmationCheckImage = document.createElement('img');
        confirmationCheckImage.alt = 'Check symbol';
        confirmationCheckImage.src = '../src/assets/misc/circlewithcheck.svg';
        dialogBoxInnerContainer.appendChild(confirmationCheckImage);

        const thankYouForYourOrderText = document.createElement('h3');
        thankYouForYourOrderText.className = 'h3-design-system';
        thankYouForYourOrderText.innerHTML = 'THANK YOU</br> FOR YOUR ORDER';
        dialogBoxInnerContainer.appendChild(thankYouForYourOrderText);

        const incomingEmailConfirmationHeadsUpText = document.createElement('p');
        incomingEmailConfirmationHeadsUpText.className = 'subtitle-design-system';
        incomingEmailConfirmationHeadsUpText.textContent = 'You will receive an email confirmation shortly.';
        dialogBoxInnerContainer.appendChild(incomingEmailConfirmationHeadsUpText);

        const orderDetails = document.createElement('div');
        orderDetails.id = 'orderDetails';

        const itemsSection = document.createElement('section');
        itemsSection.id = 'items';

        const itemsSectionInnerContainer = document.createElement('div');

        const listOfCartItems = document.createElement('div');
        listOfCartItems.id = 'listOfCartItems';
        itemsSectionInnerContainer.appendChild(listOfCartItems);

        const viewSwitcherButton = document.createElement('button');
        viewSwitcherButton.type = 'button';
        viewSwitcherButton.id = 'viewSwitcher';
        viewSwitcherButton.textContent = 'WAITING';
        viewSwitcherButton.setAttribute('data-showing', 'one');
        itemsSectionInnerContainer.appendChild(viewSwitcherButton);

        itemsSection.appendChild(itemsSectionInnerContainer);
        orderDetails.appendChild(itemsSection);

        const grandTotalSection = document.createElement('section');
        grandTotalSection.id = 'grandTotal';

        const grandTotalSectionInnerContainer = document.createElement('div');

        const grandTotalText = document.createElement('p');
        grandTotalText.textContent = 'GRAND TOTAL';
        grandTotalSectionInnerContainer.appendChild(grandTotalText);

        const grandTotalAmount = document.createElement('output');
        grandTotalAmount.textContent = '$0,000';
        grandTotalSectionInnerContainer.appendChild(grandTotalAmount);

        grandTotalSection.appendChild(grandTotalSectionInnerContainer);

        orderDetails.appendChild(grandTotalSection);

        orderDetails.appendChild(grandTotalSection);
        dialogBoxInnerContainer.appendChild(orderDetails);

        const jumpHomeButton = document.createElement('button-template');
        jumpHomeButton.id = 'jumpHome';
        jumpHomeButton.setAttribute('text', 'BACK TO HOME');
        dialogBoxInnerContainer.appendChild(jumpHomeButton);

        dialogBox.appendChild(dialogBoxInnerContainer);

        this.shadowRoot.appendChild(dialogBox);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
    }

    componentHydration() {
        this.activateOrderConfirmationModal();
    }

    activateOrderConfirmationModal() {
        if (this.store.state.order.success) {
            const order = this.store.state.order.order;
            this.shadowRoot.querySelector('#grandTotal output').textContent = order.grandTotal;

            this.renderFirstItem();
        }
    }

    renderFirstItem() {
        if (this.store.state.cartItems.length < 1) return;

        const change = /\.[0-9][0-9]/;
        const item = this.store.state.cartItems[0];
        const numberOfItems = this.store.state.cartItems.length;
        const priceReformatted = new Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD'}).format(item.price).replace(change, "");

        const summaryItem = document.createElement('summary-item');

        summaryItem.setAttribute('image', item.image);
        summaryItem.setAttribute('productId', item.id);
        summaryItem.setAttribute('product', item.name);
        summaryItem.setAttribute('price', priceReformatted);
        summaryItem.setAttribute('quantity', item.quantity);

        this.shadowRoot.querySelector('#items #listOfCartItems').textContent = "";
        this.shadowRoot.querySelector('#items #listOfCartItems').appendChild(summaryItem);
        this.shadowRoot.querySelector('#items #viewSwitcher').textContent = `and ${numberOfItems-1} other item(s)`;
        this.shadowRoot.querySelector('#items #viewSwitcher').setAttribute('data-showing', 'one');
    }

    renderAllOrderedItems() {
        const items = this.store.state.cartItems;
        const change = /\.[0-9][0-9]/;
        this.shadowRoot.querySelector('#items #listOfCartItems').textContent = "";

        let summaryItemsCollection = document.createElement('span');

        items.forEach((item) => {
            let summaryItem = document.createElement('summary-item');

            const priceReformatted = new Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD'}).format(item.price).replace(change, "");

            summaryItem.setAttribute('image', item.image);
            summaryItem.setAttribute('productId', item.id);
            summaryItem.setAttribute('product', item.name);
            summaryItem.setAttribute('price', priceReformatted);
            summaryItem.setAttribute('quantity', item.quantity);

            summaryItemsCollection.appendChild(summaryItem);
        });

        this.shadowRoot.querySelector('#items #listOfCartItems').appendChild(summaryItemsCollection);

        this.shadowRoot.querySelector('#items #viewSwitcher').textContent = `View less`;
        this.shadowRoot.querySelector('#items #viewSwitcher').setAttribute('data-showing', 'multiple');
    }

    SCRIPTS() {
        this.clickManager();
    }

    clickManager() {
        this.shadowRoot.addEventListener(`click`, (event) => {
            if (event.target.id === 'viewSwitcher') {
                (event.target.getAttribute('data-showing') !== `multiple`)
                ? this.renderAllOrderedItems()
                : this.renderFirstItem();
            }
        });
    }
}

if (!window.customElements.get('order-confirmed')) {
    window.customElements.define('order-confirmed', OrderConfirmed)
}