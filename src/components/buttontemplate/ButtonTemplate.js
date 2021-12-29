import styleSheet from './buttontemplate.css' assert { type: 'css' };

export default class ButtonTemplate extends HTMLElement {
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
        const innerButton = document.createElement('button');
        innerButton.id = this.getAttribute('id');
        innerButton.type = 'button';
        innerButton.textContent = this.getAttribute('text');
        this.shadowRoot.appendChild(innerButton);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }
}

if (!window.customElements.get('button-template')) {
    window.customElements.define('button-template', ButtonTemplate)
}