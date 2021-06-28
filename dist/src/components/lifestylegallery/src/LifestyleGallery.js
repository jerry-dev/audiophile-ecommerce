export default class LifestyleGallery extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
        this.tabletCSS();
        this.mobileCSS();
    }

    HTML() {
        const markup =
        `<div id="lifestyleInnerContainer">
            <picture id="picture-1">
                <source srcset="${this.getAttribute("mobileImage1")}" media="(max-width: 576px)"/>
                <source srcset="${this.getAttribute("tabletImage1")}" media="(max-width: 768px)"/>
                <img alt="Lifestyle image of ${this.getAttribute('product')}" src="${this.getAttribute('desktopImage1')}"/>
            </picture>
            <picture id="picture-2">
                <source srcset="${this.getAttribute("mobileImage2")}" media="(max-width: 576px)"/>
                <source srcset="${this.getAttribute("tabletImage2")}" media="(max-width: 768px)"/>
                <img alt="Lifestyle image of ${this.getAttribute('product')}" src="${this.getAttribute('desktopImage2')}"/>
            </picture>
            <picture id="picture-3">
                <source srcset="${this.getAttribute("mobileImage3")}" media="(max-width: 576px)"/>
                <source srcset="${this.getAttribute("tabletImage3")}" media="(max-width: 768px)"/>
                <img alt="Lifestyle image of ${this.getAttribute('product')}" src="${this.getAttribute('desktopImage3')}"/>
            </picture>
        </div>`;

        this.shadowRoot.innerHTML = markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
        `<style>
            *,*::before,*::after {margin:0;padding:0;}

            :host {
                display: block;
                margin-top: 10rem;
            }

            #lifestyleInnerContainer {
                display: grid;
                grid-column-gap: 1.875rem;
                grid-row-gap: 2rem;
                grid-template-columns: 40.0900% 57.2072%;
                grid-template-rows: auto;
                margin-left: auto;
                margin-right: auto;
                width: 77.0833%;
            }

            #lifestyleInnerContainer picture img {
                border-radius: 0.5rem;
                height: 100%;
            }

            #picture-1 {
                grid-column: 1 / span 1;
            }

            #picture-2 {
                grid-column: 1 / span 1;
                grid-row: 2 / span 1;
            }

            #picture-3 {
                grid-column: 2 / span 1;
                grid-row: 1 / span 2;
            }

            #lifestyleInnerContainer picture img {
                width: 100%;
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    tabletCSS() {
        const markup =
        `<style>
            @media screen and (max-width: 834px) {
                :host {
                    margin-top: 7.5rem;
                }

                #lifestyleInnerContainer {
                    grid-column-gap: 1.125rem;
                    grid-row-gap: 1.25rem;
                    grid-template-columns: 40.0289% 57.2463%;
                    width: 89.8437%;
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
                    margin-top: 5.5rem;
                }

                #lifestyleInnerContainer {
                    grid-row-gap: 1.25rem;
                    grid-template-columns: 100%;
                    width: 87.2%;
                }

                #picture-1,
                #picture-2,
                #picture-3 {
                    grid-column: 1 / span 1;
                    grid-row: span 1;
                }
            }
        </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }
}

if (!window.customElements.get('lifestyle-gallery')) {
    window.customElements.define('lifestyle-gallery', LifestyleGallery)
}

