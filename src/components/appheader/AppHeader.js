import styleSheet from './appheader.css' assert { type: 'css' };
import designSystem from '../../stylesheets/designsystem.css' assert { type: 'css' };
import CategoryNavigator from '../categorynavigator/CategoryNavigator.js';
import ShoppingCart from '../shoppingcart/ShoppingCart.js';
import store from '../../lib/store/index.js';
import router from '../../lib/router/index.js';

export default class AppHeader extends HTMLElement {

    constructor() {
        super();
        self = this;
        this.attachShadow({mode: 'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (newValue !== oldValue) {
			this[attrName] = this.hasAttribute(attrName);
		}

        this.attributeSync(attrName);
    }

    connectedCallback() {
        this.store = store;
        this.store.observer.subscribe('stateChange', () => {
            self.closeNavInstantly();
            self.counterManager();
            this.updateShoppingCart();
        });
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
        this.SCRIPTS();
    }

    HTML() {
        const headerInnerContainer = document.createElement('div');
        headerInnerContainer.id = 'header-inner-container';

        const hamburgerButtonMenuIcon = document.createElement('img');
        hamburgerButtonMenuIcon.id = 'hamburgerIcon';
        hamburgerButtonMenuIcon.alt = 'hamburger menu icon';
        hamburgerButtonMenuIcon.src = '../src/assets/shared/tablet/icon-hamburger.svg';

        const hamburgerButton = document.createElement('button');
        hamburgerButton.id = 'hamburger';
        hamburgerButton.appendChild(hamburgerButtonMenuIcon);

        const companyLogo = document.createElement('img');
        companyLogo.id = 'companyLogo';
        companyLogo.alt = 'company logo';
        companyLogo.src = '../src/assets/shared/desktop/logo.svg';

        const companyLogoContainer = document.createElement('a');
        companyLogoContainer.id = 'companyLogoContainer';
        companyLogoContainer.href = '#/';
        companyLogoContainer.setAttribute('data-navigo', '');
        companyLogoContainer.appendChild(companyLogo);

        const nav = document.createElement('nav');
        const list = document.createElement('ul');

        const listElmentOneLink = document.createElement('a');
        listElmentOneLink.href = '#/';
        listElmentOneLink.setAttribute('data-navigo', '');
        listElmentOneLink.textContent = 'HOME';

        const listElementOne = document.createElement('li');
        listElementOne.className = 'subtitle-design-system';
        listElementOne.appendChild(listElmentOneLink);

        const listElmentTwoLink = document.createElement('a');
        listElmentTwoLink.href = '#/headphones';
        listElmentTwoLink.setAttribute('data-navigo', '');
        listElmentTwoLink.textContent = 'HEADPHONES';

        const listElementTwo = document.createElement('li');
        listElementTwo.className = 'subtitle-design-system';
        listElementTwo.appendChild(listElmentTwoLink);

        const listElmentThreeLink = document.createElement('a');
        listElmentThreeLink.href = '#/speakers';
        listElmentThreeLink.setAttribute('data-navigo', '');
        listElmentThreeLink.textContent = 'SPEAKERS';

        const listElementThree = document.createElement('li');
        listElementThree.className = 'subtitle-design-system';
        listElementThree.appendChild(listElmentThreeLink);

        const listElmentFourLink = document.createElement('a');
        listElmentFourLink.href = '#/earphones';
        listElmentFourLink.setAttribute('data-navigo', '');
        listElmentFourLink.textContent = 'EARPHONES';

        const listElementFour = document.createElement('li');
        listElementFour.className = 'subtitle-design-system';
        listElementFour.appendChild(listElmentFourLink);

        list.appendChild(listElementOne);
        list.appendChild(listElementTwo);
        list.appendChild(listElementThree);
        list.appendChild(listElementFour);

        nav.appendChild(list);

        const itemsCount = document.createElement('div');
        itemsCount.id = 'itemsCount';
        itemsCount.className = 'empty';

        const cartIcon = document.createElement('img');
        cartIcon.id = 'cartIcon';
        cartIcon.alt = 'shopping cart icon';
        cartIcon.src = '../src/assets/shared/desktop/icon-cart.svg';

        const cartIconWrapper = document.createElement('button');
        cartIconWrapper.id = 'cartIconWrapper';
        cartIconWrapper.appendChild(itemsCount);
        cartIconWrapper.appendChild(cartIcon);

        const shoppingCart = document.createElement('shopping-cart');
        shoppingCart.setAttribute('state', this.store.state.shoppingCartState);

        const shoppingCartOverlayInnerContainer = document.createElement('div');
        shoppingCartOverlayInnerContainer.id = 'shoppingCartOverlayInnerContainer';
        shoppingCartOverlayInnerContainer.dataset.state = this.store.state.shoppingCartState;
        shoppingCartOverlayInnerContainer.appendChild(shoppingCart);

        const shoppingCartOverlay = document.createElement('div');
        shoppingCartOverlay.id = 'shoppingCartOverlay';
        shoppingCartOverlay.appendChild(shoppingCartOverlayInnerContainer);

        const categoryNav = document.createElement('category-navigator');

        const navigationMenu = document.createElement('div');
        navigationMenu.id = 'navigationMenu';
        navigationMenu.appendChild(categoryNav);

        headerInnerContainer.appendChild(hamburgerButton);
        headerInnerContainer.appendChild(companyLogoContainer);
        headerInnerContainer.appendChild(nav);
        headerInnerContainer.appendChild(cartIconWrapper);
        headerInnerContainer.appendChild(shoppingCartOverlay);
        headerInnerContainer.appendChild(navigationMenu);

        this.shadowRoot.appendChild(headerInnerContainer);  
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, designSystem ];
    }

