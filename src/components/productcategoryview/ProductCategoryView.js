import store from '../../lib/store/index.js';
import styleSheet from './productcategoryview.css' assert { type: 'css' };
import ProductCategoryHeader from '../productcategoryheader/ProductCategoryHeader.js';
import CategoryListing from '../categorylisting/CategoryListing.js';
import CategoryNavigator from '../categorynavigator/CategoryNavigator.js';
import AboutUs from '../aboutus/AboutUs.js';


export default class ProductCategoryView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.store = store;
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const productCategoryHeader = document.createElement('product-category-header');
        productCategoryHeader.setAttribute('category', this.getAttribute('category'));

        const categoryNavigator = document.createElement('category-navigator');
        const aboutus = document.createElement('about-us');

        const categoryListingsCollection = this.renderCategoryListings(this.getAttribute('category'));
        
        this.shadowRoot.appendChild(productCategoryHeader);
        categoryListingsCollection.forEach((listing) => {
            this.shadowRoot.appendChild(listing);
        });

        this.shadowRoot.appendChild(categoryNavigator);
        this.shadowRoot.appendChild(aboutus);
    }

    
    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }

    getItemCountPerCategory() {
        let itemsCount = { headphones: 0, speakers: 0, earphones: 0 };

        for (let i = 0; i < this.store.state.productData.length; i++) {
            if (this.store.state.productData[i].category === "headphones") {
                itemsCount.headphones++;
            }

            if (this.store.state.productData[i].category === "speakers") {
                itemsCount.speakers++;
            }

            if (this.store.state.productData[i].category === "earphones") {
                itemsCount.earphones++;
            }
        }

        return itemsCount;
    }

    renderCategoryListings(category) {
        let listings = [];
        let itemsCount = this.getItemCountPerCategory();
        const groupSize = itemsCount[category];

        let count = 0;
        
        this.store.state.productData.forEach((instance) => {
            if (instance.category === category) {
                let direction = (count % 2 === 0) ? `right` : `left`;

                const categoryListing = document.createElement('category-listing');
                categoryListing.setAttribute('category', category);
                categoryListing.setAttribute('groupSize', groupSize);
                categoryListing.setAttribute('item', itemsCount[category]);
                categoryListing.setAttribute('imageOrder', direction);
                categoryListing.setAttribute('desktopImage', `../src/${instance.image.desktop}`);
                categoryListing.setAttribute('tabletImage', `../src/${instance.image.tablet}`);
                categoryListing.setAttribute('mobileImage', `../src/${instance.image.mobile}`);
                categoryListing.setAttribute('new', instance.new);
                categoryListing.setAttribute('name', instance.name);
                categoryListing.setAttribute('description', instance.description);
                categoryListing.setAttribute('slug', instance.slug);
                categoryListing.setAttribute('price', new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(instance.price).replace(".00", ""));
                categoryListing.setAttribute('cartReady', 'false');
                categoryListing.setAttribute('text', 'SEE PRODUCT');

                listings[listings.length] = categoryListing;
                count++;
            }
        });

        return listings;
    }
}

if (!window.customElements.get('product-category-view')) {
    window.customElements.define('product-category-view', ProductCategoryView)
}