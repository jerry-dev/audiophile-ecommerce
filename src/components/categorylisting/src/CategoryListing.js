import designSystemImport from '../../../lib/designSystem.js';

export default class CategoryListing extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
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
        this.productDetailCSS();
        this.productDetailTabletCSS();
        this.productDetailMobileCSS();
    }

    HTML() {
        this.shadowRoot.innerHTML = `
            <div class="listingInnerContainer">
                <picture>
                    <source srcset="${this.getAttribute("mobileImage")}" media=(max-width: 576px)>
                    <source srcset="${this.getAttribute("tabletImage")}" media=(max-width: 768px)>
                    <img alt="Image of ${this.getAttribute("name")}" src="${this.getAttribute("desktopImage")}">
                </picture>
                <section class="listingDetails">
                    <div class="detailsInnerContainer">
                        <small class="${this.getAttribute("new")}">NEW PRODUCT</small>
                        <h2 class="h2-design-system">${this.getAttribute("name")}</h2>
                        <p class="subtitle-design-system">${this.getAttribute("description")}</p>
                        <a href="/${this.getAttribute("category")}/${this.getAttribute("slug")}">${this.getAttribute("text")}</a>
                        <div id="price">${this.getAttribute("price")}</div>
                        <div id="cartControlsContainer">
                            <div id="controlsContainer">
                                <button type="button" id="decrementButton" class="quantityControl">-</button>
                                <input type="number" value="1">
                                <button type="button" id="incrementButton" class="quantityControl">+</button>
                            </div>
                            <button type="button" id="addToCartButton">ADD TO CART</button>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    CSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *,*::before,*::after {margin:0;padding:0;}
                :host {
                    background-color: var(--white-1);
                    display: block;
                    margin-top: 9.375rem;
                }

                .listingInnerContainer {
                    display: flex;
                    flex-direction: row;
                    margin-left: auto;
                    margin-right: auto;
                    width: 77.083%;
                }

                picture {
                    align-items: center;
                    background-color: var(--grey-1);
                    border-radius: 0.5rem;
                    display: flex;
                    width: 50%;
                }

                picture > img {
                    border-radius: 0.5rem;
                    width: 100%;
                }

                .listingInnerContainer > .listingDetails {
                    display: flex;
                    width: 50%;
                }

                .listingDetails > .detailsInnerContainer {
                    margin-bottom: auto;
                    margin-left: auto;
                    margin-top: auto;
                    width: 82.407%;
                }

                .detailsInnerContainer > small {
                    color: var(--brown-2);
                    display: block;
                    font-size: 0.875rem;
                    letter-spacing: 0.625rem;
                    line-height: 1.1875rem;
                    margin-bottom: clamp(0.5rem, 1.2vw, 1rem);
                    text-transform: uppercase;
                }

                .detailsInnerContainer > small.false {
                    display: none;
                }

                .detailsInnerContainer > h2 {
                    font-size: clamp(0.5rem, 3vw, 2.5rem);
                    margin-bottom: clamp(1rem, 2.3vw, 2rem);
                    max-width: 12ch;
                }

                .detailsInnerContainer > p {
                    margin-bottom: clamp(1rem, 2.7vw, 2.5rem);
                    opacity: 0.5;
                    text-transform: none;
                    width: 100%;
                }

                .detailsInnerContainer > a {
                    background-color: var(--brown-2);
                    display: inline-block;
                    color: var(--white-1);
                    padding-bottom: 0.9375rem;
                    padding-top: 0.9375rem;
                    padding-left: 1.96875rem;
                    padding-right: 1.96875rem;
                    text-decoration: none;
                }

                :host([cartReady="false"]) .detailsInnerContainer > #price,
                :host([cartReady="false"]) .detailsInnerContainer > #cartControlsContainer {
                    display: none;
                }

                .detailsInnerContainer > a:hover {
                    background-color: var(--brown-1);
                }
                
                :host([imageOrder="right"]) > .listingInnerContainer > picture {
                    order: 2;
                }

                :host([imageOrder="right"]) .listingDetails > .detailsInnerContainer {
                    margin-left: 0;
                    margin-right: auto;
                }

                :host([imageOrder="right"]) > .listingInnerContainer > .listingDetails {
                    order: 1;
                }
            </style>
        `;
    }

    productDetailCSS() {
        const markup =
            `<style>
                :host([cartReady="true"])  {
                    margin-top: 3.5rem;
                }

                :host([cartReady="true"]) picture {
                    width: 48.648%;
                }

                :host([cartReady="true"]) .listingDetails {
                    width: 51.351%;
                }

                :host([cartReady="true"]) .detailsInnerContainer {
                    width: 78.157%;
                }

                :host([cartReady="true"]) .detailsInnerContainer > #price {
                    font-size: 1.125rem;
                    font-weight: bold;
                    letter-spacing: 0.080356875rem;
                    line-height: 1.5625rem;
                    margin-bottom: 2.9375rem;
                }

                :host([cartReady="true"]) .detailsInnerContainer > a {
                    display: none;
                }

                :host([cartReady="true"]) .detailsInnerContainer #cartControlsContainer {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    height: 3rem;
                    justify-content: space-between;
                    width: 66.4421%;
                }

                :host([cartReady="true"]) #controlsContainer {
                    background-color: var(--grey-1);
                    display: flex;
                    flex-direction: row;
                    height: 100%;
                    width: 40.5405%;
                }

                :host([cartReady="true"]) #controlsContainer button {
                    color: var(--black-2);
                    opacity: 0.25;
                    font-weight: bold;
                    font-size: 0.8125rem;
                    line-height: 1.125rem;
                }

                :host([cartReady="true"]) #controlsContainer button,
                :host([cartReady="true"]) #controlsContainer input {
                    background-color: var(--grey-1);
                    border: none;
                    height: 100%;
                    text-align: center;
                    width: 2.5rem;
                }

                :host([cartReady="true"]) #cartControlsContainer > #addToCartButton {
                    background-color: var(--brown-2);
                    border: none;
                    color: var(--white-1);
                    height: 100%;
                    width: 54.0540%;
                }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    tabletCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 768px) {
                    :host {
                        margin-top: 7.5rem;
                    }

                    .listingInnerContainer {
                        flex-direction: column;
                        width: 89.8437%;
                    }

                    picture {
                        width: 100%;
                    }
    
                    picture > img {
                        margin-left: auto;
                        margin-right: auto;
                        height: 22rem;
                        width: auto;
                    }

                    .listingInnerContainer > .listingDetails {
                        padding-top: 3.25rem;
                        text-align: center;
                        width: 100%;
                    }
    
                    .listingDetails > .detailsInnerContainer {
                        margin-bottom: auto;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: auto;
                        width: 82.407%;
                    }

                    .detailsInnerContainer {
                        min-width: 100%;
                    }

                    .detailsInnerContainer > small {
                        letter-spacing: 0.625rem;
                        line-height: 1.1875rem;
                        margin-bottom: 1rem;
                    }

                    .detailsInnerContainer > h2 {
                        margin: 0;
                        font-size: 2.5rem;
                        margin-bottom: 2rem;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .detailsInnerContainer > p {
                        letter-spacing: 0.01875rem
                        margin-bottom: 1.5rem;
                        margin-left: auto;
                        margin-right: auto;
                        max-width: 60ch;
                    }
                }
            </style>
        `;
    }

    productDetailTabletCSS() {
        const markup =
            `<style>
                @media screen and (max-width: 768px) {
                    :host([cartReady="true"])  {
                        margin-top: 1.5rem;
                    }

                    :host([cartReady="true"]) > .listingInnerContainer {
                        flex-direction: row;
                    }

                    :host([cartReady="true"]) picture {
                        min-height: 30rem;
                        width: 40.7246%;
                    }

                    :host([cartReady="true"]) picture img {
                        max-width: 100%;
                        height: auto;
                    }
    
                    :host([cartReady="true"]) .listingDetails {
                        width: 59.2753%;
                    }
    
                    :host([cartReady="true"]) .detailsInnerContainer {
                        text-align: left;
                        margin: 0;
                        margin-bottom: 2.8125rem;
                        margin-left: auto;
                        padding-top: 0;
                        min-width: auto;
                        width: 83.1295%;
                    }

                    :host([cartReady="true"]) .detailsInnerContainer > small {
                        font-size: 0.75rem;
                        letter-spacing: 0.5357rem;
                        line-height: 1rem;
                    }

                    :host([cartReady="true"]) .detailsInnerContainer > h2 {
                        font-size: 1.75rem;
                        letter-spacing: 0.0625rem;
                        line-height: 2rem;
                        margin: 0;
                        margin-bottom: 2rem;
                        margin-right: auto;
                    }

                    :host([cartReady="true"]) .detailsInnerContainer > p {
                        line-height: 1.5625rem;
                        margin: 0;
                        margin-bottom: 2rem;
                        max-width: auto;
                    }

                    :host([cartReady="true"]) .detailsInnerContainer #cartControlsContainer {
                        justify-content: space-around;
                        width: 87.0588%;
                    }

                    :host([cartReady="true"]) #controlsContainer {
                        width: 40.5405%;
                        
                    }

                    :host([cartReady="true"]) #controlsContainer button,
                    :host([cartReady="true"]) #controlsContainer input {
                        width: 33.3333%;
                    }
                    
                    :host([cartReady="true"]) #cartControlsContainer #addToCartButton {
                        width: 54.0540%;
                    }
                }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    mobileCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 576px) {
                    :host {
                        margin-top: 4rem;
                        margin-bottom: 120px;
                    }

                    :host([item="${this.getAttribute("groupSize")}"]) {
                        margin-bottom: 68px;
                    }

                    .listingInnerContainer {
                        width: 87.2%;
                    }

                    picture > img {
                        max-width: 100%;
                    }

                    .detailsInnerContainer > h2 {
                        font-size: 1.75rem;
                        line-height: 2.375rem;
                        margin-bottom: 1.5rem;
                        margin-left: auto;
                        margin-right: auto;
                        width: 100%;
                    }

                    .detailsInnerContainer > p {
                        letter-spacing: 0.0125rem;
                    }
                }
            </style>
        `;
    }

    productDetailMobileCSS() {
        const markup =
            `<style>
                @media screen and (max-width: 576px) {
                    :host([cartReady="true"]) > .listingInnerContainer {
                        flex-direction: column;
                    }

                    :host([cartReady="true"]) picture {
                        min-height: 20.4375rem;
                        width: 100%;
                    }

                    :host([cartReady="true"]) .listingDetails {
                        padding-top: 2rem;
                        width: 100%;
                    }

                    :host([cartReady="true"]) .detailsInnerContainer {
                        margin: 0;
                        padding: 0;
                        margin-left: auto;
                        margin-right: auto;
                        width: 100%;
                    }

                    :host([cartReady="true"]) .detailsInnerContainer > small {
                        font-size: 0.875rem;
                        letter-spacing: 0.625rem;
                        line-height: 1.1875rem;
                        margin-bottom: 1.5rem;
                    }

                    :host([cartReady="true"]) .detailsInnerContainer > h2 {
                        font-size: 1.75rem;
                        letter-spacing: 0.0625rem;
                        line-height: 2.375rem;
                        margin: 0;
                        margin-bottom: 1.5rem;
                        margin-right: auto;
                    }

                    :host([cartReady="true"]) .detailsInnerContainer > #price {
                        letter-spacing: 0.080356875rem;
                        margin-bottom: 1.9375rem;
                    }

                    :host([cartReady="true"]) .detailsInnerContainer #cartControlsContainer {
                        justify-content: space-around;
                        width: 87.0588%;
                    }

                    :host([cartReady="true"]) #controlsContainer {
                        width: 40.5405%;
                        
                    }

                    :host([cartReady="true"]) #controlsContainer button,
                    :host([cartReady="true"]) #controlsContainer input {
                        width: 33.3333%;
                    }
                    
                    :host([cartReady="true"]) #cartControlsContainer #addToCartButton {
                        width: 54.0540%;
                    }
                }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    importedCSS() {
        this.shadowRoot.innerHTML += designSystemImport();
    }
}

if (!window.customElements.get('category-listing')) {
    window.customElements.define('category-listing', CategoryListing)
}