    SCRIPTS() {
        this.observerLinkClicks();
    }

    isShowingNav() {
        return (this.classList.contains('showingNav')) ? true : false;
    }

    isShowingShoppingCart() {
        return (this.store.state.shoppingCartState === 'visible');
    }

    openNav() {
        if (!this.isShowingNav()) {
            if (this.isShowingShoppingCart()) {
                this.closeShoppingCart();
            }
            this.shadowRoot.querySelector('#navigationMenu').classList.add('slideIntoView');
            this.classList.add('showingNav');
            document.querySelector('body').classList.add('lock');
            setTimeout(() => {
                this.shadowRoot.querySelector('#navigationMenu').classList.remove('slideIntoView');
            }, 500);
        }
    }

    closeNav() {
        if (this.classList.contains('showingNav')) {
            this.shadowRoot.querySelector('#navigationMenu').classList.add('slideOutOfView');
            document.querySelector('body').classList.remove('lock');

            setTimeout(() => {
                this.classList.remove('showingNav');
                this.shadowRoot.querySelector('#navigationMenu').classList.remove('slideOutOfView');
            }, 500);
        }
    }

    closeNavInstantly() {
        document.querySelector('body').classList.remove('lock');
        this.classList.remove('showingNav');
    }

    openShoppingCart() {
        if (!this.isShowingShoppingCart()) {
            if (this.isShowingNav()) {
                this.closeNavInstantly();
            }

            this.store.dispatch('openShoppingCart', 'n/a');
            document.querySelector('body').classList.add('lock');
        }
    }

    closeShoppingCart() {
        this.store.dispatch('closeShoppingCart', 'n/a');
        document.querySelector('body').classList.remove('lock');
    }

    updateShoppingCart() {
        const cartState = this.store.state.shoppingCartState

        this.shadowRoot.querySelector('#shoppingCartOverlay').dataset.state = cartState;
        this.shadowRoot.querySelector('shopping-cart').setAttribute('state', cartState);
    }

    counterManager() {
        let count = this.store.state.cartCalculations.numberOfDistinctItems;

        if (count > 0) {
            this.shadowRoot.querySelector('#itemsCount').textContent = count;
            this.shadowRoot.querySelector('#itemsCount').classList.remove('empty');
        } else {
            this.shadowRoot.querySelector('#itemsCount').textContent = "";
            this.shadowRoot.querySelector('#itemsCount').classList.add('empty');
        }
    }

    overlayClicked(event) {
        return (event.target.id === `navigationMenu` || event.target.id === 'shoppingCartOverlayInnerContainer') ? true : false;
    }

    observerLinkClicks() {
        this.shadowRoot.addEventListener('click', (event) => {
            if (event.target.id === 'cartIconWrapper') {
                (!this.isShowingShoppingCart()) ? this.openShoppingCart() : this.closeShoppingCart();
            }

            if (this.overlayClicked(event)) {
                if (this.isShowingShoppingCart()) {
                    this.closeShoppingCart();
                }

                if (this.isShowingNav()) {
                    this.closeNav();
                }
            }

            window.addEventListener(`keydown`, (event) => {
                if (event.key === `Escape`) {
                    if (this.isShowingShoppingCart()) {
                        this.closeShoppingCart();
                    }

                    if (this.isShowingNav()) {
                        this.closeNav();
                    }
                }
           });
            
            if (event.target.id === 'hamburger') {
                (!this.isShowingNav()) ? this.openNav() : this.closeNav();

                if (this.isShowingNav()) {
                    window.addEventListener(`resize`, () => {
                        if (window.innerWidth > 768) {
                            this.closeNav();
                        }
                    });
                }
            }

            if (event.target.tagName === 'CATEGORY-NAVIGATOR') {
                if (this.isShowingNav()) {
                    this.closeNav();
                }
            }
        });
    }

    buttonHandler(id) {
        switch (id) {
            case 'decrementButton': this.decrementInputQuantityValue(); break;
            case 'incrementButton': this.incrementInputQuantityValue(); break;
            case 'addToCartButton': this.addToCart(); break;
            default: ""; break;
        }
    }

    decrementInputQuantityValue() {
        const input = this.shadowRoot.querySelector('category-listing').shadowRoot
            .querySelector('#controlsContainer > input');
            
        if (Number(input.getAttribute('value')) > 1) {
            input.setAttribute('value', Number(input.getAttribute('value')) - 1);
        }
    }

    incrementInputQuantityValue() {
        const input = this.shadowRoot.querySelector('category-listing').shadowRoot
            .querySelector('#controlsContainer > input');

        if (Number(input.getAttribute('value')) < 10) {
            input.setAttribute('value', Number(input.getAttribute('value')) + 1);
        }
    }
}

if (!window.customElements.get('app-header')) {
    window.customElements.define('app-header', AppHeader);
}