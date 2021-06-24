import designSystemImport from '../../lib/designSystem.js';
import CategoryNavigator from '../categorynavigator/CategoryNavigator.js';
import store from '../../lib/store/index.js';

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
            self.closeNav();
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
                    <img id="cartIcon" alt="shopping cart icon" src="../src/assets/shared/desktop/icon-cart.svg"/>
                </button>
                <span id="shoppingCartOverlay">
                    <div id="shoppingCartOverlayInnerContainer">
                        <shopping-cart></shopping-cart>
                    </div>
                </span>
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

                #navigationMenu,
                #shoppingCartOverlay {
                    background-color: rgba(0, 0, 0, 0.4);
                    display: none;
                    height: 100vh;
                    position: absolute;
                    left: 0;
                    top: 96px;
                    width: 100%;
                    z-index: 500;
                }

                #shoppingCartOverlayInnerContainer {
                    margin-left: auto;
                    margin-right: auto;
                    width: 77.08333%;
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

                .shrinkAway {
                    animation-duration: 0.35s;
                    animation-iteration-count: 1;
                    animation-name: shrinkAway;
                    animation-timing-function: ease;
                    animation-fill-mode: forwards;
                }

                @keyframes shrinkAway {
                    0% {
                        transform: translateX(0px);
                    } 100% {
                        transform: translateX(-800px);
                        display: none;
                    }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<").replace(" ", "");
    }

    tabletCSS() {
        const markup =
            `<style>
                @media screen and (max-width: 768px) {
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

    async toggleCartVisibility() {
        const cartOverlay = this.shadowRoot.querySelector('#shoppingCartOverlay');

        if (!cartOverlay.classList.contains('visible')) {
            cartOverlay.classList.add('visible');
            return (await import('../shoppingcart/src/ShoppingCart.js')).default;
        } else {
            cartOverlay.classList.remove('visible');
        }
    }

    isShowingNav() {
        return (this.classList.contains('showingNav')) ? true : false;
    }

    isAtCheckout() {
        return (this.store.state.path === `checkout`) ? true: false;
    }

    closeNav() {
        if (this.classList.contains('showingNav')) {
            this.shadowRoot.querySelector('#navigationMenu').classList.add('shrinkAway');
            setTimeout(() => {
                this.classList.remove('showingNav');
                this.shadowRoot.querySelector('#navigationMenu').classList.remove('shrinkAway');
            }, 1000);
        }
    }

    overlayClicked(event) {
        return (event.target.id === `navigationMenu`) ? true : false;
    }

    observerLinkClicks() {
        this.shadowRoot.addEventListener('click', (event) => {
            if (event.target.id === 'cartIconWrapper') {
                (!this.isAtCheckout()) ? this.toggleCartVisibility() : "";
            }

            if (event.target.id === 'companyLogoContainer') {
                event.preventDefault();
                this.store.dispatch('navigate', "/");
            }
 
            if (event.target.tagName === 'A') {
                event.preventDefault();
                this.store.dispatch('navigate', event.target.pathname);
            }

            if (this.isShowingNav() && this.overlayClicked(event)) {
                this.closeNav();
            }

            if (event.target.id === 'hamburger') {
                this.classList.toggle('showingNav');

                if (this.isShowingNav()) {        
                    window.addEventListener(`keydown`, (event) => {
                        (event.key === `Escape`) ? this.closeNav() : "";
                    });

                    window.addEventListener(`resize`, () => {
                        if (window.innerWidth > 768) {
                            this.closeNav();
                        }
                    });

                    window.addEventListener(`scroll`, () => {
                        this.closeNav();
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