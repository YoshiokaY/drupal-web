import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import menu from "../json/menu.json";
import { animate, fadeInSlow } from "@lit-labs/motion";
import { PropertyValues } from "lit-element";

@customElement("option-flower")
export class flower extends LitElement {
  @property()
  step = menu.data.flower;
  price: number = 0;
  flower: number = 0;

  constructor() {
    super();
  }

  //スクロール
  update(changedProperties: PropertyValues) {
    const target = this.getBoundingClientRect();
    const top = target.top + window.pageYOffset - 50;
    window.scrollTo({
      top: top,
      behavior: "smooth",
    });
    super.update(changedProperties);
  }

  render() {
    return html`
      <style>
        @import "/_assets/css/common.css";
        @import "/_assets/css/simulation.css";
      </style>
      <div
        id="flower"
        ${animate({
          in: fadeInSlow,
        })}
        class="planBox"
      >
        <div class="inner">
          <h2>枕花</h2>
          <div class="buttonContainer">
            ${Object.values(this.step).map(
              (step: any, i: number) =>
                html`
                  <button
                    class="flower-0${i} selectBtn"
                    value="${step.price}"
                    @click=${this._handleClick}
                  >
                    ${step.plan}
                  </button>
                `
            )}
          </div>
        </div>
      </div>
    `;
  }
  _handleClick(e: Event) {
    const { value } = e.target as HTMLButtonElement;
    const optionPrice = +value; //数値型に変換
    this.dispatchEvent(
      new CustomEvent("price-changed", { detail: { option: optionPrice } })
    );
    this.flower = optionPrice;
  }
}
