import store from '../../lib/store/index.js';
import AppHeader from '../appheader/AppHeader.js';
import HomeSection from '../homesection/src/HomeSection.js';
import AppFooter from '../appfooter/AppFooter.js';
import ProductCategory from '../productcategory/src/ProductCategory.js';


class AudiophileApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.routerInit();
        this.store = store;
        this.store.observer.subscribe('stateChange', () => { this.pathMap(this) });
        this.store.dispatch('productDataAPIFetch', 'n/a');
    }

    render() {
        this.html();
        this.css();
    }

    html() {
        this.shadowRoot.innerHTML = `
            <app-header></app-header>
            <output id="routerOutput">
            </output>
            <app-footer></app-footer>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                :host {
                    display: block;
                    min-height: 100%;
                    outline: 4px solid gold;
                }
            </style>
        `;
    }

    routerInit() {
        this.routerOutput = this.shadowRoot.querySelector("#routerOutput");
        this.router = new Navigo("/");

        this.router.on('/', () => {
            this.routerOutput.innerHTML = `<home-section></home-section>`
        });

        this.router.on('/headphones', () => {
            this.routerOutput.innerHTML = `<product-category category="headphones"></product-category>`
        });

        this.router.on('/speakers', () => {
            this.routerOutput.innerHTML = `<product-category category="speakers"></product-category>`
        });

        this.router.on('/earphones', () => {
            this.routerOutput.innerHTML = `<product-category category="earphones"></product-category>`
        });

        this.router.resolve();
    }

    pathMap(context) {
        let path = context.store.state.path;
        switch (path) {
            case '/': context.router.navigate("/");
                break;
            case '/headphones': context.router.navigate("/headphones");
                break;
            case '/speakers': context.router.navigate("/speakers");
                break;
            case '/earphones': context.router.navigate("/earphones");
                break;
        }
    }
}

if (!window.customElements.get('audiophile-app')) {
    window.customElements.define('audiophile-app', AudiophileApp)
}