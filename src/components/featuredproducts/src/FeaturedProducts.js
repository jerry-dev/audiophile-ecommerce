import designSystemImport from '../../../lib/designSystem.js';

export default class FeaturedProducts extends HTMLElement {
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
            <div id="featuredProductsInnerContainer">
                <div class="block" id="block-1">
                    <div id="block-1-innerContainer-1">
                        <h1 class="h1-design-system">
                            ZX9 SPEAKER
                        </h1>
                        <p class="subtitle-design-system">
                            Upgrade to premium speakers that are phenomenally built
                            to deliver truly remarkable sound.
                        </p>
                        <button id="ZX9" type="button">SEE PRODUCT</button>
                    </div>
                </div>

                <div class="block" id="block-2">
                    <div id="block-2-innerContainer-1">
                        <h4 class="h4-design-system">
                            ZX7 SPEAKER
                        </h4>
                        <button id="ZX7" type="button">SEE PRODUCT</button>
                    </div>
                </div>

                <div class="block" id="block-3">
                </div>

                <div class="block" id="block-4">
                    <div id="block-4-innerContainer-1">
                        <h4 class="h4-design-system">
                            YX1 EARPHONES
                        </h4>
                        <button id="YX1" type="button">SEE PRODUCT</button>
                    </div>
                </div>
            </div>
        `;
    }

    CSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *,*::before,*::after {margin:0;pading:0;}

                :host {
                    background-color: var(--white-1);
                    display: block;
                }

                #featuredProductsInnerContainer {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-column-gap: 1.875rem;
                    grid-row-gap: 3rem;
                    padding-bottom: 12.5rem;
                    margin-left: auto;
                    margin-right: auto;
                    width: 77.083%;
                }

                .block {
                    border-radius: 0.5rem;
                }

                #block-1 {
                    background-image: url("../src/assets/product-zx9-speaker/desktop/background.png");
                    grid-column: 1 / span 2;
                    padding-bottom: 7.75rem;
                    padding-top: 8.3125rem;
                }

                #block-1-innerContainer-1 {
                    margin-left: auto;
                    margin-right: 5.9375rem;
                    max-width: 21.8125rem;
                    position: relative;
                }

                #block-1-innerContainer-1 > h1 {
                    color: var(--white-1);
                    margin-bottom: 1.5rem;
                }

                #block-1-innerContainer-1 > p {
                    color: var(--white-1);
                    margin-bottom: 2.5rem;
                    opacity: 0.75;
                    text-transform: none;
                }

                #block-1-innerContainer-1 > button {
                    background-color: var(--black-1);
                    border: none;
                    color: var(--white-1);
                    font-size: 0.8125rem;
                    font-weight: bold;
                    line-height: 1.125rem;
                    padding-bottom: 0.9375rem;
                    padding-left: 1.96875rem;
                    padding-right: 1.84375rem;
                    padding-top: 0.9375rem;
                }

                #block-1-innerContainer-1 > button:hover {
                    background-color: rgba(76, 76, 76, 1);
                    cursor: pointer;
                }

                #block-2 {
                    background-image: url("../src/assets/product-zx7-speaker/desktop/image-gallery-3-2.png");
                    background-repeat: no-repeat;
                    background-size: cover;
                    grid-column: 1 / span 2;
                    grid-row: 2 / span 1;
                    padding-bottom: 7.75rem;
                    padding-top: 8.3125rem;
                }

                #block-2-innerContainer-1 {
                    margin-left: auto;
                    margin-right: auto;
                    width: 80.856%;
                }

                #block-2-innerContainer-1 > h4 {
                    margin-bottom: 2rem;
                }

                #block-2-innerContainer-1 > button {
                    background: none;
                    border: 1px solid black;
                    padding-bottom: 0.9375rem;
                    padding-right: 1.84375rem;
                    padding-top: 0.9375rem;
                    padding-left: 1.96875rem;
                }

                #block-2-innerContainer-1 > button:hover,
                #block-4-innerContainer-1 > button:hover {
                    background-color: var(--black-2);
                    color: var(--white-1);
                    cursor: pointer;
                }

                #block-3 {
                    background-image: url("../src/assets/product-yx1-earphones/desktop/image-gallery-2.jpg");
                    background-repeat: no-repeat;
                    background-size: cover;
                    grid-column: 1 / span 1;
                    grid-row: 3 / span 1;
                    height: 20rem;
                }

                #block-4 {
                    background-color: var(--grey-1);
                    grid-column: 2 / span 1;
                    grid-row: 3 / span 1;
                    padding-top: 6.3125rem;
                }

                #block-4-innerContainer-1 {
                    margin-left: auto;
                    margin-right: auto;
                    width: 64.814%;
                }

                #block-4-innerContainer-1 > h4 {
                    margin-bottom: 2rem;
                }

                #block-4-innerContainer-1 > button {
                    padding-bottom: 0.9375rem;
                    padding-right: 1.84375rem;
                    padding-top: 0.9375rem;
                    padding-left: 1.96875rem;
                }
            </style>
        `;
    }

    tabletCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 768px) {
                    #featuredProductsInnerContainer {
                        grid-column-gap: 1.833rem;
                        grid-row-gap: 2rem;
                        padding-bottom: 6rem;
                        width: 89.713%;
                    }

                    #block-1 {
                        background-image: url("../src/assets/product-zx9-speaker/tablet/background.png");
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: fill;
                        padding-top: 22.0625rem;
                        text-align: center;
                    }

                    #block-1-innerContainer-1 {
                        margin-left: auto;
                        margin-right: auto;
                    }

                    #block-1-innerContainer-1 > h1 {
                        margin-bottom: 4rem;
                    }

                    #block-2 {
                        background-image: url("../src/assets/product-zx7-speaker/tablet/background.png");
                        padding-bottom: 6.3125rem;
                        padding-top: 6.3125rem;
                    }

                    #block-3 {
                        background-image: url("../src/assets/product-yx1-earphones/tablet/image-gallery-2.jpg");
                        background-position: center;
                    }

                    #block-4-innerContainer-1 {
                        width: 75.811%;
                    }
                }
            </style>
        `;
    }

    mobileCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 576px) {
                    #featuredProductsInnerContainer {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                        padding-bottom: 7.5rem;
                        width: 87.2%;
                    }

                    #block-1 {
                        background-image: url("../src/assets/product-zx9-speaker/mobile/background.png");
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        padding-bottom: 3.4375rem;
                        padding-top: 18.5rem;
                        text-align: center;
                    }

                    #block-1-innerContainer-1 {
                        margin-left: auto;
                        margin-right: auto;
                    }

                    #block-1-innerContainer-1 > h1 {
                        margin-bottom: 1.5rem;
                    }

                    #block-1-innerContainer-1 > p {
                        margin-bottom: 1.5rem;
                    }

                    #block-2 {
                        background-image: url("../src/assets/product-zx7-speaker/mobile/background.png");
                        background-size: cover;
                        padding-bottom: 6.3125rem;
                        padding-top: 6.3125rem;
                    }

                    #block-3 {
                        background-image: url("../src/assets/product-yx1-earphones/tablet/image-gallery-2.jpg");
                        background-position: center;
                        height: 12.5rem;
                    }

                    #block-4 {
                        padding-bottom: 2.5625rem;
                        padding-top: 2.5625rem;
                    }
                }
            </style>
        `;
    }

    importedCSS() {
        this.shadowRoot.innerHTML += `${designSystemImport()}`;
    }
}

if (!window.customElements.get('featured-products')) {
    window.customElements.define('featured-products', FeaturedProducts)
}