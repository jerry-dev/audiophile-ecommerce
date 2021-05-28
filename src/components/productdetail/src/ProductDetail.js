import store from '../../../lib/store/index.js';
import CategoryListing from '../../categorylisting/src/CategoryListing.js';
import ProductDescription from '../../productdescription/src/ProductDescription.js';
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
        const list = this.renderItemsList(product.includes);
        const features = product.features.replace(/[\n\r]+/g, "</br></br>");
        console.log(`The features post clean up:`, features);
        
        let markup =
            `<h1>Go Back</h1>
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
            <product-description
                features="${features}"
                itemsList="${list}"
            ></product-description>
            <category-navigator></category-navigator>
            <about-us></about-us>
        `;

        this.shadowRoot.innerHTML = markup;
    }

    CSS() {
        let markup =
            `<style>
                :host {
                    display: block;
                }
            </style>`;

        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    renderItemsList(listArray) {
        let result = '';
        listArray.forEach((listPair) => {
            result +=
            `<li class='subtitle-design-system'>
                <span class='quantity'>${listPair.quantity}x</span>
                <span class='item'>${listPair.item}</span>
            </li>`;

            result = result.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
        });

        return result;
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