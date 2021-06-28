import store from '../../../lib/store/index.js';
import Navigo from '../../../lib/router/es/index.js';
import AppHeader from '../../appheader/src/AppHeader.js';
import AppFooter from '../../appfooter/src/AppFooter.js';

class AudiophileApp extends HTMLElement {
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
        this.SCRIPTS();
    }

    HTML() {
        this.shadowRoot.innerHTML =
            `<app-header backgroundColor="on"></app-header>
            <output id="routerOutput">
            </output>
            <app-footer></app-footer>`;
    }

    CSS() {
        this.shadowRoot.innerHTML +=
            `<style>
                :host {
                    background-color: var(--white-1);
                    display: block;
                    min-height: 100%;
                }
            </style>`;
    }

    routerInit() {
        this.routerOutput = this.shadowRoot.querySelector("#routerOutput");
        this.router = new Navigo("/", { hash: true });

        this.router.on('/', async () => {
            await import('../../homesection/src/HomeSection.js');
            this.routerOutput.innerHTML = `<home-section></home-section>`;
            this.scrollToTop();
            this.closeShoppingCart();
        });

        this.router.on('headphones', async () => {
            await import('../../productcategory/src/ProductCategory.js');
            this.routerOutput.innerHTML = `<product-category category="headphones"></product-category>`;
            this.scrollToTop();
            this.closeShoppingCart();
        });

        this.router.on('speakers', async () => {
            await import('../../productcategory/src/ProductCategory.js');
            this.routerOutput.innerHTML = `<product-category category="speakers"></product-category>`;
            this.scrollToTop();
            this.closeShoppingCart();
        });

        this.router.on('earphones', async () => {
            await import('../../productcategory/src/ProductCategory.js');
            this.routerOutput.innerHTML = `<product-category category="earphones"></product-category>`;
            this.scrollToTop();
            this.closeShoppingCart();
        });

        this.router.on('headphones/:product', async ({data}) => {
            await import('../../productdetail/src/ProductDetail.js');
            this.routerOutput.innerHTML = `<product-detail product="${data.product}"></product-detail>`;
            this.scrollToTop();
            this.closeShoppingCart();
        });

        this.router.on('speakers/:product', async ({data}) => {
            await import('../../productdetail/src/ProductDetail.js');
            this.routerOutput.innerHTML = `<product-detail product="${data.product}"></product-detail>`;
            this.scrollToTop();
            this.closeShoppingCart();
        });

        this.router.on('earphones/:product', async ({data}) => {
            await import('../../productdetail/src/ProductDetail.js');
            this.routerOutput.innerHTML = `<product-detail product="${data.product}"></product-detail>`;
            this.scrollToTop();
            this.closeShoppingCart();
        });

        this.router.on('checkout', async () => {
            await import('../../checkoutdetails/src/CheckoutDetails.js');
            this.routerOutput.innerHTML = `<checkout-details></checkout-details>`;
            this.scrollToTop();
            this.closeShoppingCart();
        });

        this.router.resolve();
    }

    storeInit() {
        this.store = store;
        this.store.observer.subscribe('stateChange', () => this.pathMap(this));
        this.store.dispatch('productDataAPIFetch', 'n/a');
    }

    pathMap(context) {
        const path = context.store.state.path;

        const navigateOptions = {
            title: document.title,
            historyAPIMethod: 'replaceState',
            updateBrowserURL: true,
            updateState: true,
            force: false
        };

        switch (path) {
            case '/': context.router.navigate("/", navigateOptions); break;
            case 'checkout': context.router.navigate("checkout", navigateOptions);
            break;
        }

        const headphonesRegex = new RegExp(`/headphones`);
        const speakersRegex = new RegExp(`/speakers`);
        const earphonesRegex = new RegExp(`/earphones`);
        
        if (headphonesRegex.test(path)) {
            const param = path.replace(headphonesRegex, "");
            switch (path) {
                case '/headphones': context.router.navigate("/headphones", navigateOptions); break;
                case `/headphones${param}`: context.router.navigate(`/headphones${param}`, navigateOptions); break;
            }
        }

        if (speakersRegex.test(path)) {
            const param = path.replace(speakersRegex, "");
            switch (path) {
                case '/speakers': context.router.navigate("/speakers", navigateOptions); break;
                case `/speakers${param}`: context.router.navigate(`/speakers${param}`, navigateOptions); break;
            }
        }

        if (earphonesRegex.test(path)) {
            const param = path.replace(earphonesRegex, "");
            switch (path) {
                case '/earphones': context.router.navigate("/earphones", navigateOptions); break;
                case `/earphones${param}`: context.router.navigate(`/earphones${param}`, navigateOptions); break;
            }
        }
    }

    scrollToTop() {
        document.querySelector('body').scrollIntoView({behavior: "smooth"});
    }

    closeShoppingCart() {
        const shoppingCartOverlay = this.shadowRoot.querySelector('app-header')
            .shadowRoot.querySelector('#shoppingCartOverlay');

        if (shoppingCartOverlay.classList.contains('visible')) {
            shoppingCartOverlay.classList.remove('visible');
        }
    }

    SCRIPTS() {
        this.linksManager();
    }

    linksManager() {
        this.shadowRoot.addEventListener('click', (event) => {
            event.preventDefault();
            const path = event.composedPath()[0].getAttribute('data-path');
            (path) ? this.store.dispatch('navigate', path) : "";
            if (event.composedPath()[0].className === `linkContainer`) {
                this.store.dispatch('navigate', `/${event.composedPath()[0].getAttribute('href')}`);
            }
        });
    }
}

if (!window.customElements.get('audiophile-app')) {
    window.customElements.define('audiophile-app', AudiophileApp)
}