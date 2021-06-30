import designSystemImport from '../../../lib/designSystem.js';

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
        this.tabletCSS();
        this.mobileCSS();
        this.importedCSS();
    }

    HTML() {
        this.shadowRoot.innerHTML = `
            <div id="aboutUs-innerContainer">
                <div id="aboutUsDetailsContainer">
                    <h2 class="h2-design-system">
                        Bringing you the <span>best</span> audio gear
                    </h2>
                    <p class="subtitle-design-system">
                        Located at the heart of New York City, Audiophile
                        is the premier store for high end headphones,
                        earphones, speakers, and audio accessories. We have
                        a large showroom and luxury demonstration rooms
                        available for you to browse and experience a wide
                        range of our products. Stop by our store to meet
                        some of the fantastic people who make Audiophile
                        the best place to buy your portable audio equipment.
                    </p>
                </div>
                <picture>
                    <source srcset="../src/assets/shared/mobile/image-best-gear.jpg" media="(max-width: 414px)">
                    <source srcset="../src/assets/shared/tablet/image-best-gear.jpg" media="(max-width: 834px)">
                    <img src="../src/assets/shared/desktop/image-best-gear.jpg" alt="Black and white image of a man wearing headphones">
                </picture>
            </div>
        `;
    }

    CSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after {margin:0;padding:0;}

                :host {
                    background-color: var(--white-1);
                    display: block;
                    padding-bottom: 12.5rem;
                }

                #aboutUs-innerContainer {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-left: auto;
                    margin-right: auto;
                    width: 77.083%;
                }

                #aboutUsDetailsContainer {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 40.090%;
                }

                #aboutUsDetailsContainer h2 {
                    margin-bottom: 2rem;
                }

                #aboutUsDetailsContainer h2 > span {
                    color: var(--brown-2);
                }

                #aboutUsDetailsContainer p {
                    letter-spacing: 0.00625rem;
                    opacity: 0.5;
                    text-transform: none;
                }

                #aboutUs-innerContainer picture {
                    max-height: 36.75rem;
                    width: 48.648%;
                }

                #aboutUs-innerContainer picture img {
                    border-radius: 0.5rem;
                    width: 100%;
                }
            </style>
        `;
    }

    tabletCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 834px) {
                    :host {
                        padding-bottom: 6rem;
                    }

                    #aboutUs-innerContainer {
                        flex-direction: column;
                        margin-left: auto;
                        margin-right: auto;
                        width: 89.713%;
                    }

                    #aboutUs-innerContainer picture {
                        margin-bottom: 3.9375rem;
                        max-height: 18.75rem;
                        order: 1;
                        width: 100%;
                    }

                    #aboutUsDetailsContainer {
                        order: 2;
                        margin-left: auto;
                        margin-right: auto;
                        max-width: 35.8125rem;
                        text-align: center;
                        width: 100%;
                    }
                }
            <stlye>
        `;
    }

    mobileCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 414px) {
                    :host {
                        padding-bottom: 7.5rem;
                    }

                    XXX#aboutUsDetailsContainer {
                        width: 100%;
                    }

                    #aboutUs-innerContainer picture {
                        margin-bottom: 2.5rem;
                        max-height: 100%;
                    }

                    #aboutUsDetailsContainer h2 {
                        font-size: 1.75rem;
                    }

                    #aboutUs-innerContainer {
                        width: 87.2%;
                    }
                }
            <stlye>
        `;
    }

    importedCSS() {
        this.shadowRoot.innerHTML += `${designSystemImport()}`;
    }
}

if (!window.customElements.get('about-us')) {
    window.customElements.define('about-us', AboutUs)
}