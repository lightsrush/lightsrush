import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class LrPoster extends LitElement {
    static get styles() {
        return css`
          :host {
            font-weight: 300;
          }
          
          #container {
            display: flex;
            flex-flow: column;
          }

          #cover {
            height: 300px;
            margin: auto;
            padding-bottom: 8px;
          }

          #title {
            font-size: 30px;
            font-weight: bold;
            font-family: "FCM", sans-serif;
          }
          
          #year {
            font-family: "Outfit Flex", sans-serif;
            font-weight: 200;
            text-transform: uppercase;
            font-size: 18px;
          }
        `;
    }

    static get properties() {
        return {
            cover: {type: String},
            title: {type: String},
            year: {type: Number},
            link: {type: String},
        };
    }

    constructor() {
        super();
        this.cover = '';
        this.title = '';
        this.year = 2023;
        this.link = '';
    }

    render() {
        return html`
            <div id="container">
                <a href="${this.link}">
                    <img src="posters/${this.cover}.jpeg" alt="" id="cover">
                </a>
                <div id="title">${this.title}</div>
                <div id="year">${this.year}</div>
            </div>
        `;
    }
}

window.customElements.define('lr-poster', LrPoster);
