import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import menu from "../json/menu.json";
import { animate, fadeInSlow } from "@lit-labs/motion";
import { PropertyValues } from "lit-element";

@customElement("option-morgue")
export class morgue extends LitElement {
  @property()
  step = menu.data.morgue;
  price: number = 0;
  morgue: number = 0;
  steps: number = 0;
  flag: string = "";

  constructor() {
    super();
  }

  //スクロール
  update(changedProperties: PropertyValues) {
    if (this.flag === "A") {
      this.steps = 1;
      console.log(this.steps);
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      <style>
        @import "/_assets/css/common.css";
        @import "/_assets/css/simulation.css";
      </style>
      <div id="morgue" class="planBox">
        <div class="inner">
          <p class="stepText">${this.steps}</p>
          <h2>ご⾃宅か安置室を<br class="spOnly" />ご選択ください</h2>
          <ul class="buttonContainer">
            ${Object.values(this.step).map(
              (step: any, i: number) =>
                html`
                  <li>
                    <input
                      @click=${this._handleClick}
                      value="${step.price}"
                      name="selectMorgue"
                      type="radio"
                      id="morgue-0${i}"
                    />
                    <label for="morgue-0${i}">
                      ${step.plan}
                      <span>${step.text}</span>
                    </label>
                    <div class="check"><div class="inside"></div></div>
                  </li>
                `
            )}
          </ul>
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
    this.morgue = optionPrice;
  }
}
