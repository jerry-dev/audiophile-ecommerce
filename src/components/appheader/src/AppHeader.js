import designSystemImport from '../../../lib/designSystem.js';
import CategoryNavigator from '../../categorynavigator/src/CategoryNavigator.js';
import store from '../../../lib/store/index.js';

export default class AppHeader extends HTMLElement {
    static get observedAttributes() {
        return [ 'backgroundColor' ];
    }

    constructor() {
        super();
        self = this;
        this.attachShadow({mode: 'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (newValue !== oldValue) {
			this[attrName] = this.hasAttribute(attrName);
		}

        this.attributeSync(attrName);
    }

    connectedCallback() {
        this.store = store;
        this.store.observer.subscribe('stateChange', () => {
            self.backgroundColorAdjust();
            self.closeNavInstantly();
            self.counterManager();
        });
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
        this.importedCSS();
        this.tabletCSS();
        this.mobileCSS();
        this.SCRIPTS();
    }

    HTML() {
        const markup =
            `<div id="header-inner-container">
                <button id="hamburger">
                    <img alt="hamburger menu icon" id="hamburgerIcon" src="../src/assets/shared/tablet/icon-hamburger.svg"/>
                </button>
                <a id="companyLogoContainer" href="/">
                    <img id="companyLogo" alt="company logo" src="../src/assets/shared/desktop/logo.svg"/>
                </a>
                <nav>
                    <ul>
                        <li class="subtitle-design-system"><a href="/">HOME</a></li>
                        <li class="subtitle-design-system"><a href="/headphones">HEADPHONES</a></li>
                        <li class="subtitle-design-system"><a href="/speakers">SPEAKERS</a></li>
                        <li class="subtitle-design-system"><a href="/earphones">EARPHONES</a></li>
                    </ul>
                </nav>
                <button id="cartIconWrapper">
                    <span id="itemsCount" class="empty"></span>
                    <img id="cartIcon" alt="shopping cart icon" src="../src/assets/shared/desktop/icon-cart.svg"/>
                </button>
                <div id="shoppingCartOverlay">
                    <div id="shoppingCartOverlayInnerContainer">
                        <shopping-cart></shopping-cart>
                    </div>
                </div>
                <div id="navigationMenu">
                    <category-navigator></category-navigator>
                </div>
            </div>`;

        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
            `<style>
                *, *::before, *::after {padding:0; margin:0;}

                button#cartIconWrapper {
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                button > * {
                    pointer-events: none;
                }

                :host {
                    align-items: center;
                    background-color: var(--black-1);
                    display: flex;
                    height: 6rem;
                    position: relative;
                }

                #header-inner-container {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    height: 1.75rem;
                    margin-right: auto;
                    margin-left: auto;
                    width: 77.083%;
                }

                #header-inner-container::after {
                    background-color: var(--white-1-opaque-1);
                    content: "";
                    height: 0.0625rem;
                    position: absolute;
                    top: 6.25rem;
                    max-width: 69.375rem;
                    width: 77.083%;
                }

                #hamburger {
                    background-color: var(--black-1);
                    border: none;
                    display: none;
                }

                #companyLogoContainer > * {
                    pointer-events: none;
                }

                #companyLogo {
                    height: 1.5625rem;
                    width: 8.9375rem;
                }

                nav {
                    margin-left: auto;
                    margin-right: auto;
                    width: 26.8125rem;
                }

                ul {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 100%;
                }

                li {
                    letter-spacing: 0.125rem;
                    list-style: none;
                }

                li > a {
                    color: var(--white-1);
                    text-decoration: none;
                }

                ul > li > a:hover {
                    color: var(--brown-2);
                }

                #cartIconWrapper {
                    background: none;
                    border: none;
                    margin-left: auto;
                }

                #cartIcon {
                    height: 1.25rem;
                    width: 1.458125rem;
                }

                #itemsCount {
                    align-items: center;
                    background-color: var(--brown-2);
                    border-radius: 50%;
                    color: var(--white-1);
                    display: flex;
                    font-weight: bold;
                    height: 20px;
                    justify-content: center;
                    margin-top: -18px;
                    margin-left: 5px;
                    width: 20px;
                    animation-duration: 1s;
                    animation-iteration-count: 1;
                    animation-name: dropIn;
                    animation-timing-function: ease;
                    z-index: 999;
                }

                #itemsCount.empty {
                    display: none;
                }

                @keyframes dropIn {
                    0% {
                        transform: translateY(-200px);
                    } 100% {
                        transform: translateY(0px);
                    }
                }

                #navigationMenu,
                #shoppingCartOverlay {
                    background-color: rgba(0, 0, 0, 0.4);
                    display: none;
                    height: 100%;
                    position: fixed;
                    left: 0;
                    right: 0;
                    top: 6rem;
                    width: 100%;
                    z-index: 888;
                    overflow: auto;
                }

                #shoppingCartOverlayInnerContainer {
                    display: block;
                    height: 100%;
                    margin-left: auto;
                    margin-right: auto;
                    width: 77.08333%;
                    padding-bottom: 10rem;
                }

                #shoppingCartOverlay.visible {
                    display: block;
                }

                shopping-cart {
                    margin-left: auto;
                    margin-top: 2rem;
                }

                :host([backgroundColor="none"]) {
                    background: none;
                }

                #companyLogoContainer,
                nav li,
                #cartIconWrapper {
                    animation-duration: 1s;
                    animation-iteration-count: 1;
                    animation-name: fadeIntoView;
                    animation-timing-function: ease-out;
                }

                #header-inner-container::after {
                    animation-duration: 1s;
                    animation-iteration-count: 1;
                    animation-name: scaleToView;
                    animation-timing-function: linear;
                }

                @keyframes fadeIntoView {
                    0% {
                        opacity: 0;
                        transform: translateY(-200px);
                    } 100% {
                        opacity: 1;
                        transform: translateY(0px);
                    }
                }

                @keyframes scaleToView {
                    0% {
                        background-color: var(--brown-2);
                        transform: scaleX(0);
                    } 100% {
                        background-color: var(--white-1-opaque-1);
                        transform: scaleX(1);
                    }
                }

                .slideOutOfView {
                    animation-duration: 0.35s;
                    animation-iteration-count: 1;
                    animation-name: slideOutOfView;
                    animation-timing-function: ease;
                    animation-fill-mode: forwards;
                }

                @keyframes slideOutOfView {
                    0% {
                        transform: translateX(0px);
                    } 100% {
                        transform: translateX(-800px);
                        display: none;
                    }
                }

                .slideIntoView {
                    animation-duration: 0.35s;
                    animation-iteration-count: 1;
                    animation-name: slideIntoView;
                    animation-timing-function: ease-out;
                    animation-fill-mode: forwards;
                }

                @keyframes slideIntoView {
                    0% {
                        transform: translateX(-800px);
                        display: block;
                    } 100% {
                        transform: translateX(0px);
                    }
                }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    tabletCSS() {
        const markup =
            `<style>
                @media screen and (max-width: 834px) {
                    nav {
                        display: none;
                    }

                    #hamburger {
                        display: block;
                        margin-right: 2.625rem;
                    }

                    #header-inner-container {
                        width: 89.713%;
                    }
                    
                    :host(.showingNav) #navigationMenu {
                        display: block;
                    }

