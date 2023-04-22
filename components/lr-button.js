import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class LrButton extends LitElement {
    static get styles() {
        return css`
          .button a {
            color: rgb(var(--text));
            padding: 8px 12px;
            border-radius: 24px;
            background-color: rgba(var(--accent), 0.5);
            text-decoration: none;
            text-transform: uppercase;
            transition: background-color ease-in 200ms;
          }
          .button a:hover {
            background-color: rgba(var(--accent), 0.75);
          }
        `;
    }

    static get properties() {
        return {
            text: {type: String},
            link: {type: Number},
        };
    }

    constructor() {
        super();
        this.text = '';
        this.link = '';
    }

    render() {
        return html`
            <div class="button">
                <a href="${this.link}">${this.text}</a>
            </div>
        `;
    }
}

window.customElements.define('lr-button', LrButton);
