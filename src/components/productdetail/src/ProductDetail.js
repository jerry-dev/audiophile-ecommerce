import store from '../../../lib/store/index.js';
import CategoryListing from '../../categorylisting/src/CategoryListing.js';
import CategoryNavigator from '../../categorynavigator/CategoryNavigator.js';
import AboutUs from '../../aboutus/src/AboutUs.js';

export default class ProductDetail extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.store = store;
        this.render();
    }

    render() {
        this.HTML();
    }

    HTML() {
        const product = this.getListingDataFromStore(this.getAttribute('product'));
        
        this.shadowRoot.innerHTML = `
            <h1>Go Back</h1>
            <category-listing
                desktopImage="../src/${product.image.desktop}"
                tabletImage="../src/${product.image.tablet}"
                mobileImage="../src/${product.image.mobile}"
                new="${product.new}"
                name="${product.name}"
                description="${product.description}"
                slug="${product.slug}"
                price="${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price).replace(".00", "")}"
                cartReady="true"
            ></category-listing>
            <category-navigator></category-navigator>
            <about-us></about-us>
        `;
    }

    CSS() {
        this.shadowRoot.innerHTML += `
            <style>
                :host {
                    display: block;
                }
            </style>
        `;
    }

    getListingDataFromStore(product) {
        for (let i = 0; i < this.store.state.productData.length; i++) {
            if (this.store.state.productData[i].slug !== product) {
                continue;
            } else {
                return this.store.state.productData[i];
            }
        }
    }
}

if (!window.customElements.get('product-detail')) {
    window.customElements.define('product-detail', ProductDetail)
}