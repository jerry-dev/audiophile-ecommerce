import HeroSection from '../herosection/HeroSection.js';
import CategoryNavigator from '../categorynavigator/CategoryNavigator.js';
import FeaturedProducts from '../featuredproducts/FeaturedProducts.js';
import AboutUs from '../aboutus/AboutUs.js';
import styleSheet from './homeview.css' assert { type: 'css' };

export default class HomeView extends HTMLElement {
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
        this.shadowRoot.appendChild( document.createElement('hero-section') );
        this.shadowRoot.appendChild( document.createElement('category-navigator') );
        this.shadowRoot.appendChild( document.createElement('featured-products') );
        this.shadowRoot.appendChild( document.createElement('about-us') );
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }
}

if (!window.customElements.get('home-view')) {
    window.customElements.define('home-view', HomeView)
}