import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


export class LrHeader extends LitElement {
  static get styles() {
    return css`
      :host {
        padding: 64px 64px 0 64px;
        box-sizing: border-box;
        align-items: center;
        width: 100vw;
        position: sticky;
        top: -32px;
        height: 128px;
        
        display: flex;
        flex-flow: row;
        z-index: 10;
      }

      #fill {
        flex-grow: 1;
      }

      #logo a, #logo img { height: 64px; }
      
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
      }

      #nav a:hover {
        font-weight: 320;
      }
    `;
  }

  static get properties() {
    return {
      nav: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.nav = false;
  }

  render() {
    return html`
      <a href="/" id="logo"><img src="../assets/lights_rush_PNG.png" alt=""></a>
      <div id="fill"></div>
      ${this.nav ? html`
        <div id="nav">
          <a href=""><div>about us</div></a>
          <a href=""><div>productions</div></a>
        </div>
      ` : null}
    `;
  }
}

window.customElements.define('lr-header', LrHeader);