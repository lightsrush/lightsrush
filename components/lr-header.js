import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


export class LrHeader extends LitElement {
  static get styles() {
    return css`
      .container {
        box-sizing: border-box;
        align-items: center;
        width: 100vw;
        position: sticky;
        display: flex;
        flex-flow: row;
        z-index: 10;
      }
      
      .compact {
        padding: 16px 64px;
        top: 0;
        height: 96px;
        background-color: #000;
      }
      
      .title {
        padding: 64px 64px 32px;
        top: -32px;
        height: 160px;
      }

      #fill {
        flex-grow: 1;
      }

      a, #logo img { height: 64px; }
      
      #nav {
        display: flex;
        flex-flow: row;
      }

      #nav a {
        color: #fff;
        font-size: 32px;
        font-weight: 100;
        padding-left: 32px;
        font-style: italic;
        text-decoration: none;
        transition: font-weight ease-in 300ms;

        display: flex;
        align-items: center;
      }

      #nav a:hover {
        font-weight: 320;
      }
    `;
  }

  static get properties() {
    return {
      look: {type: String},
    };
  }

  constructor() {
    super();
    this.look = "";
  }

  render() {
    return html`
      <div class="container ${this.look}">
        <a href="/" id="logo"><img src="../assets/lights_rush_PNG.png" alt=""></a>
        <div id="fill"></div>
        <div id="nav">
          <a href="/about">about us</a>
          <a href="/productions">productions</a>
        </div>
      </div>
    `;
  }
}

window.customElements.define('lr-header', LrHeader);
