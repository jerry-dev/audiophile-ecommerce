import designSystemImport from '../../lib/designSystem.js';

export default class AppFooter extends HTMLElement {
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
        this.importedCSS();
        this.tabletCSS();
        this.mobileCSS();
    }

    HTML() {
        this.shadowRoot.innerHTML = `
            <div id="footer-inner-container">
                <a href="/">
                    <img id="companyLogo" alt="company logo" src="../src/assets/shared/desktop/logo.svg"/>
                </a>
                <nav id="appNav">
                    <ul>
                        <li class="subtitle-design-system"><a href="/">HOME</a></li>
                        <li class="subtitle-design-system"><a href="/headphones">HEADPHONES</a></li>
                        <li class="subtitle-design-system"><a href="/speakers">SPEAKERS</a></li>
                        <li class="subtitle-design-system"><a href="/earphones">EARPHONES</a></li>
                    </ul>
                </nav>
                <p id="companyBio">
                    Audiophile is an all in one stop to fulfill your audio needs. We're a small
                    team of music lovers and sound specialists who are devoted to helping you get the
                    most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
                </p>
                <nav id="socialNav">
                    <ul>
                        <li class="subtitle-design-system">
                            <a href="https://www.facebook.com/facebook" target="_blank">
                                <img alt="facebook icon link" src="../src/assets/shared/desktop/icon-facebook.svg"/>
                            </a>
                        </li>
                        <li class="subtitle-design-system">
                            <a href="https://twitter.com/" target="_blank">
                                <img alt="twitter icon link" src="../src/assets/shared/desktop/icon-twitter.svg"/>
                            </a>
                        </li>
                        <li class="subtitle-design-system">
                            <a href="https://www.instagram.com/" target="_blank">
                                <img alt="instagram icon link" src="../src/assets/shared/desktop/icon-instagram.svg"/>
                            </a>
                        </li>
                    </ul>
                </nav>
                <p id="details">
                    <small>
                        Copyright 2021. All Rights Reserved
                    </small>
                </p>
            </div>
        `;
    }

    CSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {padding:0;margin:0;}

                :host {
                    align-items: center;
                    background-color: var(--black-1);
                    display: flex;
                }

                #footer-inner-container {
                    display: grid;
                    grid-row-gap: 2.25rem;
                    grid-template-columns: repeat(2, 1fr);
                    margin-bottom: 3rem;
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 4.6875rem;
                    width: 77.083%;
                }

                #companyLogo {
                    grid-column: 1 / span 1;
                    height: 1.5625rem;
                    width: 8.9375rem;
                }

                #appNav {
                    grid-column: 2 / span 1;
                    margin-left: auto;
                }

                #appNav > ul {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                #appNav > ul > li {
                    text-decoration: none;
                }

                #appNav > ul > li:not(:last-child) {
                    margin-right: 2.125rem;
                }

                #appNav > ul > li > a {
                    color: var(--white-1);
                    text-decoration: none;
                }

                #appNav > ul > li > a:hover {
                    color: var(--brown-2);
                }

                #companyBio {
                    color: var(--white-1);
                    grid-column: 1 / span 1;
                    grid-row: 2 / span 1;
                    max-width: 58ch;
                    opacity: 0.5;
                }

                #socialNav {
                    margin-left: auto;
                    margin-top: auto;
                    max-width: 6.5rem;
                }

                #socialNav > ul {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    list-style: none;
                }

                #socialNav > ul > li:not(:last-child) {
                    margin-right: 1rem;
                }

                #socialNav > ul > li > a > img {
                    height: 1.5rem;
                    width: 1.5rem;
                }

                #socialNav > ul > li > a > img:hover {
                    filter: invert(57%) sepia(98%) saturate(484%) hue-rotate(328deg) brightness(91%) contrast(84%);
                }

                #details {
                    color: var(--white-1);
                    grid-row: 3;
                    opacity: 0.5;
                }
            </style>
        `;
    }

    tabletCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 768px) {
                    #footer-inner-container {
                        grid-row-gap: 0;
                        grid-template-columns: repeat(2, 1fr);
                        margin-bottom: 2.875rem;
                        margin-top: 3.75rem;
                        width: 89.713%;
                    }
    
                    #companyLogo {
                        grid-column: 1 / span 2;
                        height: 1.5625rem;
                        margin-bottom: 2rem;
                        width: 8.9375rem;
                    }
    
                    #appNav {
                        grid-column: 1 / span 1;
                        grid-row: 2;
                        margin-bottom: 2rem;
                    }

                    #companyBio {
                        grid-column: 1 / span 2;
                        grid-row: 3;
                        margin-bottom: 5rem;
                        max-width: 75ch;
                    }

                    #details {
                        grid-column: 1 / span 1;
                        grid-row: 4;
                    }

                    #socialNav {
                        grid-column: 2 / span 1;
                        grid-row: 4;
                    }
                }
            </style>
        `;
    }

    mobileCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 576px) {
                    #footer-inner-container {
                        align-items: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;
                        width: 87.2%;
                    }
    
                    #companyLogo {
                        margin: 0;
                        margin-bottom: 3rem;
                    }

                    #appNav {
                        margin: 0;
                        margin-bottom: 3rem;
                    }
    
                    #appNav > ul {
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                    }

                    #appNav > ul > li:not(:last-child) {
                        margin-bottom: 1rem;
                        margin-right: 0;
                    }

                    #companyBio {
                        margin: 0;
                        margin-bottom: 3rem;
                        max-width: 35ch;
                    }

                    #details {
                        margin: 0;
                        margin-bottom: 3rem;
                    }

                    #socialNav {
                        margin: 0;
                        order: 4;
                    }
                }
            </style>
        `;
    }

    importedCSS() {
        this.shadowRoot.innerHTML += `${designSystemImport()}`;
    }
}

if (!window.customElements.get('app-footer')) {
    window.customElements.define('app-footer', AppFooter)
}