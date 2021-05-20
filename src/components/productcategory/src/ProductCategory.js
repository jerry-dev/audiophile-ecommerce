import CategoryNavigator from '../../categorynavigator/CategoryNavigator.js';
import AboutUs from '../../aboutus/src/AboutUs.js';
import ProductCategoryHeader from '../../productcategoryheader/src/ProductCategoryHeader.js';
import store from '../../../lib/store/index.js';

export default class ProductCategory extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.store = store;
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        this.shadowRoot.innerHTML = `
            <product-category-header
                category="${this.getAttribute('category')}"
            ></product-category-header>
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

    SCRIPTS() {
        let dataContainer = this.categoryHydration(this.getAttribute('category'));
    }

    categoryHydration(category) {
        let result = this.store.state.productData.filter((product) => {
            return (product.category === category) ? true : false;
        });

        return result;
    }
}

if (!window.customElements.get('product-category')) {
    window.customElements.define('product-category', ProductCategory)
}