                    :host([backgroundColor="none"]) {
                        background: none;
                    }
                }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    mobileCSS() {
        const markup =
            `<style>
                @media screen and (max-width: 576px) {
                    #hamburger {
                        display: block;
                        margin-right: 0;
                    }

                    #header-inner-container {
                        width: 87.2%;
                    }

                    #companyLogoContainer {
                        margin-left: auto;
                    }

                    :host(.showingNav) #navigationMenu {
                        display: block;
                    }

                    #shoppingCartOverlayInnerContainer {
                        width: 87.2%;
                    }
                }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    importedCSS() {
        this.shadowRoot.innerHTML += designSystemImport();
    }

    SCRIPTS() {
        this.observerLinkClicks();
    }

    isShowingNav() {
        return (this.classList.contains('showingNav')) ? true : false;
    }

    isShowingShoppingCart() {
        return (this.shadowRoot.querySelector('#shoppingCartOverlay').classList.contains('visible')) ? true : false;
    }

    isAtCheckout() {
        return (this.store.state.path === `checkout`) ? true: false;
    }

    openNav() {
        if (!this.isShowingNav() && !this.isAtCheckout()) {
            if (this.isShowingShoppingCart()) {
                this.closeShoppingCart();
            }
            this.shadowRoot.querySelector('#navigationMenu').classList.add('slideIntoView');
            this.classList.add('showingNav');
            document.querySelector('body').classList.add('lock');
            setTimeout(() => {
                this.shadowRoot.querySelector('#navigationMenu').classList.remove('slideIntoView');
            }, 500);
        }
    }

    async openShoppingCart() {
        if (!this.isShowingShoppingCart() && !this.isAtCheckout()) {
            if (this.isShowingNav()) {
                this.closeNavInstantly();
            }

            document.querySelector('body').classList.add('lock');
            this.shadowRoot.querySelector('#shoppingCartOverlay').classList.add('visible');
            return (await import('../../shoppingcart/src/ShoppingCart.js')).default;
        }
    }

    closeNav() {
        if (this.classList.contains('showingNav')) {
            this.shadowRoot.querySelector('#navigationMenu').classList.add('slideOutOfView');
            document.querySelector('body').classList.remove('lock');
            setTimeout(() => {
                this.classList.remove('showingNav');
                this.shadowRoot.querySelector('#navigationMenu').classList.remove('slideOutOfView');
            }, 500);
        }
    }

    closeNavInstantly() {
        document.querySelector('body').classList.remove('lock');
        this.classList.remove('showingNav');
    }

    closeShoppingCart() {
        document.querySelector('body').classList.remove('lock');
        this.shadowRoot.querySelector('#shoppingCartOverlay').classList.remove('visible');
    }

    counterManager() {
        let count = this.store.state.cartCalculations.numberOfDistinctItems;

        if (count > 0) {
            this.shadowRoot.querySelector('#itemsCount').textContent = count;
            this.shadowRoot.querySelector('#itemsCount').classList.remove('empty');
        } else {
            this.shadowRoot.querySelector('#itemsCount').textContent = "";
            this.shadowRoot.querySelector('#itemsCount').classList.add('empty');
        }
    }

    overlayClicked(event) {
        return (event.target.id === `navigationMenu` || event.target.id === 'shoppingCartOverlayInnerContainer') ? true : false;
    }

    observerLinkClicks() {
        this.shadowRoot.addEventListener('click', (event) => {
            if (event.target.id === 'cartIconWrapper') {
                (!this.isShowingShoppingCart()) ? this.openShoppingCart() : this.closeShoppingCart();
            }

            if (event.target.id === 'companyLogoContainer') {
                event.preventDefault();
                this.store.dispatch('navigate', "/");
            }
 
            if (event.target.tagName === 'A') {
                event.preventDefault();
                this.store.dispatch('navigate', event.target.pathname);
            }

            if (this.overlayClicked(event)) {
                if (this.isShowingShoppingCart()) {
                    this.closeShoppingCart();
                }

                if (this.isShowingNav()) {
                    this.closeNav();
                }
            }

            window.addEventListener(`keydown`, (event) => {
                if (event.key === `Escape`) {
                    if (this.isShowingShoppingCart()) {
                        this.closeShoppingCart();
                    }

                    if (this.isShowingNav()) {
                        this.closeNav();
                    }
                }
           });
            
            if (event.target.id === 'hamburger') {
                (!this.isShowingNav()) ? this.openNav() : this.closeNav();

                if (this.isShowingNav()) {
                    window.addEventListener(`resize`, () => {
                        if (window.innerWidth > 768) {
                            this.closeNav();
                        }
                    });
                }
            }
        });
    }

    buttonHandler(id) {
        switch (id) {
            case 'decrementButton': this.decrementInputQuantityValue(); break;
            case 'incrementButton': this.incrementInputQuantityValue(); break;
            case 'addToCartButton': this.addToCart(); break;
            default: ""; break;
        }
    }

    decrementInputQuantityValue() {
        const input = this.shadowRoot.querySelector('category-listing').shadowRoot
            .querySelector('#controlsContainer > input');

        if (Number(input.getAttribute('value')) > 1) {
            input.setAttribute('value', Number(input.getAttribute('value')) - 1);
        }
    }

    incrementInputQuantityValue() {
        const input = this.shadowRoot.querySelector('category-listing').shadowRoot
            .querySelector('#controlsContainer > input');

        if (Number(input.getAttribute('value')) < 10) {
            input.setAttribute('value', Number(input.getAttribute('value')) + 1);
        }
    }

    backgroundColorAdjust() {
        if (this.store.state.path === "/" ) {
            this.setAttribute('backgroundColor', "none");
        } else {
            this.setAttribute('backgroundColor', "on");
        }
    }

    attributeSync(attribute) {
        return {
            backgroundColor: self.backgroundColorAdjust,
        }[attribute]();
    }
}

if (!window.customElements.get('app-header')) {
    window.customElements.define('app-header', AppHeader);
}