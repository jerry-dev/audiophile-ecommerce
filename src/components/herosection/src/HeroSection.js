import designSystemImport from '../../../lib/designSystem.js';

export default class HeroSection extends HTMLElement {
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
        this.tabletCSS();
        this.mobileCSS();
    }

    html() {
        this.shadowRoot.innerHTML = `
            <div id="heroSectionInnerContainer">
                <div id="heroContent">
                    <small>NEW PRODUCT</small>
                    <h1 class="h1-design-system">XX99 Mark II Headphone</h1>
                    <p>
                        Experience natural, lifelike audio and exceptional build quality
                        made for the passionate music enthusiast.
                    </p>
                    <button type="submit">SEE PRODUCT</button>
                </div>
            </div>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {padding:0; margin:0;}
                
                :host {
                    background-color: var(--black-1);
                    background-image: url("../src/assets/home/desktop/image-hero.jpg");
                    background-position: center;
                    background-repeat: no-repeat;
                    display: block;
                    padding-bottom: 9.875rem;
                    padding-top: 14.0625rem;
                }

                #heroSectionInnerContainer {
                    margin-left: auto;
                    margin-right: auto;
                    width: 77.083%;
                }

                #heroContent > small {
                    color: var(--white-1);
                    display: block;
                    font-size: 0.875rem;
                    letter-spacing: 0.625rem;
                    line-height: 1.1875rem;
                    margin-bottom: 1.5rem;
                    opacity: 0.5;
                    max-width: 12.4375rem;
                    white-space: nowrap;
                }

                #heroContent > h1 {
                    color: var(--white-1);
                    margin-bottom: 1.5rem;
                    max-width: 24.75rem;
                }

                #heroContent > p {
                    color: var(--white-1);
                    font-size: 0.9375rem;
                    line-height: 1.5625rem;
                    margin-bottom: 2.5rem;
                    opacity: 0.75;
                    max-width: 40ch;
                }

                #heroContent > button {
                    background-color: var(--brown-2);
                    border: none;
                    color: var(--white-1);
                    font-size: 0.8125rem;
                    letter-spacing: 0.0625rem;
                    line-height: 1.125rem;
                    padding-bottom: 0.9375rem;
                    padding-left: 1.96875rem;
                    padding-right: 1.84375rem;
                    padding-top: 0.9375rem;
                }

                #heroContent > button:hover {
                    background-color: var(--brown-1);
                    cursor: pointer;
                }
            </style>
        `;
    }

    tabletCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 768px) {
                    :host {
                        background-image: url("../src/assets/home/tablet/image-header.jpg");
                        background-size: cover;
                        padding-bottom: 10.4375rem;
                        padding-top: 7.875rem;
                    }
    
                    #heroSectionInnerContainer {
                        max-width: 23.6875rem;
                    }

                    #heroContent > small {
                        margin-left: auto;
                        margin-right: auto;
                        white-space: nowrap;
                    }

                    #heroContent {
                        text-align: center;
                    }

                    #heroContent > h1 {
                        margin-left: auto;
                        margin-right: auto;
                        max-width: 23.6875rem;
                    }
                }
            </style>
        `;
    }

    mobileCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 576px) {
                    :host {
                        background-image: url("../src/assets/home/mobile/image-header.jpg");
                        background-size: cover;
                        padding-bottom: 7rem;
                        padding-top: 6.75rem;
                    }
    
                    #heroSectionInnerContainer {
                        width: 87.466%;
                    }

                    #heroContent > small {
                        margin-bottom: 1rem;
                    }

                    #heroContent {
                        text-align: center;
                    }

                    #heroContent > h1 {
                        font-size: 2.25rem;
                        line-height: 2.5rem;
                        margin-bottom: 1.5rem;
                        margin-left: auto;
                        margin-right: auto;
                        max-width: 20.5rem;
                    }

                    #heroContent > p {
                        margin-bottom: 1.75rem;
                    }
                }
            </style>
        `;
    }

    importedCSS() {
        this.shadowRoot.innerHTML += `${designSystemImport()}`;
    }
}

if (!window.customElements.get('hero-section')) {
    window.customElements.define('hero-section', HeroSection)
}