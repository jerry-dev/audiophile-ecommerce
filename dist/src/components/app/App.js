import store from '../../lib/store/index.js';
import router from '../../lib/router/index.js';
import styleSheet from './app.css' assert { type: 'css' };
import AppHeader from '../appheader/AppHeader.js';
import HomeView from '../homeview/HomeView.js';
import ProductCategoryView from '../productcategoryview/ProductCategoryView.js';
import ProductDetailView from '../productdetailview/ProductDetailView.js';
import CheckoutView from '../checkoutview/CheckoutView.js';
import AppFooter from '../appfooter/AppFooter.js';

export default class App extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.storeInit();
        this.render();
        this.routerInit();
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const appHeader = document.createElement('app-header');

        const routerOutput = document.createElement('output');
        routerOutput.id = `routerOutput`;

        const appFooter = document.createElement('app-footer');

        this.shadowRoot.appendChild(appHeader);
        this.shadowRoot.appendChild(routerOutput);
        this.shadowRoot.appendChild(appFooter);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }

    routerInit() {
        this.routerOutput = this.shadowRoot.querySelector("#routerOutput");

        router
            .on({
                '/': {
                    as: 'home',
                    uses: () => this.routerOutput.appendChild(document.createElement('home-view')),
                    hooks: {
                        before: (done) => {
                            this.beforeNewViewRenderedOperations();
                            done();
                        }
                    }
                },
                '/headphones': {
                    as: 'headphones',
                    uses: () => {
                        const productCategoryView = document.createElement('product-category-view');
                        productCategoryView.setAttribute('category', "headphones");
                        this.routerOutput.appendChild(productCategoryView);
                    },
                    hooks: {
                        before: (done) => {
                            this.beforeNewViewRenderedOperations();
                            done();
                        }
                    }
                },
                '/speakers': {
                    as: 'speakers',
                    uses: () => {
                        const productCategoryView = document.createElement('product-category-view');
                        productCategoryView.setAttribute('category', "speakers");
                        this.routerOutput.appendChild(productCategoryView);
                    },
                    hooks: {
                        before: (done) => {
                            this.beforeNewViewRenderedOperations();
                            done();
                        }
                    }
                },
                '/earphones': {
                    as: 'earphones',
                    uses: () => {
                        const productCategoryView = document.createElement('product-category-view');
                        productCategoryView.setAttribute('category', "earphones");
                        this.routerOutput.appendChild(productCategoryView);
                    },
                    hooks: {
                        before: (done) => {
                            this.beforeNewViewRenderedOperations();
                            done();
                        }
                    }
                },
                '/headphones/:product': {
                    uses: ({data}) => {
                        if (!router.lastResolved()) {
                            this.beforeNewViewRenderedOperations();
                        }
                        const productDetailView = document.createElement('product-detail-view');
                        productDetailView.setAttribute('product', `${data.product}`);
                        this.routerOutput.appendChild(productDetailView);
                    },
                    hooks: {
                        before: (done) => {
                            this.beforeNewViewRenderedOperations();
                            done();
                        }
                    }
                },
                '/speakers/:product': {
                    uses: ({data}) => {
                        if (!router.lastResolved()) {
                            this.beforeNewViewRenderedOperations();
                        }
                        const productDetailView = document.createElement('product-detail-view');
                        productDetailView.setAttribute('product', `${data.product}`);
                        this.routerOutput.appendChild(productDetailView);
                    },
                    hooks: {
                        before: (done) => {
                            this.beforeNewViewRenderedOperations();
                            done();
                        }
                    }
                },
                '/earphones/:product': {
                    uses: ({data}) => {
                        if (!router.lastResolved()) {
                            this.beforeNewViewRenderedOperations();
                        }
                        const productDetailView = document.createElement('product-detail-view');
                        productDetailView.setAttribute('product', `${data.product}`);
                        this.routerOutput.appendChild(productDetailView);
                    },
                    hooks: {
                        before: (done) => {
                            this.beforeNewViewRenderedOperations();
                            done();
                        }
                    }
                },
                '/checkout': {
                    uses: () => this.routerOutput.appendChild(document.createElement('checkout-view')),
                    hooks: {
                        before: (done) => {
                            this.beforeNewViewRenderedOperations();
                            done();
                        }
                    }
                },
            }).resolve();
    }

    storeInit() {
        this.store = store;
        this.store.dispatch('productDataAPIFetch', 'n/a');
    }

    scrollToTop() {
        document.querySelector('body').scrollIntoView({behavior: "smooth"});
    }

    clearRoute(route) {
        route.textContent = ``;
    }

    beforeNewViewRenderedOperations() {
        this.clearRoute(this.routerOutput);
        this.store.dispatch('closeShoppingCart', 'n/a');
        this.scrollToTop();
    }
}

if (!window.customElements.get('audiophile-app')) {
    window.customElements.define('audiophile-app', App)
}