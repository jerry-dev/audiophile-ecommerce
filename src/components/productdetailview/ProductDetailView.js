import store from '../../lib/store/index.js';
import router from '../../lib/router/index.js';
import styleSheet from './productdetailview.css' assert { type: 'css' };
import CategoryListing from '../categorylisting/CategoryListing.js';
import ProductDescription from '../productdescription/ProductDescription.js';
import LifestyleGallery from '../lifestylegallery/LifestyleGallery.js';
import RecommendedProducts from '../recommendedproducts/RecommendedProducts.js';
import CategoryNavigator from '../categorynavigator/CategoryNavigator.js';
import AboutUs from '../aboutus/AboutUs.js';

export default class ProductDetailView extends HTMLElement {
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
        const features = product.features.replace(/[\n\r]+/g, "</br></br>");
        const recommendedProductsData = this.getRecommendedProductsData(product.id);
        const price = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price).replace(".00", "");

        const goBackLinkWrapper = document.createElement('div');
        goBackLinkWrapper.id = `goBackLinkWrapper`;

        const goBackLink = document.createElement('a');
        goBackLink.id = `goBack`;
        goBackLink.href = `#/${product.category}`;
        goBackLink.setAttribute('data-navigo', '');
        goBackLink.textContent = `Go Back`;
        goBackLinkWrapper.appendChild(goBackLink);
        this.shadowRoot.appendChild(goBackLinkWrapper);

        const categoryListing = document.createElement('category-listing');
        categoryListing.setAttribute('desktopImage', `../src/${product.image.desktop}`);
        categoryListing.setAttribute('tabletImage', `../src/${product.image.tablet}`);
        categoryListing.setAttribute('mobileImage', `../src/${product.image.mobile}`);
        categoryListing.setAttribute('new', product.new);
        categoryListing.setAttribute('name', product.name);
        categoryListing.setAttribute('description', product.description);
        categoryListing.setAttribute('slug', product.slug);
        categoryListing.setAttribute('price', price);
        categoryListing.setAttribute('cartReady', 'true');
        this.shadowRoot.appendChild(categoryListing);

        const productDescription = document.createElement('product-description');
        productDescription.setAttribute('features', features);
        const bulletValues = this.renderItemsList(product.includes);
        productDescription.setAttribute('bulletvalues', bulletValues);
        this.shadowRoot.appendChild(productDescription);

        const lifestyleGallery = document.createElement('lifestyle-gallery');
        lifestyleGallery.setAttribute('product', product.name);
        lifestyleGallery.setAttribute('desktopImage1', `../src/${product.gallery.first.desktop}`);
        lifestyleGallery.setAttribute('tabletImage1', `../src/${product.gallery.first.tablet}`);
        lifestyleGallery.setAttribute('mobileImage1', `../src/${product.gallery.first.mobile}`);
        lifestyleGallery.setAttribute('desktopImage2', `../src/${product.gallery.second.desktop}`);
        lifestyleGallery.setAttribute('tabletImage2', `../src/${product.gallery.second.tablet}`);
        lifestyleGallery.setAttribute('mobileImage2', `../src/${product.gallery.second.mobile}`);
        lifestyleGallery.setAttribute('desktopImage3', `../src/${product.gallery.third.desktop}`);
        lifestyleGallery.setAttribute('tabletImage3', `../src/${product.gallery.third.tablet}`);
        lifestyleGallery.setAttribute('mobileImage3', `../src/${product.gallery.third.mobile}`);
        this.shadowRoot.appendChild(lifestyleGallery);

        const recommendedProducts = document.createElement('recommended-products');
        recommendedProducts.setAttribute('product-1', recommendedProductsData[0].name);
        recommendedProducts.setAttribute('slug-1', recommendedProductsData[0].slug);
        recommendedProducts.setAttribute('product-1-desktopImage', `../src/assets/shared/desktop/image-${recommendedProductsData[0].slug}.jpg`);
        recommendedProducts.setAttribute('product-1-tabletImage', `../src/assets/shared/tablet/image-${recommendedProductsData[0].slug}.jpg`);
        recommendedProducts.setAttribute('product-1-mobileImage', `../src/assets/shared/mobile/image-${recommendedProductsData[0].slug}.jpg`);
        recommendedProducts.setAttribute('product-1-path', `#/${recommendedProductsData[0].category}/${recommendedProductsData[0].slug}`);

        recommendedProducts.setAttribute('product-2', recommendedProductsData[1].name);
        recommendedProducts.setAttribute('slug-2', recommendedProductsData[1].slug);
        recommendedProducts.setAttribute('product-2-desktopImage', `../src/assets/shared/desktop/image-${recommendedProductsData[1].slug}.jpg`);
        recommendedProducts.setAttribute('product-2-tabletImage', `../src/assets/shared/tablet/image-${recommendedProductsData[1].slug}.jpg`);
        recommendedProducts.setAttribute('product-2-mobileImage', `../src/assets/shared/mobile/image-${recommendedProductsData[1].slug}.jpg`);
        recommendedProducts.setAttribute('product-2-path', `#/${recommendedProductsData[1].category}/${recommendedProductsData[1].slug}`);

        recommendedProducts.setAttribute('product-3', recommendedProductsData[2].name);
        recommendedProducts.setAttribute('slug-3', recommendedProductsData[2].slug);
        recommendedProducts.setAttribute('product-3-desktopImage', `../src/assets/shared/desktop/image-${recommendedProductsData[2].slug}.jpg`);
        recommendedProducts.setAttribute('product-3-tabletImage', `../src/assets/shared/tablet/image-${recommendedProductsData[2].slug}.jpg`);
        recommendedProducts.setAttribute('product-3-mobileImage', `../src/assets/shared/mobile/image-${recommendedProductsData[2].slug}.jpg`);
        recommendedProducts.setAttribute('product-3-path', `#/${recommendedProductsData[2].category}/${recommendedProductsData[2].slug}`);
        this.shadowRoot.appendChild(recommendedProducts);

        const categoryNavigator = document.createElement('category-navigator');
        this.shadowRoot.appendChild(categoryNavigator);
        const aboutUs = document.createElement('about-us');
        this.shadowRoot.appendChild(aboutUs);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }

    renderItemsList(listArray) {
        let result = [];

        listArray.forEach((listPair) => {
            result[result.length] = { quantity: listPair.quantity, item: listPair.item };        
        });

        return JSON.stringify(result);
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
            (event.composedPath()[0].id === 'decrementButton') ? this.decrementInputQuantityValue() : null;
            (event.composedPath()[0].id === 'incrementButton') ? this.incrementInputQuantityValue() : null;
            (event.composedPath()[0].id === 'addToCartButton') ? this.addToCart() : null;
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

if (!window.customElements.get('product-detail-view')) {
    window.customElements.define('product-detail-view', ProductDetailView)
}