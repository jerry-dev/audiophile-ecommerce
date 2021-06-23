import HeroSection from '../../herosection/src/HeroSection.js';
import CategoryNavigator from '../../categorynavigator/CategoryNavigator.js';
import FeaturedProducts from '../../featuredproducts/src/FeaturedProducts.js';
import AboutUs from '../../aboutus/src/AboutUs.js';

export default class HomeSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        this.shadowRoot.innerHTML = `
            <hero-section></hero-section>
            <category-navigator></category-navigator>
            <featured-products></featured-products>
            <about-us></about-us>`;
    }

    CSS() {
        this.shadowRoot.innerHTML += `
            <style>
                :host {
                    display: block;
                }

                hero-section {
                    margin-top: -6.0625rem;
                }
            </style>
        `;
    }
}

if (!window.customElements.get('home-section')) {
    window.customElements.define('home-section', HomeSection)
}