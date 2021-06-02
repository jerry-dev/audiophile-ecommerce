import designSystemImport from '../../../lib/designSystem.js';

export default class RecommendedProducts extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.importedCSS();
        this.CSS();
        this.tabletCSS();
        this.mobileCSS();
    }

    HTML() {
        const markup =
        `<div id="recommendedProductsInnerContainer">
            <h3 class="h3-design-system">YOU MAY ALSO LIKE</h3>
            <section id="recommendedProducts">
                <article>
                    <picture>
                        <source srcset="${this.getAttribute("product-1-mobileImage")}" media="(max-width: 576px)"/>
                        <source srcset="${this.getAttribute("product-1-tabletImage")}" media="(max-width: 768px)"/>
                        <img alt="Image of ${this.getAttribute('product-1')}" src="${this.getAttribute('product-1-desktopImage')}"/>
                    </picture>
                    <section class="details">
                        <h2>${this.getAttribute('product-1')}</h2>
                        <a href="#">SEE PRODUCT</a>
                    </section>
                </article>
                <article>
                    <picture>
                        <source srcset="${this.getAttribute("product-2-mobileImage")}" media="(max-width: 576px)"/>
                        <source srcset="${this.getAttribute("product-2-tabletImage")}" media="(max-width: 768px)"/>
                        <img alt="Image of ${this.getAttribute('product-2')}" src="${this.getAttribute('product-2-desktopImage')}"/>
                    </picture>
                    <section class="details">
                        <h2>${this.getAttribute('product-2')}</h2>
                        <a href="#">SEE PRODUCT</a>
                    </section>
                </article>
                <article>
                    <picture>
                        <source srcset="${this.getAttribute("product-3-mobileImage")}" media="(max-width: 576px)"/>
                        <source srcset="${this.getAttribute("product-3-tabletImage")}" media="(max-width: 768px)"/>
                        <img alt="Image of ${this.getAttribute('product-3')}" src="${this.getAttribute('product-3-desktopImage')}"/>
                    </picture>
                    <section class="details">
                        <h2>${this.getAttribute('product-3')}</h2>
                        <a href="#">SEE PRODUCT</a>
                    </section>
                </article>
            </section>
        </div>
        `;

        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            *,*::before,*::after {padding:0;margin:0;}

            :host {
                display: block;
                margin-bottom: 2.75rem;
                margin-left: auto;
                margin-right: auto;
                margin-top: 10rem;
                width: 77.083333%;
            }

            #recommendedProductsInnerContainer {
                text-align: center;
                width: 100%;
            }

            #recommendedProductsInnerContainer h3 {
                margin-bottom: 4rem;
            }

            #recommendedProducts {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                min-width: 100%;
            }

            #recommendedProducts article {
                display: block;
                width: 31.5315%;
            }

            #recommendedProducts article picture {
                background-color: var(--grey-1);
                width: 100%;
            }

            #recommendedProducts article picture img {
                border-radius: 0.5rem;
            }

            #recommendedProducts article .details {
                padding-top: 2.5rem;
            }

            picture img {
                width: 100%;
            }

            #recommendedProducts article .details a {
                align-items: center;
                background-color: var(--brown-2);
                color: var(--white-1);
                display: flex;
                font-size: 0.8125rem;
                height: 3rem;
                justify-content: center;
                letter-spacing: 0.0625rem;
                line-height: 1.125rem;
                margin-left: auto;
                margin-right: auto;
                margin-top: 2rem;
                text-decoration: none;
                width: 10rem;
            }

            #recommendedProducts article .details a:hover {
                background-color: var(--brown-1);
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    tabletCSS() {
        const markup =
        `<style>
            @media screen and (max-width: 768px) {
                :host {
                    margin-bottom: 7.5rem;
                    margin-top: 7.5rem;
                    width: 89.84375%;
                }

                #recommendedProductsInnerContainer h3 {
                    font-size: 1.5rem;
                    line-height: 2.25rem;
                }

                #recommendedProducts article {
                    width: 32.31884%;
                }
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    mobileCSS() {
        const markup =
        `<style>
            @media screen and (max-width: 576px) {
                :host {
                    width: 87.2%;
                }

                #recommendedProducts {
                    flex-direction: column;
                    justify-content: space-between;
                    min-width: 100%;
                }

                #recommendedProducts article {
                    width: 100%;
                }

                #recommendedProducts article:not(:last-child) {
                    margin-bottom: 3.5rem;
                }

                #recommendedProducts article picture {
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    min-height: 120px;
                    min-width: 100%;
                }

                #recommendedProducts article picture img {
                    max-width: 100%;
                    width: auto;
                }

                #recommendedProducts article .details {
                    padding-top: 2rem;
                }
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    importedCSS() {
        this.shadowRoot.innerHTML += designSystemImport();
    }
}

if (!window.customElements.get('recommended-products')) {
    window.customElements.define('recommended-products', RecommendedProducts)
}