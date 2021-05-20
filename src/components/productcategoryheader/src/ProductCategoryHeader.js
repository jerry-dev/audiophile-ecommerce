import designSystemImport from '../../../lib/designSystem.js';

export default class ProductCategoryHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: `open`});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
        this.mobileCSS();
        this.importedCSS();
    }

    HTML() {
        this.shadowRoot.innerHTML = `
            <div id="PCHinnerContainer">
                <h2 class="h2-design-system">${this.getAttribute('category')}</h2>
            </div>`;        
    }

    CSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *,*::before,*::after{margin:0;padding:0;}

                :host {
                    background-color: var(--black-2);
                    display: block;
                    padding-bottom: 6.125rem;
                    padding-top: 6.125rem;
                }

                #PCHinnerContainer {
                    margin-left: auto;
                    margin-right: auto;
                    width: 77.083%;
                }

                h2 {
                    color: var(--white-1);
                    text-align: center;
                }
            </style>
        `;
    }

    mobileCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 576px) {
                    :host {
                        padding-bottom: 2rem;
                        padding-top: 2rem;
                    }
    
                    #PCHinnerContainer {
                        width: 87.2%;
                    }

                    #PCHinnerContainer p {
                        font-size: 1.75rem;
                        letter-spacing: 0.125rem;
                        line-height: 2.375rem;
                    }
                }
            </style>
        `;
    }

    importedCSS() {
        this.shadowRoot.innerHTML += `${designSystemImport()}`;
    }
}

if (!window.customElements.get('product-category-header')) {
    window.customElements.define('product-category-header', ProductCategoryHeader)
}