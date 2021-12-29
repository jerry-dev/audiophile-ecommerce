import styleSheet from './lifestylegallery.css' assert { type: 'css' };

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
    }

    HTML() {
        const lifestyleInnerContainer = document.createElement('div');
        lifestyleInnerContainer.id = `lifestyleInnerContainer`;

        const pictureOne = document.createElement('picture');
        pictureOne.id = `picture-1`;

        const mobileImageSourceOne = document.createElement('source');
        mobileImageSourceOne.srcset = this.getAttribute("mobileImage1");
        mobileImageSourceOne.media = '(max-width: 576px)';
        pictureOne.appendChild(mobileImageSourceOne);

        const tabletImageSourceOne = document.createElement('source');
        tabletImageSourceOne.srcset = this.getAttribute("tabletImage1");
        tabletImageSourceOne.media = '(max-width: 768px)';
        pictureOne.appendChild(tabletImageSourceOne);

        const defaultImageOne = document.createElement('img');
        defaultImageOne.alt = `Lifestyle image of ${this.getAttribute('product')}`;
        defaultImageOne.src = this.getAttribute('desktopImage1');
        pictureOne.appendChild(defaultImageOne);

        lifestyleInnerContainer.appendChild(pictureOne);
        
        //TWO
        const pictureTwo = document.createElement('picture');
        pictureTwo.id = `picture-2`;

        const mobileImageSourceTwo = document.createElement('source');
        mobileImageSourceTwo.srcset = this.getAttribute("mobileImage2");
        mobileImageSourceTwo.media = '(max-width: 576px)';
        pictureTwo.appendChild(mobileImageSourceTwo);

        const tabletImageSourceTwo = document.createElement('source');
        tabletImageSourceTwo.srcset = this.getAttribute("tabletImage2");
        tabletImageSourceTwo.media = '(max-width: 768px)';
        pictureTwo.appendChild(tabletImageSourceTwo);

        const defaultImageTwo = document.createElement('img');
        defaultImageTwo.alt = `Lifestyle image of ${this.getAttribute('product')}`;
        defaultImageTwo.src = this.getAttribute('desktopImage2');
        pictureTwo.appendChild(defaultImageTwo);

        lifestyleInnerContainer.appendChild(pictureTwo);

        //THREE
        const pictureThree = document.createElement('picture');
        pictureThree.id = `picture-3`;

        const mobileImageSourceThree = document.createElement('source');
        mobileImageSourceThree.srcset = this.getAttribute("mobileImage3");
        mobileImageSourceThree.media = '(max-width: 576px)';
        pictureThree.appendChild(mobileImageSourceThree);

        const tabletImageSourceThree = document.createElement('source');
        tabletImageSourceThree.srcset = this.getAttribute("tabletImage3");
        tabletImageSourceThree.media = '(max-width: 768px)';
        pictureThree.appendChild(tabletImageSourceThree);

        const defaultImageThree = document.createElement('img');
        defaultImageThree.alt = `Lifestyle image of ${this.getAttribute('product')}`;
        defaultImageThree.src = this.getAttribute('desktopImage3');
        pictureThree.appendChild(defaultImageThree);

        lifestyleInnerContainer.appendChild(pictureThree);
        this.shadowRoot.appendChild(lifestyleInnerContainer); 
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }
}

if (!window.customElements.get('lifestyle-gallery')) {
    window.customElements.define('lifestyle-gallery', LifestyleGallery)
}

