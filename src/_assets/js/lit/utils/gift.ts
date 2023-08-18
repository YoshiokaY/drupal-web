import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import menu from "../json/menu.json";
import { animate, fadeInSlow } from "@lit-labs/motion";
import { PropertyValues } from "lit-element";

@customElement("option-gift")
export class gift extends LitElement {
  static styles = css`
    .inner {
      max-width: 793px;
    }
  `;
  constructor() {
    super();
  }

  update(changedProperties: PropertyValues) {
    //プランタイプCは項目と値段が違うため別データを読みにいく
    this.step =
      this.flag === "C" ? menu.data.gift2.number : menu.data.gift.number;
    const target = this.getBoundingClientRect();
    const top = target.top + window.pageYOffset - 50;
    window.scrollTo({
      top: top,
      behavior: "smooth",
    });
    super.update(changedProperties);
  }

  @property()
  step = menu.data.gift.number;
  price: number = menu.data.gift.price;
  gift: number = 0;
  flag: string = "";
  steps: number = 0;
  smart: string = "";

  render() {
    return html`
      <style>
        @import "/_assets/css/common.css";
        @import "/_assets/css/simulation.css";
      </style>
      <div
        id="gift"
        ${animate({
          in: fadeInSlow,
        })}
        class="planBox"
      >
        <div class="inner">
          <p class="stepText">${this.steps}</p>
          <h2>返礼品を選択する</h2>
          <div>
            <div class="selectBox">
              <select name="gift" id="gift-select" @change=${this._handleClick}>
                <option value="" selected disabled>選択してください</option>
                <option value="0">0名</option>

                ${Object.values(this.step).map((step: any, i: number) =>
                  this.smart === "a"
                    ? i < 1 && //やなぎだけ途中でbreak
                      html`
                        <option class="gift-0${i}" value="${step * this.price}">
                          ${step}名まで
                        </option>
                      `
                    : html`
                        <option class="gift-0${i}" value="${step * this.price}">
                          ${step}名まで
                        </option>
                      `
                )}
              </select>
            </div>
            <div class="tableBox">
              <table class="table01">
                <caption>
                  1名分の返礼品
                </caption>
                <tbody>
                  <tr>
                    <th>通夜返礼品</th>
                    <td>880円</td>
                  </tr>
                  <tr>
                    <th>葬儀返礼品</th>
                    <td>1,320円</td>
                  </tr>
                </tbody>
              </table>
              <p class="subTotal">
                <span>小計</span>${this.price.toLocaleString()}円(税込)
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  _handleClick(e: Event) {
    const { value } = e.target as HTMLSelectElement;
    const optionPrice = +value; //数値型に変換
    this.dispatchEvent(
      new CustomEvent("price-changed", { detail: { option: optionPrice } })
    );
    this.gift = optionPrice;
  }
}
