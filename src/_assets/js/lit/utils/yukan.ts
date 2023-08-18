import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import menu from "../json/menu.json";
import { animate, fadeInSlow } from "@lit-labs/motion";
import { PropertyValues } from "lit-element";

@customElement("option-yukan")
export class yukan extends LitElement {
  @property()
  step = menu.data.yukan;
  price: number = 0;
  yukan: number = 0;
  steps: number = 0;
  flag: string = "";

  constructor() {
    super();
  }

  //スクロール
  update(changedProperties: PropertyValues) {
    const target = this.getBoundingClientRect();
    const top = target.top + window.pageYOffset - 50;
    //プランタイプCは項目と値段が違うため別データを読みにいく
    this.step = this.flag === "C" ? menu.data.yukan2 : menu.data.yukan;
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
        id="yukan"
        ${animate({
          in: fadeInSlow,
        })}
        class="planBox"
      >
        <div class="inner">
          <p class="stepText">${this.steps}</p>
          <h2>ご湯灌の儀</h2>
          <ul class="buttonContainer">
            ${Object.values(this.step).map(
              (step: any, i: number) =>
                html`
                  <li>
                    <input
                      @click=${this._handleClick}
                      value="${step.price}"
                      name="selector"
                      type="radio"
                      id="yukan-0${i}"
                    />
                    <label for="yukan-0${i}">
                      ${step.plan}
                      <span>${step.text}</span>
                    </label>
                    <div class="check"><div class="inside"></div></div>
                  </li>
                `
            )}
          </ul>
          <p class="planText">
            ご納棺の前に故人様を洗い清めることを湯灌といいます。<br />
            簡易湯灌は、故人様を仏衣のお着せ替えを<br />湯灌の儀は、故人様のご洗体をおこない仏衣お着せ替えをしてご納棺致します。
          </p>
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
    this.yukan = optionPrice;
  }
}
