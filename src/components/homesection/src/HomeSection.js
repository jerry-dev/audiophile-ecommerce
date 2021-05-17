import HeroSection from '../../herosection/src/HeroSection.js';
import CategoryNavigator from '../../categorynavigator/CategoryNavigator.js';
import FeaturedProducts from '../../featuredproducts/src/FeaturedProducts.js';

export default class HomeSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
        this.css();
    }

    html() {
        this.shadowRoot.innerHTML = `
            <hero-section></hero-section>
            <category-navigator></category-navigator>
            <featured-products></featured-products>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                :host {
                    background-color: var(--black-1);
                    display: block;
                }
            </style>
        `;
    }
}

if (!window.customElements.get('home-section')) {
    window.customElements.define('home-section', HomeSection)
}