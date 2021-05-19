import CategoryNavigator from '../../categorynavigator/CategoryNavigator.js';
import AboutUs from '../../aboutus/src/AboutUs.js';

export default class ProductCategory extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
    }

    HTML() {
        this.shadowRoot.innerHTML = `
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
}

if (!window.customElements.get('product-category')) {
    window.customElements.define('product-category', ProductCategory)
}