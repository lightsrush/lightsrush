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
            margin: auto;
            padding-bottom: 8px;
          }

          #title {
            font-size: 30px;
            font-weight: bold;
            font-family: "FCM", sans-serif;
          }
          
          #year {
            font-size: 18px;
            font-family: "Outfit Flex", sans-serif;
            font-weight: 200;
            text-transform: uppercase;
          }

          @media (max-width: 599px) {
            #cover img { height: 180px; }
            #title { font-size: 24px; }
            #year { font-size: 14px; }
          }
          
          @media (min-width: 600px) {
            #cover img { height: 300px; }
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
                <a href="${this.link}" id="cover">
                    <img src="posters/${this.cover}.jpeg" alt="">
                </a>
                <div id="title">${this.title}</div>
                <div id="year">${this.year}</div>
            </div>
        `;
    }
}

window.customElements.define('lr-poster', LrPoster);
