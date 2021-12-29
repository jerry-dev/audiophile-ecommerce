import styleSheet from './productdescription.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };

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
        this.CSS();
    }

    HTML() {
        const descriptionInnerContainer = document.createElement('div');
        descriptionInnerContainer.id = `descriptionInnerContainer`;

        const featuresSection = document.createElement('section');
        featuresSection.id = `features`;

        const sectionTitle = document.createElement('h3');
        sectionTitle.className = `h3-design-system`;
        sectionTitle.textContent = `FEATURES`;
        featuresSection.appendChild(sectionTitle);

        const featuresDescription = document.createElement('p');
        // featuresDescription.className = `subtitle-design-system`;
        featuresDescription.innerHTML = this.getAttribute('features');
        featuresSection.appendChild(featuresDescription);

        descriptionInnerContainer.appendChild(featuresSection);

        const inBoxDetailsContainer = document.createElement('section');
        inBoxDetailsContainer.id = `inBoxDetailsContainer`;

        const inboxTitle = document.createElement('h3');
        inboxTitle.className = `h3-design-system`;
        inboxTitle.textContent = `IN THE BOX`;
        inBoxDetailsContainer.appendChild(inboxTitle);

        const inBoxList = this.getBulletList(this.getAttribute('bulletValues'));
        inBoxDetailsContainer.appendChild(inBoxList);

        descriptionInnerContainer.appendChild(inBoxDetailsContainer);

        this.shadowRoot.appendChild(descriptionInnerContainer);
    }

    getBulletList(bulletsValuePairs) {
        const inBoxItems = document.createElement('ul');
        inBoxItems.id = 'inBoxItems';

        const pairs = JSON.parse(bulletsValuePairs);

        pairs.forEach((instance) => {
            const bullet = document.createElement('li');
            bullet.className = 'subtitle-design-system';

            const quantity = document.createElement('span');
            quantity.className = 'quantity';
            quantity.textContent = `${instance.quantity}x`;
            bullet.appendChild(quantity);

            const item = document.createElement('span');
            item.className = 'item';
            item.textContent = instance.item;
            bullet.appendChild(item);

            inBoxItems.appendChild(bullet);
        });

        return inBoxItems;
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
    }
}

if (!window.customElements.get(`product-description`)) {
    window.customElements.define(`product-description`, ProductDescription)
}