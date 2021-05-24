import store from '../../../lib/store/index.js';
import ProductCategoryHeader from '../../productcategoryheader/src/ProductCategoryHeader.js';
import CategoryListing from '../../categorylisting/src/CategoryListing.js';
import CategoryNavigator from '../../categorynavigator/CategoryNavigator.js';
import AboutUs from '../../aboutus/src/AboutUs.js';


export default class ProductCategory extends HTMLElement {
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
        const theCategory = this.getAttribute('category');

        this.shadowRoot.innerHTML = `
            <product-category-header category="${theCategory}"></product-category-header>
            ${this.renderCategoryListings(theCategory)}
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
        
        this.store.state.productData.forEach((instance) => {
            if (instance.category === category) {
                
                itemsCount[category]
                let direction = (itemsCount[category] % 2 === 0) ? `right` : `left`;

                listings[itemsCount[category]] =
                `<category-listing
                    groupSize="${groupSize}"
                    item="${itemsCount[category]}"
                    imageOrder=${direction}
                    desktopImage="../src/${instance.image.desktop}"
                    tabletImage="../src/${instance.image.tablet}"
                    mobileImage="../src/${instance.image.mobile}"
                    new="${instance.new}"
                    name="${instance.name}"
                    description="${instance.description}"
                    slug="${instance.slug}"
                ></category-listing>`;

                itemsCount[category]--;
            }
        });
        return listings.join("");
    }
}

if (!window.customElements.get('product-category')) {
    window.customElements.define('product-category', ProductCategory)
}