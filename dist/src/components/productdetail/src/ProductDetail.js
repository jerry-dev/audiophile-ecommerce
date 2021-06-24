import store from '../../../lib/store/index.js';
import CategoryListing from '../../categorylisting/src/CategoryListing.js';
import ProductDescription from '../../productdescription/src/ProductDescription.js';
import LifestyleGallery from '../../lifestylegallery/src/LifestyleGallery.js';
import RecommendedProducts from '../../recommendedproducts/src/RecommendedProducts.js';
import CategoryNavigator from '../../categorynavigator/src/CategoryNavigator.js';
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
        this.CSS();
        this.observerLinkClicks();
    }

    HTML() {
        const product = this.getListingDataFromStore(this.getAttribute('product'));
        const list = this.renderItemsList(product.includes);
        const features = product.features.replace(/[\n\r]+/g, "</br></br>");
        const recommendedProductsData = this.getRecommendedProductsData(product.id);

        let markup =
            `<div id="goBackLinkWrapper"><a id="goBack" href="/${product.category}">Go Back</a></div>
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
                product-1-path="/${recommendedProductsData[0].category}/${recommendedProductsData[0].slug}"
                product-2="${recommendedProductsData[1].name}"
                slug-2="${recommendedProductsData[1].slug}"
                product-2-desktopImage="../src/assets/shared/desktop/image-${recommendedProductsData[1].slug}.jpg"
                product-2-tabletImage="../src/assets/shared/tablet/image-${recommendedProductsData[1].slug}.jpg"
                product-2-mobileImage="../src/assets/shared/mobile/image-${recommendedProductsData[1].slug}.jpg"
                product-2-path="/${recommendedProductsData[1].category}/${recommendedProductsData[1].slug}"
                product-3="${recommendedProductsData[2].name}"
                slug-3="${recommendedProductsData[2].slug}"
                product-3-desktopImage="../src/assets/shared/desktop/image-${recommendedProductsData[2].slug}.jpg"
                product-3-tabletImage="../src/assets/shared/tablet/image-${recommendedProductsData[2].slug}.jpg"
                product-3-mobileImage="../src/assets/shared/mobile/image-${recommendedProductsData[2].slug}.jpg"
                product-3-path="/${recommendedProductsData[2].category}/${recommendedProductsData[2].slug}"
            ></recommended-products>
            <category-navigator></category-navigator>
            <about-us></about-us>`;

        this.shadowRoot.innerHTML = markup;
    }

    CSS() {
        let markup =
            `<style>
                :host {
                    display: block;
                    padding-top: 4.9375rem;
                }

                #goBackLinkWrapper {
                    margin-left: auto;
                    margin-right: auto;
                    width: 77.083%;
                }

                #goBack {
                    color: var(--black-2);
                    font-size: 0.9375rem;
                    line-height: 1.5625rem;
                    text-decoration: none;
                    opacity: 0.5;
                }

                @media screen and (max-width: 768px) {
                    :host {
                        padding-top: 2.0625rem;
                    }

                    #goBackLinkWrapper {
                        width: 89.8437%;
                    }
                }

                @media screen and (max-width: 576px) {
                    :host {
                        padding-top: 1rem;
                    }

                    #goBackLinkWrapper {
                        width: 87.2%;
                    }
                }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
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
            recommendedProducts[y].name = recommendedProducts[y].name.replace(" Earphones", "");
            recommendedProducts[y].name = recommendedProducts[y].name.replace(" Wireless", "");
        }

        return recommendedProducts;
    }

    observerLinkClicks() {
        this.shadowRoot.addEventListener('click', (event) => {
            event.preventDefault();
            (event.composedPath()[0].id === 'decrementButton') ? this.decrementInputQuantityValue() : "";
            (event.composedPath()[0].id === 'incrementButton') ? this.incrementInputQuantityValue() : "";
            (event.composedPath()[0].id === 'addToCartButton') ? this.addToCart() : "";
            (event.composedPath()[0].innerText === 'SEE PRODUCT') ? this.store.dispatch('navigate', event.composedPath()[0].getAttribute('href')) : "";
            (event.composedPath()[0].id === 'goBack') ? this.store.dispatch('navigate', event.composedPath()[0].getAttribute('href')) : "";
        });
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
            const productName = this.getListingDataFromStore(this.getAttribute('product')).name;
            const productPrice = this.getListingDataFromStore(this.getAttribute('product')).price;
            const productImage = this.getListingDataFromStore(this.getAttribute('product')).image.mobile;

            const cartItem = {
                id: productId,
                quantity: Number(input.getAttribute('value')),
                name: productName,
                image: productImage,
                price: productPrice,
            }

            this.store.dispatch('addToCart', cartItem);
            this.clearInput();
            
        } else {
            console.log(`Too much or too little`);
        }
    }
}

if (!window.customElements.get('product-detail')) {
    window.customElements.define('product-detail', ProductDetail)
}