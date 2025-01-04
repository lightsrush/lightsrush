import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


export class LrFooter extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 0 64px;
        height: 64px;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: 300;
        color: #fff;
        background-color: #000;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div id="copyright">Copyright © 2025 lightsrush.com</div>
    `;
  }
}

window.customElements.define('lr-footer', LrFooter);
