import store from '../../../lib/store/index.js';
import designSystemImport from '../../../lib/designSystem.js';
import SummaryItem from '../../summaryitem/src/SummaryItem.js';
import ButtonTemplate from '../../buttontemplate/src/ButtonTemplate.js';

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
        this.importedCSS();
        this.CSS();
        this.mobileCSS();
        this.SCRIPTS();
    }

    HTML() {
        const markup =
        `<div id="dialogBox">
            <div id="dialogBoxInnerContainer">
                <img alt="confirmation check image" src="../src/assets/misc/circlewithcheck.svg"/>
                <h3 class="h3-design-system">THANK YOU</br> FOR YOUR ORDER</h3>
                <p class="subtitle-design-system">You will receive an email confirmation shortly.</p>
                <div id="orderDetails">
                    <section id="items">
                        <div>
                            <div id="listOfCartItems"></div>
                            <button type="button" data-showing="one" id="viewSwitcher">WAITING</button>
                        </div>
                    </section>
                    <section id="grandTotal">
                        <div>
                            <p>GRAND TOTAL</p>
                            <output>$0,000</output>
                        </div>
                    </section>
                </div>
                <button-template id="jumpHome" text="BACK TO HOME"></button-template>
            </div>
        </div>`;

        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            *, *::before, *::after { padding: 0; margin: 0; }

            :host {
                background-color: rgba(0, 0, 0, 0.4);
                height: 100vh;
                left: 0;
                position: fixed;
                right: 0;
                top: 96px;
                width: 100vw;
                z-index: 500;
            }

            :host([activated="false"]) {
                display: none;
            }

            :host([activated="true"]) {
                display: block;
            }

            #dialogBox {
                background-color: var(--white-1);
                border-radius: 0.5rem;
                margin-left: auto;
                margin-right: auto;
                margin-top: 7.8125rem;
                padding-bottom: 3rem;
                padding-top: 3rem;
                max-width: 33.75rem;
            }

            #dialogBoxInnerContainer {
                margin-left: auto;
                margin-right: auto;
                width: 82.22222%;
            }

            #dialogBoxInnerContainer > img {
                margin-bottom: 2.0625rem; 
            }

            #dialogBoxInnerContainer > h3 {
                margin-bottom: 1.5rem;
            }

            #dialogBoxInnerContainer > p {
                font-style: normal;
                text-transform: none;
                margin-bottom: 2.0625rem;
                opacity: 0.5;
            }

            #orderDetails {
                display: flex;
                flex-direction: row;
                margin-bottom: 2.875rem;
                width: 100%;
            }

            #orderDetails > #items {
                background-color: var(--grey-1);
                border-radius: 0.5rem 0rem 0rem 0.5rem;
                padding-bottom: 1.125rem;
                padding-top: 1.5rem;
                width: 55.40540%;
            }

            #orderDetails > #items > div {
                margin-left: auto;
                margin-right: auto;
                width: 80.48780%;
            }

            summary-item {
                height: 3.125rem;
                margin-bottom: 1rem;
            }

            summary-item img {
                max-width: 100%;
                height: 50px;
                width: 50px;
                display: none;
            }

            #orderDetails > #items > div button {
                border: none;
                border-top: 1px solid rgba(0, 0, 0, 0.08);
                cursor: pointer;
                font-size: 0.75rem;
                font-weight: bold;
                letter-spacing: -0.013392875rem;
                line-height: 1rem;
                height: 1.875rem;
                opacity: 0.5;
                width: 100%;
            }

            #orderDetails > #grandTotal {
                background-color: var(--black-2);
                border-radius: 0rem 0.5rem 0.5rem 0rem;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding-bottom: 2.625rem;
                padding-top: 2.5625rem;
                width: 44.59459%;
            }

            #grandTotal > div {
                margin-left: auto;
                margin-right: auto;
                width: 67.67676%;
            }

            #grandTotal > div > p {
                color: var(--white-1);
                font-size: 0.9375rem;
                font-weight: 500;
                line-height: 1.5625rem;
                margin-bottom: 0.5rem;
                opacity: 0.5;
            }

            #grandTotal > div > output {
                color: var(--white-1);
                font-size: 1.125rem;
                font-weight: bold;
                line-height: 1.5625rem;
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    mobileCSS() {
        const markup =
        `<style>
            @media screen and (max-width: 576px) {
                :host {
                    top: 0px;
                }

                #dialogBox {
                    margin-top: 14rem;
                    padding-bottom: 2rem;
                    padding-top: 2rem;
                    max-width: 20.4375rem;
                }

                #dialogBoxInnerContainer > img {
                    margin-bottom: 1.4375rem; 
                }

                #dialogBoxInnerContainer > h3 {
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                    line-height: 1.75rem;
                    letter-spacing: 0.0535714375rem;
                }

                #dialogBoxInnerContainer > p {
                    font-size: 0.9375rem;
                    font-weight: 500;
                    letter-spacing: 0.03125rem;
                    line-height: 1.5625rem;
                    margin-bottom: 1.5rem;
                    min-width: 35ch;
                }

                #orderDetails {
                    flex-direction: column;
                    margin-bottom: 1.4375rem;
                }

                #orderDetails > #items {
                    border-radius: 0.5rem 0.5rem 0rem 0rem;
                    padding-bottom: 1.5625rem;
                    width: 100%;
                }

                #orderDetails > #items > div {
                    width: 81.74904%;
                }

                #orderDetails > #grandTotal {
                    border-radius: 0rem 0rem 0.5rem 0.5rem;
                    padding-bottom: 1.1875rem;
                    padding-top: 0.9375rem;
                    width: 100%;
                }
    
                #grandTotal > div {
                    width: 81.74904%;
                }
            }
        </style>`;
        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    importedCSS() {
        this.shadowRoot.innerHTML += designSystemImport();
    }

    componentHydration() {
        if (this.store.state.path === "checkout") {
            this.activateOrderConfirmationModal();
        }
    }

    activateOrderConfirmationModal() {
        if (this.store.state.order.success) {
            const order = this.store.state.order.order;
            this.shadowRoot.querySelector('#grandTotal output').innerText = order.grandTotal;

            this.renderFirstItem();
        }
    }

    renderFirstItem() {
        const change = /\.[0-9][0-9]/;
        const item = this.store.state.order.order.items[0];
        const numberOfItems = this.store.state.order.order.numberOfItems;
        const priceReformatted = new Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD'}).format(item.price).replace(change, "");

        const summaryItem = document.createElement('summary-item');

        summaryItem.setAttribute('image', item.image);
        summaryItem.setAttribute('productId', item.id);
        summaryItem.setAttribute('product', item.name);
        summaryItem.setAttribute('price', priceReformatted);
        summaryItem.setAttribute('quantity', item.quantity);

        this.shadowRoot.querySelector('#items #listOfCartItems').innerHTML = "";
        this.shadowRoot.querySelector('#items #listOfCartItems').appendChild(summaryItem);
        this.shadowRoot.querySelector('#items #viewSwitcher').innerText = `and ${numberOfItems-1} other item(s)`;
        this.shadowRoot.querySelector('#items #viewSwitcher').setAttribute('data-showing', 'one');
    }

    renderAllOrderedItems() {
        const items = this.store.state.order.order.items;
        const change = /\.[0-9][0-9]/;
        this.shadowRoot.querySelector('#items #listOfCartItems').innerHTML = "";

        items.forEach((item) => {
            let summaryItem = document.createElement('summary-item');

            const priceReformatted = new Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD'}).format(item.price).replace(change, "");

            summaryItem.setAttribute('image', item.image);
            summaryItem.setAttribute('productId', item.id);
            summaryItem.setAttribute('product', item.name);
            summaryItem.setAttribute('price', priceReformatted);
            summaryItem.setAttribute('quantity', item.quantity);

            this.shadowRoot.querySelector('#items #listOfCartItems').appendChild(summaryItem);
        });

        this.shadowRoot.querySelector('#items #viewSwitcher').innerText = `View less`;
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