import designSystemImport from '../../../lib/designSystem.js';

export default class ProductDescription extends HTMLElement {
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
    }

    HTML() {
        const markup =
            `<div id="descriptionInnerContainer">
                <section id="features">
                    <h3 class="h3-design-system">FEATURES</h3>
                    <p class=" class="subtitle-design-system">
                        ${this.getAttribute('features')}
                    </p>
                </section>
                <section id="inBoxDetailsContainer">
                    <h3 class="h3-design-system">IN THE BOX</h3>
                    <ul id="inBoxItems">
                        ${this.getAttribute("itemsList")}
                    </ul>
                </section>
            </div>`;

        this.shadowRoot.innerHTML = markup.replace(/[\t ]+\</g, "<");
    }

    CSS() {
        const markup =
            `<style>
                *,*::before,*::after {padding:0;margin:0;}

                #descriptionInnerContainer {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 10rem;
                    width: 77.083%
                }

                #features {
                    width: 57.207%;
                }

                #features > p {
                    max-width: 68ch;
                    width: 100%;
                }

                #features > h3,
                #inBoxDetailsContainer > h3 {
                    letter-spacing: 0.07142875rem;
                    margin-bottom: 2rem;
                }

                #inBoxItems {
                    list-style: none;
                }

                #inBoxDetailsContainer {
                    width: 31.531%;
                }

                #inBoxDetailsContainer ul {
                    width: 100%;
                }

                #inBoxDetailsContainer ul li {
                    display: flex;
                    text-transform: capitalize;
                }

                #inBoxDetailsContainer ul li:not(:last-child) {
                    margin-bottom: 0.5rem;
                }

                #inBoxDetailsContainer ul li .quantity {
                    color: var(--brown-2);
                    font-weight: bold;
                    margin-right: 1.5rem;
                }

                #inBoxDetailsContainer ul li .item {
                    opacity: 0.5;
                }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    tabletCSS() {
        const markup =
            `<style>
                @media screen and (max-width: 834px) {
                    #descriptionInnerContainer {
                        flex-direction: column;
                        width: 89.8437%;
                    }

                    #features {
                        margin-bottom: 7.5rem;
                        width: 100%;
                    }

                    #features > p {
                        min-width: 100%;
                    }

                    #inBoxDetailsContainer {
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                    }

                    #inBoxDetailsContainer > h3 {
                        min-width: 49.1304%;
                    }
                }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    mobileCSS() {
        const markup =
            `<style>
                @media screen and (max-width: 576px) {
                    #descriptionInnerContainer {
                        width: 87.2%;
                    }

                    #features {
                        margin-bottom: 5.5rem;
                    }

                    #inBoxDetailsContainer {
                        display: flex;
                        flex-direction: column;
                    }

                    #inBoxDetailsContainer > h3 {
                        margin-bottom: 1.5rem;
                        min-width: 100%;
                    }
                }
            </style>`;

        this.shadowRoot.innerHTML += markup.replace(/\n/g, "").replace(/[\t ]+\</g, "<");
    }

    importedCSS() {
        this.shadowRoot.innerHTML += designSystemImport();
    }
}

if (!window.customElements.get(`product-description`)) {
    window.customElements.define(`product-description`, ProductDescription)
}