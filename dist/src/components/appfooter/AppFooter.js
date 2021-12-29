import styleSheet from './appfooter.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };
import store from '../../lib/store/index.js';

export default class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.store = store;
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const footerInnerContainer = document.createElement('div');
        footerInnerContainer.id = `footer-inner-container`;

        const companyLogoLink = document.createElement('a');
        companyLogoLink.id = `companyLogoLink`;
        companyLogoLink.href = '#/';
        companyLogoLink.setAttribute('data-attribute', '');

        const companyLogo = document.createElement('img');
        companyLogo.id = 'companyLogo';
        companyLogo.alt = 'Company logo';
        companyLogo.src = '../src/assets/shared/desktop/logo.svg';
        
        companyLogoLink.appendChild(companyLogo);
        footerInnerContainer.appendChild(companyLogoLink);

        const appNav = document.createElement('nav');
        appNav.id = `appNav`;

        const appNavUl = document.createElement('ul');

        const liOne = document.createElement('li');
        liOne.className = `subtitle-design-system`;

        const liOneInnerLink = document.createElement('a');
        liOneInnerLink.href = '#/';
        liOneInnerLink.textContent = 'HOME';
        liOneInnerLink.setAttribute('data-attribute', '');
        liOne.appendChild(liOneInnerLink);
        appNavUl.appendChild(liOne);

        const liTwo = document.createElement('li');
        liTwo.className = `subtitle-design-system`;

        const liTwoInnerLink = document.createElement('a');
        liTwoInnerLink.href = '#/headphones';
        liTwoInnerLink.textContent = 'HEADPHONES';
        liTwoInnerLink.setAttribute('data-attribute', '');
        liTwo.appendChild(liTwoInnerLink);
        appNavUl.appendChild(liTwo);

        const liThree = document.createElement('li');
        liThree.className = `subtitle-design-system`;

        const liThreeInnerLink = document.createElement('a');
        liThreeInnerLink.href = '#/speakers';
        liThreeInnerLink.textContent = 'SPEAKERS';
        liThreeInnerLink.setAttribute('data-attribute', '');
        liThree.appendChild(liThreeInnerLink);
        appNavUl.appendChild(liThree);

        const liFour = document.createElement('li');
        liFour.className = `subtitle-design-system`;

        const liFourInnerLink = document.createElement('a');
        liFourInnerLink.href = '#/earphones';
        liFourInnerLink.textContent = 'EARPHONES';
        liFourInnerLink.setAttribute('data-attribute', '');
        liFour.appendChild(liFourInnerLink);
        appNavUl.appendChild(liFour);

        appNav.appendChild(appNavUl);
        footerInnerContainer.appendChild(appNav);

        const companyBio = document.createElement('p');
        companyBio.id = `companyBio`;
        companyBio.textContent = `Audiophile is an all in one stop to fulfill your audio needs. We're a small
        team of music lovers and sound specialists who are devoted to helping you get the
        most out of personal audio. Come and visit our demo facility - we're open 7 days a week.`;
        footerInnerContainer.appendChild(companyBio);

        const socialNav = document.createElement('nav');
        socialNav.id = `socialNav`;

        const socialNavUl = document.createElement('ul');

        const socialListElementOne = document.createElement('li');
        socialListElementOne.className = `subtitle-design-system`;

        const SLEOneInnerLink = document.createElement('a');
        SLEOneInnerLink.href = 'https://www.facebook.com/facebook';
        SLEOneInnerLink.setAttribute('target', '_blank');

        const facebookIcon = document.createElement('img');
        facebookIcon.alt = `Facebook icon link`;
        facebookIcon.src = `../src/assets/shared/desktop/icon-facebook.svg`;
        SLEOneInnerLink.appendChild(facebookIcon);
        socialListElementOne.appendChild(SLEOneInnerLink);
        socialNavUl.appendChild(socialListElementOne);

        const socialListElementTwo = document.createElement('li');
        socialListElementTwo.className = `subtitle-design-system`;

        const SLETwoInnerLink = document.createElement('a');
        SLETwoInnerLink.href = 'https://twitter.com/';
        SLETwoInnerLink.setAttribute('target', '_blank');

        const twitterIcon = document.createElement('img');
        twitterIcon.alt = `Twitter icon link`;
        twitterIcon.src = `../src/assets/shared/desktop/icon-twitter.svg`;
        SLETwoInnerLink.appendChild(twitterIcon);
        socialListElementTwo.appendChild(SLETwoInnerLink);
        socialNavUl.appendChild(socialListElementTwo);

        const socialListElementThree = document.createElement('li');
        socialListElementThree.className = `subtitle-design-system`;

        const SLEThreeInnerLink = document.createElement('a');
        SLEThreeInnerLink.href = 'https://www.instagram.com/';
        SLEThreeInnerLink.setAttribute('target', '_blank');

        const instagramIcon = document.createElement('img');
        instagramIcon.alt = `Instagram icon link`;
        instagramIcon.src = `../src/assets/shared/desktop/icon-instagram.svg`;
        SLEThreeInnerLink.appendChild(instagramIcon);
        socialListElementThree.appendChild(SLEThreeInnerLink);
        socialNavUl.appendChild(socialListElementThree);

        socialNav.appendChild(socialNavUl);
        footerInnerContainer.appendChild(socialNav);

        const details = document.createElement('p');
        details.id = `details`;

        const copyRight = document.createElement('small');
        copyRight.textContent = `Copyright 2021. All Rights Reserved`;
        details.appendChild(copyRight);
        footerInnerContainer.appendChild(details);

        this.shadowRoot.appendChild(footerInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
    }
}

if (!window.customElements.get('app-footer')) {
    window.customElements.define('app-footer', AppFooter)
}