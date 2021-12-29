import styleSheet from './linkbutton.css' assert { type: 'css' };

export default class LinkButton extends HTMLElement {
    static get observedAttributes() {
        return [ 'text', 'href' ];
    }

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
        const link = document.createElement('a');
        link.href = this.getAttribute('href');
        link.textContent = this.getAttribute('text');
        
        this.shadowRoot.appendChild(link);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }
}

window.customElements.define('link-button', LinkButton);