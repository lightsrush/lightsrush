import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


export class LrProduction extends LitElement {
    static get styles() {
        return css`
          :root {
            font-weight: 300;
          }
          
          #container {
            width: 850px;
            padding: 16px;

            display: flex;
            flex-flow: row;
          }

          #cover {
            height: 400px;
          }
          
          #sticky {
            position: sticky;
            top: 128px;
            height: fit-content;
            min-width: 300px;
            max-width: 300px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: end;
          }

          #right {
            padding-left: 32px;
            display: flex;
            flex-flow: column;
          }

          #title {
            font-size: 38px;
            font-weight: bolder;
          }

          #subtitle {
            font-size: 18px;
          }
          
          .category {
            padding-top: 24px;
            padding-bottom: 8px;
            font-size: 24px;
            font-weight: 400;
          }

          #description {
            font-size: 18px;
          }

          .nomination {
            font-size: 18px;
            font-weight: 200;
          }
          
          .nomination + .nomination {
            padding-top: 8px;
          }

          .prize {
            font-weight: 400;
            font-style: italic;
          }

          .links {
            display: flex;
            flex-flow: row;
            flex-wrap: wrap;
          }

          .link {
            padding: 16px 16px 16px 0;
          }

          .link a {
            color: #000;
            padding: 8px 12px;
            border-radius: 24px;
            background-color: #eee;
            text-decoration: none;
            text-transform: uppercase;
            transition: background-color ease-in 300ms;
          }

          a:hover {
            background-color: #ddd;
          }
        `;
    }

    static get properties() {
        return {
            cover: {type: String},
            year: {type: Number},
            title: {type: String},
            subtitle: {type: String},
            description: {type: String},
            nominations: {type: String},
            links: {type: String},
        };
    }

    constructor() {
        super();
        this.cover = '';
        this.year = 2023;
        this.title = '';
        this.subtitle = '';
        this.description = '';
        this.nominations = '';
        this.links = '';
    }

    render() {
        return html`
            <div id="container">
                <div id="sticky">
                    <img src="../assets/productions/${this.cover}" alt="" id="cover">
                </div>
                <div id="right">
                    <div id="title">${this.title} (${this.year})</div>
                    <div id="subtitle">${this.subtitle}</div>
                    <div class="category">Synopsis</div>
                    <div id="description">${this.description}</div>
                    <div class="category">Nominations</div>
                    ${this.nominations
                            .split("\n")
                            .map((line) => {
                                let parts = line.split(";")
                                if (parts.length === 1 && parts[0] === "") return html``
                                else if (parts.length === 1)
                                    return html`
                                        <div class="nomination"><span class="ref">${parts[0]}</span></div>
                                    `
                                else
                                    return html`
                                        <div class="nomination">
                                            <span class="prize">${parts[0]}</span><br/>
                                            <span class="ref">${parts[1]}</span>
                                        </div>
                                    `
                            })
                    }
                    <div class="category">Watch on</div>
                    <div class="links">
                        ${this.links.split("\n").map((line) => {
                            let parts = line.split(";")
                            if (parts.length === 1) return null
                            return html`
                                <div class="link"><a href="${parts[1]}">${parts[0]}</a></div>`
                        })}
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('lr-production', LrProduction);
