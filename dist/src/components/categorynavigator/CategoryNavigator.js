import styleSheet from './categorynavigator.css' assert { type: 'css' };
import router from '../../lib/router/index.js';

export default class CategoryNavigator extends HTMLElement {
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
        const categoryNav = document.createElement('nav');
        const navList = document.createElement('ul');

        const listElementOne = document.createElement('li');

        const listElementOneLink = document.createElement('a');
        listElementOneLink.className = `linkContainer`;
        listElementOneLink.href = `#/headphones`;
        listElementOneLink.setAttribute('data-navigo', '');
        
        const articleOne = document.createElement('article');

        const articleInnerContainerOne = document.createElement('span');
        articleInnerContainerOne.className = `articleInnerContainer`;

        const headphoneCategoryImage = document.createElement('img');
        headphoneCategoryImage.id = `headphonesCategory`;
        headphoneCategoryImage.className = `categoryImage`;
        headphoneCategoryImage.alt = `Headphones category link icon`;
        headphoneCategoryImage.src = `../src/assets/shared/desktop/image-headphones.png`;
        articleInnerContainerOne.appendChild(headphoneCategoryImage);

        const headphonesTitle = document.createElement('h3');
        headphonesTitle.textContent = `HEADPHONES`;
        articleInnerContainerOne.appendChild(headphonesTitle);

        const paragraphOne = document.createElement('p');
        paragraphOne.innerHTML = `SHOP<img alt="Arrow symbol" src="../src/assets/shared/desktop/icon-arrow-right.svg"/>`;

        articleInnerContainerOne.appendChild(paragraphOne);
        articleOne.appendChild(articleInnerContainerOne);
        listElementOneLink.appendChild(articleOne);
        listElementOne.appendChild(listElementOneLink);
        navList.appendChild(listElementOne);


        // TWo
        const listElementTWo = document.createElement('li');

        const listElementTwoLink = document.createElement('a');
        listElementTwoLink.className = `linkContainer`;
        listElementTwoLink.href = `#/speakers`;
        listElementTwoLink.setAttribute('data-navigo', '');
        
        const articleTwo = document.createElement('article');

        const articleInnerContainerTwo = document.createElement('span');
        articleInnerContainerTwo.className = `articleInnerContainer`;

        const speakerCategoryImage = document.createElement('img');
        speakerCategoryImage.id = `speakersCategory`;
        speakerCategoryImage.className = `categoryImage`;
        speakerCategoryImage.alt = `Speakers category link icon`;
        speakerCategoryImage.src = `../src/assets/shared/desktop/image-speakers.png`;
        articleInnerContainerTwo.appendChild(speakerCategoryImage);

        const speakersTitle = document.createElement('h3');
        speakersTitle.textContent = `SPEAKERS`;
        articleInnerContainerTwo.appendChild(speakersTitle);

        const paragraphTwo = document.createElement('p');
        paragraphTwo.innerHTML = `SHOP<img alt="Arrow symbol" src="../src/assets/shared/desktop/icon-arrow-right.svg"/>`;

        articleInnerContainerTwo.appendChild(paragraphTwo);
        articleTwo.appendChild(articleInnerContainerTwo);
        listElementTwoLink.appendChild(articleTwo);
        listElementTWo.appendChild(listElementTwoLink);
        navList.appendChild(listElementTWo);

        // Three
        const listElementThree = document.createElement('li');

        const listElementThreeLink = document.createElement('a');
        listElementThreeLink.className = `linkContainer`;
        listElementThreeLink.href = `#/earphones`;
        listElementThreeLink.setAttribute('data-navigo', '');
        
        const articleThree = document.createElement('article');

        const articleInnerContainerThree = document.createElement('span');
        articleInnerContainerThree.className = `articleInnerContainer`;

        const earphoneCategoryImage = document.createElement('img');
        earphoneCategoryImage.id = `earphonesCategory`;
        earphoneCategoryImage.className = `categoryImage`;
        earphoneCategoryImage.alt = `Earphones category link icon`;
        earphoneCategoryImage.src = `../src/assets/shared/desktop/image-earphones.png`;
        articleInnerContainerThree.appendChild(earphoneCategoryImage);

        const earphonesTitle = document.createElement('h3');
        earphonesTitle.textContent = `EARPHONES`;
        articleInnerContainerThree.appendChild(earphonesTitle);

        const paragraphThree = document.createElement('p');
        paragraphThree.innerHTML = `SHOP<img alt="Arrow symbol" src="../src/assets/shared/desktop/icon-arrow-right.svg"/>`;

        articleInnerContainerThree.appendChild(paragraphThree);
        articleThree.appendChild(articleInnerContainerThree);
        listElementThreeLink.appendChild(articleThree);
        listElementThree.appendChild(listElementThreeLink);
        navList.appendChild(listElementThree);
        
        categoryNav.appendChild(navList);
        this.shadowRoot.appendChild(categoryNav);
    }

    
    CSS() {
	    this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }
}

if (!window.customElements.get('category-navigator')) {
    window.customElements.define('category-navigator', CategoryNavigator)
}