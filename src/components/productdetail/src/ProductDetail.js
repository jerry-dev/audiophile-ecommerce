import store from '../../../lib/store/index.js';
import CategoryListing from '../../categorylisting/src/CategoryListing.js';
import ProductDescription from '../../productdescription/src/ProductDescription.js';
import LifestyleGallery from '../../lifestylegallery/src/LifestyleGallery.js';
import RecommendedProducts from '../../recommendedproducts/src/RecommendedProducts.js';
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
        this.observerLinkClicks();
    }

    HTML() {
        const product = this.getListingDataFromStore(this.getAttribute('product'));
        const list = this.renderItemsList(product.includes);
        const features = product.features.replace(/[\n\r]+/g, "</br></br>");
        const recommendedProductsData = this.getRecommendedProductsData(product.id);

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
            <lifestyle-gallery
                product="${product.name}"
                desktopImage1="../src/${product.gallery.first.desktop}"
                tabletImage1="../src/${product.gallery.first.tablet}"
                mobileImage1="../src/${product.gallery.first.mobile}"
                desktopImage2="../src/${product.gallery.second.desktop}"
                tabletImage2="../src/${product.gallery.second.tablet}"
                mobileImage2="../src/${product.gallery.second.mobile}"
                desktopImage3="../src/${product.gallery.third.desktop}"
                tabletImage3="../src/${product.gallery.third.tablet}"
                mobileImage3="../src/${product.gallery.third.mobile}"
            ></lifestyle-gallery>
            <recommended-products
                product-1="${recommendedProductsData[0].name}"
                slug-1="${recommendedProductsData[0].slug}"
                product-1-desktopImage="../src/assets/shared/desktop/image-${recommendedProductsData[0].slug}.jpg"
                product-1-tabletImage="../src/assets/shared/tablet/image-${recommendedProductsData[0].slug}.jpg"
                product-1-mobileImage="../src/assets/shared/mobile/image-${recommendedProductsData[0].slug}.jpg"
                product-2="${recommendedProductsData[1].name}"
                slug-2="${recommendedProductsData[1].slug}"
                product-2-desktopImage="../src/assets/shared/desktop/image-${recommendedProductsData[1].slug}.jpg"
                product-2-tabletImage="../src/assets/shared/tablet/image-${recommendedProductsData[1].slug}.jpg"
                product-2-mobileImage="../src/assets/shared/mobile/image-${recommendedProductsData[1].slug}.jpg"
                product-3="${recommendedProductsData[2].name}"
                slug-3="${recommendedProductsData[2].slug}"
                product-3-desktopImage="../src/assets/shared/desktop/image-${recommendedProductsData[2].slug}.jpg"
                product-3-tabletImage="../src/assets/shared/tablet/image-${recommendedProductsData[2].slug}.jpg"
                product-3-mobileImage="../src/assets/shared/mobile/image-${recommendedProductsData[2].slug}.jpg"
            ></recommended-products>
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

    getRecommendedProductsData(skipThisID) {
        let recommendedProducts = [];
        const max = this.store.state.productData.length;

        while (recommendedProducts.length < 3) {
            let productId = Math.floor(Math.random() * max);
            if (skipThisID !== productId) {
                
                for (let i = 0; i < this.store.state.productData.length; i++) {
                    if (this.store.state.productData[i].id === productId) {
                        let itemPresent = false;
                        for (let j = 0; j < recommendedProducts.length; j++) {
                            if (this.store.state.productData[i].id === recommendedProducts[j].id) {
                                itemPresent = true;
                            }
                        }
                        if (!itemPresent) {
                            recommendedProducts[recommendedProducts.length] = this.store.state.productData[i];
                        }
                    }
                }
            }
        }

        for (let y = 0; y < recommendedProducts.length; y++) {
            recommendedProducts[y].name = recommendedProducts[y].name.replace(" Headphones", "");
            recommendedProducts[y].name = recommendedProducts[y].name.replace(" Earphones", " Earphone");
            recommendedProducts[y].name = recommendedProducts[y].name.replace(" Wireless", "");
        }

        return recommendedProducts;
    }

    observerLinkClicks() {
        const listing = this.shadowRoot.querySelector('category-listing');

        listing.shadowRoot.addEventListener('click', (event) => {
            (event.target.tagName === 'BUTTON') ? this.buttonHandler(event.target.id) : "";
        });
    }

    buttonHandler(id) {
        switch (id) {
            case 'decrementButton': this.decrementInputQuantityValue(); break;
            case 'incrementButton': this.incrementInputQuantityValue(); break;
            case 'addToCartButton': this.addToCart(); break;
            default: ""; break;
        }
    }

    decrementInputQuantityValue() {
        const input = this.shadowRoot.querySelector('category-listing').shadowRoot
            .querySelector('#controlsContainer > input');

        if (Number(input.getAttribute('value')) > 1) {
            input.setAttribute('value', Number(input.getAttribute('value')) - 1);
        }
    }

    incrementInputQuantityValue() {
        const input = this.shadowRoot.querySelector('category-listing').shadowRoot
            .querySelector('#controlsContainer > input');

        if (Number(input.getAttribute('value')) < 10) {
            input.setAttribute('value', Number(input.getAttribute('value')) + 1);
        }
    }

    clearInput() {
        const input = this.shadowRoot.querySelector('category-listing').shadowRoot
            .querySelector('#controlsContainer > input');

        input.setAttribute('value', 1);
    }

    addToCart() {
        const input = this.shadowRoot.querySelector('category-listing').shadowRoot
            .querySelector('#controlsContainer > input');

        if (Number(input.getAttribute('value')) >= 1 && Number(input.getAttribute('value')) <= 10) {
            const productId = this.getListingDataFromStore(this.getAttribute('product')).id;
            this.store.dispatch('addToCart', {id: productId, quantity: Number(input.getAttribute('value'))});
            this.clearInput();
            
        } else {
            console.log(`Too much or too little`);
        }
    }
}

if (!window.customElements.get('product-detail')) {
    window.customElements.define('product-detail', ProductDetail)
}