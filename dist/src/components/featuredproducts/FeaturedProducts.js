import styleSheet from './featuredproducts.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };
import LinkButton from '../linkbutton/LinkButton.js';

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
    }

    HTML() {
        const featuredProductsInnerContainer = document.createElement('div');
        featuredProductsInnerContainer.id = `featuredProductsInnerContainer`;

        const blockOne = document.createElement('div');
        blockOne.id = `block-1`;
        blockOne.className = `block`;

        const blockOneInnerContainerOne = document.createElement('div');
        blockOneInnerContainerOne.id = `block-1-innerContainer-1`;

        const productOneName = document.createElement('h1');
        productOneName.className = `h1-design-system`;
        productOneName.textContent = `ZX9 SPEAKER`;
        blockOneInnerContainerOne.appendChild(productOneName);

        const productOneValueProposition = document.createElement('p');
        productOneValueProposition.textContent = `Upgrade to premium speakers that
        are phenomenally built to deliver truly remarkable sound.`;
        blockOneInnerContainerOne.appendChild(productOneValueProposition);

        const linkButtonOne = document.createElement('link-button');
        linkButtonOne.setAttribute('text', `SEE PRODUCT`);
        linkButtonOne.setAttribute('href', `#/speakers/zx9-speaker`);
        linkButtonOne.className = `black`;
        blockOneInnerContainerOne.appendChild(linkButtonOne);

        blockOne.appendChild(blockOneInnerContainerOne);
        featuredProductsInnerContainer.appendChild(blockOne);

        //TWO
        const blockTwo = document.createElement('div');
        blockTwo.id = `block-2`;
        blockTwo.className = `block`;

        const blockTwoInnerContainerOne = document.createElement('div');
        blockTwoInnerContainerOne.id = `block-2-innerContainer-1`;

        const productTwoName = document.createElement('h4');
        productTwoName.className = `h4-design-system`;
        productTwoName.textContent = `ZX7 SPEAKER`;
        blockTwoInnerContainerOne.appendChild(productTwoName);

        const linkButtonTwo = document.createElement('link-button');
        linkButtonTwo.setAttribute('text', `SEE PRODUCT`);
        linkButtonTwo.setAttribute('href', `#/speakers/zx7-speaker`);
        linkButtonTwo.className = `opaque`;
        blockTwoInnerContainerOne.appendChild(linkButtonTwo);

        blockTwo.appendChild(blockTwoInnerContainerOne);
        featuredProductsInnerContainer.appendChild(blockTwo);

        //THREE
        const blockThree = document.createElement('div');
        blockThree.id = `block-3`;
        blockThree.className = `block`;

        featuredProductsInnerContainer.appendChild(blockThree);

        //FOUR
        const blockFour = document.createElement('div');
        blockFour.id = `block-4`;
        blockFour.className = `block`;

        const blockFourInnerContainerOne = document.createElement('div');
        blockFourInnerContainerOne.id = `block-4-innerContainer-1`;

        const productFourName = document.createElement('h4');
        productFourName.className = `h4-design-system`;
        productFourName.textContent = `YX1 EARPHONES`;
        blockFourInnerContainerOne.appendChild(productFourName);

        const linkButtonThree = document.createElement('link-button');
        linkButtonThree.setAttribute('text', `SEE PRODUCT`);
        linkButtonThree.setAttribute('href', `#//earphones/yx1-earphones`);
        linkButtonThree.className = `opaque`;
        blockFourInnerContainerOne.appendChild(linkButtonThree);

        blockFour.appendChild(blockFourInnerContainerOne);
        featuredProductsInnerContainer.appendChild(blockFour);

        this.shadowRoot.appendChild(featuredProductsInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
    }
}

if (!window.customElements.get('featured-products')) {
    window.customElements.define('featured-products', FeaturedProducts)
}