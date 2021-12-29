import styleSheet from './productcategoryheader.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };

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
    }

    HTML() {            
        const innerContainer = document.createElement('div');
        innerContainer.id = `innerContainer`;

        const title = document.createElement('h2');
        title.className = `h2-design-system`;
        title.textContent = this.getAttribute('category');
        innerContainer.appendChild(title);

        this.shadowRoot.appendChild(innerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
    }
}

if (!window.customElements.get('product-category-header')) {
    window.customElements.define('product-category-header', ProductCategoryHeader)
}