import designSystemImport from '../../lib/designSystem.js';
import CategoryNavigator from '../categorynavigator/CategoryNavigator.js';
import store from '../../lib/store/index.js';

export default class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.store = store;
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
        this.shadowRoot.innerHTML = `
            <div id="header-inner-container">
                <a href="/" id="hamburger">
                    <img alt="hamburger menu icon" src="../src/assets/shared/tablet/icon-hamburger.svg"/>
                </a>
                <a id="companyLogoContainer" href="#">
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
                <a id="cartIconWrapper" href="#">
                    <img id="cartIcon" alt="shopping cart icon" src="../src/assets/shared/desktop/icon-cart.svg"/>
                </a>
                <span id="navigationMenu">
                    <category-navigator></category-navigator>
                </span>
            </div>
        `;
    }

    CSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {padding:0; margin:0;}

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
                    display: none;
                }

                #companyLogo {
                    height: 1.5625rem;
                    width: 8.9375rem;
                }

                nav {
                    margin-left: 17.747%;
                    max-width: 26.8125rem;
                    width: 38.648%;
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
                    margin-left: auto;
                }

                #cartIcon {
                    height: 1.25rem;
                    width: 1.458125rem;
                }

                #navigationMenu {
                    display: none;
                    position: absolute;
                    left: 0;
                    top: 96px;
                    width: 100%;
                    z-index: 500;
                }
            </style>
        `;
    }

    tabletCSS() {
        this.shadowRoot.innerHTML += `
            <style>
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
                }
            </style>
        `;
    }

    mobileCSS() {
        this.shadowRoot.innerHTML += `
            <style>
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
                }
            </style>
        `;
    }

    importedCSS() {
        this.shadowRoot.innerHTML += `${designSystemImport()}`;
    }

    SCRIPTS() {
        this.observerLinkClicks();
    }

    observerLinkClicks() {
        this.shadowRoot.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                event.preventDefault();
                this.store.dispatch('navigate', event.target.pathname);
            }
        });
    }
}

if (!window.customElements.get('app-header')) {
    window.customElements.define('app-header', AppHeader);
}