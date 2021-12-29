import styleSheet from './aboutus.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };

export default class AboutUs extends HTMLElement {
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
        const aboutUsInnerContainer = document.createElement('div');
        aboutUsInnerContainer.id = 'aboutUs-innerContainer';

        const aboutUsDetailsContainer = document.createElement('div');
        aboutUsDetailsContainer.id = 'aboutUsDetailsContainer';

        const spanInHeaderText = document.createElement('span');
        spanInHeaderText.textContent = 'best';

        const header = document.createElement('h2');
        header.className = 'h2-design-system';
        header.innerHTML = `Bringing you the <span>best</span> audio gear`;

        const paragraph = document.createElement('p');
        paragraph.className = 'subtitle-design-system';
        paragraph.textContent = `Located at the heart of New York City, Audiophile is the premier store for
        high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury
        demonstration rooms available for you to browse and experience a wide range of our products. Stop by
        our store to meet some of the fantastic people who make Audiophile the best place to buy your portable
        audio equipment.`;

        aboutUsDetailsContainer.appendChild(header);
        aboutUsDetailsContainer.appendChild(paragraph);

        const picture = document.createElement('picture');

        const mobileSource = document.createElement('source');
        mobileSource.srcset = '../src/assets/shared/mobile/image-best-gear.jpg';
        mobileSource.media = '(max-width: 414px)';

        const tabletSource = document.createElement('source');
        tabletSource.srcset = '../src/assets/shared/tablet/image-best-gear.jpg';
        tabletSource.media = '(max-width: 834px)';

        const defaultImage = document.createElement('img');
        defaultImage.src = '../src/assets/shared/desktop/image-best-gear.jpg';
        defaultImage.alt = 'Black and white image of a man wearing headphones';

        picture.appendChild(mobileSource);
        picture.appendChild(tabletSource);
        picture.appendChild(defaultImage);

        aboutUsInnerContainer.appendChild(aboutUsDetailsContainer);
        aboutUsInnerContainer.appendChild(picture);

        this.shadowRoot.appendChild(aboutUsInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
    }
}

if (!window.customElements.get('about-us')) {
    window.customElements.define('about-us', AboutUs)
}