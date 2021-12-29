import styleSheet from './recommendedproducts.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };
import router from '../../lib/router/index.js';

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
        this.CSS();
    }

    HTML() {
        const recommendedProductsInnerContainer = document.createElement('div');
        recommendedProductsInnerContainer.id = `recommendedProductsInnerContainer`;

        const heading = document.createElement('h3');
        heading.className = `h3-design-system`;
        heading.textContent = `YOU MAY ALSO LIKE`;
        recommendedProductsInnerContainer.appendChild(heading);

        const recommendedProducts = document.createElement('section');
        recommendedProducts.id = `recommendedProducts`;

        const articleOne = document.createElement('article');
        const pictureOne = document.createElement('picture');

        const mobileSourceOne = document.createElement('source');
        mobileSourceOne.srcset = this.getAttribute("product-1-mobileImage");
        mobileSourceOne.media = '(max-width: 576px)';
        pictureOne.appendChild(mobileSourceOne);

        const tabletSourceOne = document.createElement('source');
        tabletSourceOne.srcset = this.getAttribute("product-1-tabletImage");
        tabletSourceOne.media = '(max-width: 768px)';
        pictureOne.appendChild(tabletSourceOne);

        const defaultImageOne = document.createElement('img');
        defaultImageOne.alt = `Image of ${this.getAttribute('product-1')}`;
        defaultImageOne.src = `${this.getAttribute('product-1-desktopImage')}`;
        pictureOne.appendChild(defaultImageOne);

        articleOne.appendChild(pictureOne);

        const detailsOne = document.createElement('section');
        detailsOne.className = `details`;

        const productOneHeading = document.createElement('h2');
        productOneHeading.textContent = this.getAttribute('product-1');
        detailsOne.appendChild(productOneHeading);

        const linkButtonOne = document.createElement('a');
        linkButtonOne.className = 'linkButton';
        linkButtonOne.href = `${this.getAttribute('product-1-path')}`;
        linkButtonOne.textContent = 'SEE PRODUCT';
        linkButtonOne.setAttribute('data-navigo', '');
        detailsOne.appendChild(linkButtonOne);

        articleOne.appendChild(detailsOne);
        recommendedProducts.appendChild(articleOne);

        // TWO
        const articleTwo = document.createElement('article');
        const pictureTwo = document.createElement('picture');

        const mobileSourceTwo = document.createElement('source');
        mobileSourceTwo.srcset = this.getAttribute("product-2-mobileImage");
        mobileSourceTwo.media = '(max-width: 576px)';
        pictureTwo.appendChild(mobileSourceTwo);

        const tabletSourceTwo = document.createElement('source');
        tabletSourceTwo.srcset = this.getAttribute("product-2-tabletImage");
        tabletSourceTwo.media = '(max-width: 768px)';
        pictureTwo.appendChild(tabletSourceTwo);

        const defaultImageTwo = document.createElement('img');
        defaultImageTwo.alt = `Image of ${this.getAttribute('product-2')}`;
        defaultImageTwo.src = `${this.getAttribute('product-2-desktopImage')}`;
        pictureTwo.appendChild(defaultImageTwo);

        articleTwo.appendChild(pictureTwo);

        const detailsTwo = document.createElement('section');
        detailsTwo.className = `details`;

        const productTwoHeading = document.createElement('h2');
        productTwoHeading.textContent = this.getAttribute('product-2');
        detailsTwo.appendChild(productTwoHeading);

        const linkButtonTwo = document.createElement('a');
        linkButtonTwo.className = 'linkButton';
        linkButtonTwo.href = `${this.getAttribute('product-2-path')}`;
        linkButtonTwo.textContent = 'SEE PRODUCT';
        linkButtonTwo.setAttribute('data-navigo', '');
        detailsTwo.appendChild(linkButtonTwo);

        articleTwo.appendChild(detailsTwo);
        recommendedProducts.appendChild(articleTwo);

        // THREE
        const articleThree = document.createElement('article');
        const pictureThree = document.createElement('picture');

        const mobileSourceThree = document.createElement('source');
        mobileSourceThree.srcset = this.getAttribute("product-3-mobileImage");
        mobileSourceThree.media = '(max-width: 576px)';
        pictureThree.appendChild(mobileSourceThree);

        const tabletSourceThree = document.createElement('source');
        tabletSourceThree.srcset = this.getAttribute("product-3-tabletImage");
        tabletSourceThree.media = '(max-width: 768px)';
        pictureThree.appendChild(tabletSourceThree);

        const defaultImageThree = document.createElement('img');
        defaultImageThree.alt = `Image of ${this.getAttribute('product-3')}`;
        defaultImageThree.src = `${this.getAttribute('product-3-desktopImage')}`;
        pictureThree.appendChild(defaultImageThree);

        articleThree.appendChild(pictureThree);

        const detailsThree = document.createElement('section');
        detailsThree.className = `details`;

        const productThreeHeading = document.createElement('h2');
        productThreeHeading.textContent = this.getAttribute('product-3');
        detailsThree.appendChild(productThreeHeading);

        const linkButtonThree = document.createElement('a');
        linkButtonThree.className = 'linkButton';
        linkButtonThree.href = `${this.getAttribute('product-3-path')}`;
        linkButtonThree.textContent = 'SEE PRODUCT';
        linkButtonThree.setAttribute('data-navigo', '');
        detailsThree.appendChild(linkButtonThree);

        articleThree.appendChild(detailsThree);
        recommendedProducts.appendChild(articleThree);

        this.shadowRoot.appendChild(recommendedProducts);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
    }
}

if (!window.customElements.get('recommended-products')) {
    window.customElements.define('recommended-products', RecommendedProducts)
}