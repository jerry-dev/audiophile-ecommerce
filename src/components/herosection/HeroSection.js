import styleSheet from './herosection.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };
import LinkButton from '../linkbutton/LinkButton.js';

export default class HeroSection extends HTMLElement {
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
        this.animations();
    }

    HTML() {
        const heroSectionInnerContainer = document.createElement('div');
        heroSectionInnerContainer.id = `heroSectionInnerContainer`;

        const heroContent = document.createElement('div');
        heroContent.id = `heroContent`;

        const newProductLabel = document.createElement('small');
        newProductLabel.textContent = `NEW PRODUCT`;
        heroContent.appendChild(newProductLabel);

        const productName = document.createElement('h1');
        productName.textContent = `XX99 Mark II Headphone`;
        productName.className = `h1-design-system`;
        heroContent.appendChild(productName);

        const valueProposition = document.createElement('p');
        valueProposition.textContent = `Experience natural, lifelike audio and
        exceptional build quality made for the passionate music enthusiast.`;
        heroContent.appendChild(valueProposition);

        const linkButtonOne = document.createElement('link-button');
        linkButtonOne.setAttribute('text', `SEE PRODUCT`);
        linkButtonOne.setAttribute('href', `#/headphones/xx99-mark-two-headphones`);
        linkButtonOne.className = `brown`;
        heroContent.appendChild(linkButtonOne);

        heroSectionInnerContainer.appendChild(heroContent);
        this.shadowRoot.appendChild(heroSectionInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
    }

    animations() {
        const newProduct = this.shadowRoot.querySelector('#heroContent > small');
        const paragraph = this.shadowRoot.querySelector('#heroContent > p');
        const headingOne = this.shadowRoot.querySelector('#heroContent > h1');
        
        newProduct.classList.add('opaque');
        paragraph.classList.add('short');
        headingOne.classList.add('startLeft');
        
        const clearObserver = new IntersectionObserver((entry, observer) => {
            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('clear');
            }
        });

        clearObserver.observe(newProduct);

        const fullSizeObserver = new IntersectionObserver((entry, observer) => {
            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('fullSize');
            }
        });

        fullSizeObserver.observe(paragraph);

        const comeInObserver = new IntersectionObserver((entry, observer) => {
            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('comeIn');
            }
        });

        comeInObserver.observe(headingOne);
    }
}

if (!window.customElements.get('hero-section')) {
    window.customElements.define('hero-section', HeroSection)
}