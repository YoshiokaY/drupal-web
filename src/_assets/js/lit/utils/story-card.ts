import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import menu from "../json/menu.json";
import { animate, fadeInSlow } from "@lit-labs/motion";

@customElement("story-card")
export class StoryCard extends LitElement {
  static styles = css`
    #media {
      height: 100%;
    }
    #media ::slotted(*) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Default styles for content */
    #content {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
    }
    #content > slot::slotted(*) {
      margin: 0;
    }
  `;

  render() {
    return html`
      <div id="media">
        <slot name="media"></slot>
      </div>
      <div id="content">
        <slot></slot>
      </div>
    `;
  }
}
