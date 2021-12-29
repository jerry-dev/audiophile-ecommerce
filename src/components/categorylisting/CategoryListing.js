import styleSheet from './categorylisting.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };
import router from '../../lib/router/index.js';

export default class CategoryListing extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.hasAttribute(attrName);
		}
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
        const listingInnerContainer = document.createElement('div');
        listingInnerContainer.className = 'listingInnerContainer';

        const picture = document.createElement('picture');

        const modbileImageSource = document.createElement('source');
        modbileImageSource.srcset = this.getAttribute("mobileImage");
        modbileImageSource.media = 'media=(max-width: 576px)';
        picture.appendChild(modbileImageSource);

        const tabletImageSource = document.createElement('source');
        tabletImageSource.srcset = this.getAttribute("tabletImage");
        tabletImageSource.media = 'media=(max-width: 768px)';
        picture.appendChild(tabletImageSource);

        const defaultImageSource = document.createElement('img');
        defaultImageSource.alt = `Image of ${this.getAttribute("name")}`;
        defaultImageSource.src = this.getAttribute("desktopImage");
        picture.appendChild(defaultImageSource);

        listingInnerContainer.appendChild(picture);

        const listingDetails = document.createElement('section');
        listingDetails.className = 'listingDetails';

        const detailsInnerContainer = document.createElement('div');
        detailsInnerContainer.className = 'detailsInnerContainer';

        const newLabel = document.createElement('small');
        newLabel.className = this.getAttribute("new");
        newLabel.textContent = 'NEW PRODUCT';
        detailsInnerContainer.appendChild(newLabel);

        const productName = document.createElement('h2');
        productName.className = 'h2-design-system';
        productName.textContent = this.getAttribute("name");
        detailsInnerContainer.appendChild(productName);

        const description = document.createElement('p');
        description.className = 'subtitle-design-system';
        description.textContent = this.getAttribute("description");
        detailsInnerContainer.appendChild(description);

        const linkButton = document.createElement('a');
        linkButton.className = 'linkButton';
        linkButton.textContent = this.getAttribute("text");
        linkButton.href = `#/${this.getAttribute("category")}/${this.getAttribute("slug")}`;
        linkButton.setAttribute('data-navigo', '');
        detailsInnerContainer.appendChild(linkButton);

        const price = document.createElement('div');
        price.id = 'price';
        price.textContent = this.getAttribute("price");
        detailsInnerContainer.appendChild(price);

        const cartControlsContainer = document.createElement('div');
        cartControlsContainer.id = 'cartControlsContainer';

        const controlsContainerForm = document.createElement('form');
        controlsContainerForm.id = 'controlsContainer';
        
        const decrementButton = document.createElement('button');
        decrementButton.id = 'decrementButton';
        decrementButton.className = 'quantityControl';
        decrementButton.type = 'button';
        decrementButton.textContent = '-';
        controlsContainerForm.appendChild(decrementButton);

        const display = document.createElement('input');
        display.id = `display`;
        display.type = `number`;
        display.min = `1`;
        display.max = `10`;
        display.setAttribute('value', '1');
        display.setAttribute('disabled', '');
        controlsContainerForm.appendChild(display);

        const incrementButton = document.createElement('button');
        incrementButton.id = 'incrementButton';
        incrementButton.className = 'quantityControl';
        incrementButton.type = 'button';
        incrementButton.textContent = '+';
        controlsContainerForm.appendChild(incrementButton);

        cartControlsContainer.appendChild(controlsContainerForm);

        const addToCartButton = document.createElement('button');
        addToCartButton.id = 'addToCartButton';
        addToCartButton.type = 'button';
        addToCartButton.textContent = 'ADD TO CART';

        cartControlsContainer.appendChild(addToCartButton);
        detailsInnerContainer.appendChild(cartControlsContainer);
        listingDetails.appendChild(detailsInnerContainer);

        listingInnerContainer.appendChild(listingDetails);

        this.shadowRoot.appendChild(listingInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
    }

    animations() {
        const picture = this.shadowRoot.querySelector('picture > img');
        const title = this.shadowRoot.querySelector('.detailsInnerContainer h2');
        const paragraph = this.shadowRoot.querySelector('.detailsInnerContainer p');
        const newProductText = this.shadowRoot.querySelector('small');
        const seeProductButton = this.shadowRoot.querySelector('.linkButton');

        const fadeInOneObserverOptions = { 
            root: this.shadowRoot.querySelector('.detailsInnerContainer'),
            rootMargin: `0px`,
            threshold: 1
        };

        const fadeInTwoObserverOptions = { 
            root: this.shadowRoot.querySelector('.detailsInnerContainer'),
            rootMargin: `0px`,
            threshold: 1
        };

        const seeProductButtonObserverOptions = { 
            root: this.shadowRoot.querySelector('.detailsInnerContainer'),
            rootMargin: `0px`,
            threshold: 1
        };

        const titleObserver = new IntersectionObserver((entry, observer) => {
            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('translateFromRight');
            }
        });

        const fadeInOneObserver = new IntersectionObserver((entry, observer) => {
            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('fadeIn');
            } else {
                entry[0].target.classList.remove('fadeIn');
            }
        });

        const fadeInTwoObserver = new IntersectionObserver((entry, observer) => {
            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('fadeIn2');
            }
        });

        const seeProductButtonObserver = new IntersectionObserver((entry, observer) => {
            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('expand2');
            }
        });

        fadeInTwoObserver.observe(picture, fadeInTwoObserverOptions);
        fadeInTwoObserver.observe(newProductText, fadeInTwoObserverOptions);
        titleObserver.observe(title, titleObserver);
        fadeInOneObserver.observe(paragraph, fadeInOneObserverOptions);
        seeProductButtonObserver.observe(seeProductButton, seeProductButtonObserverOptions);
    }
}

if (!window.customElements.get('category-listing')) {
    window.customElements.define('category-listing', CategoryListing)
}