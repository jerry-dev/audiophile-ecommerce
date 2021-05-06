import designSystemImport from '../../lib/designSystem.js';

export default class AppHeader extends HTMLElement {
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
        this.importedCSS();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div id="header-inner-container">
                <a href="#">
                    <img id="companyLogo" alt="company logo" src="../src/assets/shared/desktop/logo.svg"/>
                </a>
                <nav>
                    <ul>
                        <li class="subtitle-design-system"><a href="#">HOME</a></li>
                        <li class="subtitle-design-system"><a href="#">HEADPHONES</a></li>
                        <li class="subtitle-design-system"><a href="#">SPEAKERS</a></li>
                        <li class="subtitle-design-system"><a href="#">EARPHONES</a></li>
                    </ul>
                </nav>
                <a href="#">
                    <img id="cartIcon" alt="shopping cart icon" src="../src/assets/shared/desktop/icon-cart.svg"/>
                </a>
            </div>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {padding:0; margin:0;}

                :host {
                    align-items: center;
                    background-color: var(--black-1);
                    border-bottom: 1px solid var(--white-1-opaque-1);
                    display: flex;
                    height: 6rem;
                }

                #header-inner-container {
                    display: flex;
                    flex-direction: row;
                    height: 1.75rem;
                    justify-content: space-between;
                    margin-right: auto;
                    margin-left: auto;
                    width: 77.083%;
                }

                #companyLogo {
                    height: 1.5625rem;
                    width: 8.9375rem;
                }

                ul {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                li {
                    letter-spacing: 0.125rem;
                    list-style: none;
                    
                }

                li:not(:last-child) {
                    margin-right: 2.125rem;
                }

                li > a {
                    color: var(--white-1);
                    text-decoration: none;
                }

                #cartIcon {
                    height: 1.25rem;
                    width: 1.458125rem;
                }
            </style>
        `;
    }

    importedCSS() {
        this.shadowRoot.innerHTML += `${designSystemImport()};`;
    }
}

if (!window.customElements.get('app-header')) {
    window.customElements.define('app-header', AppHeader);
}