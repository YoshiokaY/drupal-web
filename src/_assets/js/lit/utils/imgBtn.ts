import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import menu from "../json/menu.json";
import { animate, fadeInSlow } from "@lit-labs/motion";
import { PropertyValues } from "lit-element";
import "./story-card";
import "./story-viewer";

@customElement("img-btn")
export class ImgBtn extends LitElement {
  static styles = css`
    .planBox {
      padding-bottom: 0;
    }
    .inner {
      padding: 0;
    }
  `;
  constructor() {
    super();
  }

  update(changedProperties: PropertyValues) {
    const target = this.getBoundingClientRect();
    const top = target.top + window.pageYOffset - 200;
    this.smart = this.flag === "C" ? menu.data.general : menu.data.smart;
    this.altar = this.smart[0].plan;
    window.scrollTo({
      top: top,
      behavior: "smooth",
    });
    super.update(changedProperties);
  }

  @property()
  flag: string = "";
  steps: number = 0;
  plan: string = "";
  smart = menu.data.smart;
  altar: string | null = this.smart[0].plan;
  discount: number = 0;
  planNames = this.smart
    .map(function (row) {
      return [row["plan"]];
    })
    .reduce(function (a, b) {
      return a.concat(b);
    });

  render() {
    return html` <style>
        @import "/_assets/css/common.css";
        @import "/_assets/css/simulation.css";
      </style>
      <div
        ${animate({
          in: fadeInSlow,
        })}
        class="planBox"
      >
        <div class="inner">
          <p class="stepText">${this.steps + 1}</p>
          <h2>お⾒送りのプランを<br />お選びください</h2>
          <p class="annotation -textCenter">
            横矢印でプランをお選びいただけます
          </p>
          <story-viewer .flag="${this.flag}">
            ${Object.values(this.smart).map(
              (smart: any, i: number) =>
                html`
                  <ul class="buttonContainer imgBtn">
                    <li>
                      <input
                        @click=${this._handleClick}
                        value="${smart.price}"
                        name="selectSmart"
                        type="radio"
                        id="smart-0${i}"
                        data-smart="${smart.plan}"
                        data-discount="${smart.discount}"
                      />
                      <label for="smart-0${i}" class="imgLabel">
                        <div class="checkContainer">
                          <div class="check"><div class="inside"></div></div>
                          ${smart.plan}
                        </div>
                        ${this.plan === "B"
                          ? html`
                              <img
                                src="/wp_2021/wp-content/uploads/family_img00${i +
                                1}.jpg"
                                srcset="
                                  /wp_2021/wp-content/uploads/family_img00${i +
                                  1}.jpg 1x,
                                  /wp_2021/wp-content/uploads/family_img00${i +
                                  1}.jpg 2x
                                "
                                alt="${smart.plan}"
                                width="326"
                                height="594"
                                loading="lazy"
                              />
                            `
                          : html`
                              <img
                                src="/wp_2021/wp-content/uploads/general_img00${i +
                                1}b.jpg"
                                srcset="
                                  /wp_2021/wp-content/uploads/general_img00${i +
                                  1}b.jpg 1x,
                                  /wp_2021/wp-content/uploads/general_img00${i +
                                  1}b.jpg 2x
                                "
                                alt="${smart.plan}"
                                width="326"
                                height="594"
                                loading="lazy"
                              />
                            `}
                        <span>${smart.text}</span>
                      </label>
                    </li>
                  </ul>
                `
            )}
          </story-viewer>
        </div>
      </div>`;
  }
  _handleClick(e: Event) {
    const { value } = e.target as HTMLButtonElement;
    const name = (e.currentTarget as HTMLInputElement).getAttribute(
      "data-smart"
    );
    const discount = (e.currentTarget as HTMLInputElement).getAttribute(
      "data-discount"
    );
    const planPrice = +value; //数値型に変換
    this.altar = name;
    this.dispatchEvent(
      new CustomEvent("price-changed", {
        detail: { altar: planPrice, discount: discount },
      })
    );
  }

  onSmart(eve: any) {
    this.altar = eve.detail.altar;
    this.discount = eve.detail.discount;
    this.dispatchEvent(
      new CustomEvent("price-changed", {
        detail: { altar: this.altar, discount: this.discount },
      })
    );
  }
}
