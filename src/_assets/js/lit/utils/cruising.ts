import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import menu from "../json/menu.json";
import { animate, fadeInSlow } from "@lit-labs/motion";
import { PropertyValues } from "lit-element";

@customElement("option-cruising")
export class cruising extends LitElement {
  constructor() {
    super();
  }

  update(changedProperties: PropertyValues) {
    const target = this.getBoundingClientRect();
    const top = target.top + window.pageYOffset - 50;
    //プランタイプCは項目と値段が違うため別データを読みにいく
    this.step = this.flag === "C" ? menu.data.cruising2 : menu.data.cruising;
    window.scrollTo({
      top: top,
      behavior: "smooth",
    });
    super.update(changedProperties);
  }

  @property()
  step = menu.data.cruising;
  price: number = 0;
  cruising: number = 0;
  steps: number = 0;
  flag: string = "";

  render() {
    return html`
      <style>
        @import "/_assets/css/common.css";
        @import "/_assets/css/simulation.css";
      </style>
      <div
        id="cruising"
        ${animate({
          in: fadeInSlow,
        })}
        class="planBox"
      >
        <div class="inner">
          <p class="stepText">${this.steps}</p>
          <h2>メモリアクルージング<br class="spOnly" />オプションを選択する</h2>
          <ul class="buttonContainer">
            ${Object.values(this.step).map(
              (step: any, i: number) =>
                html`
                  <li>
                    <input
                      @click=${this._handleClick}
                      value="${step.price}"
                      name="selectCruising"
                      type="radio"
                      id="cruising-0${i}"
                    />
                    <label for="cruising-0${i}">
                      ${step.plan}
                      <span>${step.text}</span>
                    </label>
                    <div class="check"><div class="inside"></div></div>
                  </li>
                `
            )}
          </ul>
          <p class="planText">
            故⼈様の思い出の道をゆっくりとドライブするように通ったり、好きだった曲を⾞内でおかけすることもございます。<br />ご移動の際にも、故⼈様との想い出に浸ってください。<br />
            クルージングAは片道おおむね30km・3時間以内になります。<br />クルージングBは片道おおむね50km・4時間以内になります。
          </p>
        </div>
      </div>
    `;
  }

  _handleClick(e: Event) {
    const { value } = e.target as HTMLInputElement;
    const optionPrice = +value; //数値型に変換
    this.dispatchEvent(
      new CustomEvent("price-changed", { detail: { option: optionPrice } })
    );
    this.cruising = optionPrice;
  }
}
