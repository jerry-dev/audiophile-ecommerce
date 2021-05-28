import store from '../../lib/store/index.js';
import AppHeader from '../appheader/AppHeader.js';
import AppFooter from '../appfooter/AppFooter.js';

class AudiophileApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.routerInit();
        this.store = store;
        this.store.observer.subscribe('stateChange', () => this.pathMap(this));
        this.store.dispatch('productDataAPIFetch', 'n/a');
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        this.shadowRoot.innerHTML = `
            <app-header></app-header>
            <output id="routerOutput">
            </output>
            <app-footer></app-footer>
        `;
    }

    CSS() {
        this.shadowRoot.innerHTML += `
            <style>
                :host {
                    background-color: var(--white-1);
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

        this.router.on('/', async () => {
            await import('../homesection/src/HomeSection.js');
            this.routerOutput.innerHTML = `<home-section></home-section>`;

            // DELETE
            // setTimeout(() => {this.router.navigate("/headphones/xx99-mark-two-headphones")}, 200);

        });

        this.router.on('/headphones', async () => {
            await import('../productcategory/src/ProductCategory.js');
            this.routerOutput.innerHTML = `<product-category category="headphones"></product-category>`;
            setTimeout(() => {this.router.navigate("/headphones")}, 200);
        });

        this.router.on('/speakers', async () => {
            await import('../productcategory/src/ProductCategory.js');
            this.routerOutput.innerHTML = `<product-category category="speakers"></product-category>`;
        });

        this.router.on('/earphones', async () => {
            await import('../productcategory/src/ProductCategory.js');
            this.routerOutput.innerHTML = `<product-category category="earphones"></product-category>`;
        });

        this.router.on('/headphones/:product', async ({data}) => {
            await import('../productdetail/src/ProductDetail.js');
            this.routerOutput.innerHTML = `<product-detail product="${data.product}"></product-detail>`;
        });

        this.router.on('/speakers/:product', async ({data}) => {
            await import('../productdetail/src/ProductDetail.js');
            this.routerOutput.innerHTML = `<product-detail product="${data.product}"></product-detail>`;
        });

        this.router.on('/earphones/:product', async ({data}) => {
            await import('../productdetail/src/ProductDetail.js');
            this.routerOutput.innerHTML = `<product-detail product="${data.product}"></product-detail>`;
        });

        this.router.resolve();
    }

    pathMap(context) {
        const path = context.store.state.path;

        switch (path) {
            case '/': context.router.navigate("/");
                break;
        }

        const headphonesRegex = new RegExp(`/headphones`);
        const speakersRegex = new RegExp(`/speakers`);
        const earphonesRegex = new RegExp(`/earphones`);
        
        if (headphonesRegex.test(path)) {
            const param = path.replace(headphonesRegex, "");
            switch (path) {
                case '/headphones': context.router.navigate("/headphones");
                    break;
                case `/headphones${param}`: context.router.navigate(`/headphones${param}`);
                    break;
            }
        }

        if (speakersRegex.test(path)) {
            const param = path.replace(speakersRegex, "");
            switch (path) {
                case '/speakers': context.router.navigate("/speakers");
                    break;
                case `/speakers${param}`: context.router.navigate(`/speakers${param}`);
                    break;
            }
        }

        if (earphonesRegex.test(path)) {
            const param = path.replace(earphonesRegex, "");
            switch (path) {
                case '/earphones': context.router.navigate("/earphones");
                    break;
                case `/earphones${param}`: context.router.navigate(`/earphones${param}`);
                    break;
            }
        }
    }
}

if (!window.customElements.get('audiophile-app')) {
    window.customElements.define('audiophile-app', AudiophileApp)
}