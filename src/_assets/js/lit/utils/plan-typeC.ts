import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import menu from "../json/menu.json";
import { animate, fadeInSlow } from "@lit-labs/motion";
import { PropertyValues } from "lit-element";

@customElement("plan-typec")
export class PlanTypeC extends LitElement {
  constructor() {
    super();
  }

  update(changedProperties: PropertyValues) {
    const target = this.getBoundingClientRect();
    const top = target.top + window.pageYOffset - 200;
    window.scrollTo({
      top: top,
      behavior: "smooth",
    });
    super.update(changedProperties);
  }

  @property()
  altar: string | null = menu.data.general[0].plan;
  general = menu.data.general;
  flag: string = "";
  steps: number = 0;
  planNames = menu.data.general
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
          <p class="stepText">${this.steps}</p>
          <h2>お⾒送りのプランをお選びください</h2>
          <ul class="buttonContainer imgBtn">
            ${Object.values(this.general).map(
              (general: any, i: number) =>
                html`
                  <li>
                    <input
                      @click=${this._handleClick}
                      value="${general.price}"
                      name="selectGeneral"
                      type="radio"
                      id="general-0${i}"
                      data-general="${general.plan}"
                      data-discount="${general.discount}"
                    />
                    <label for="general-0${i}" class="imgLabel">
                      <div class="checkContainer">
                        <div class="check"><div class="inside"></div></div>
                        ${general.plan}
                      </div>
                      <img
                        src="/wp_2021/wp-content/uploads/general_img00${i +
                        1}b.jpg"
                        srcset="
                          /wp_2021/wp-content/uploads/general_img00${i +
                          1}b.jpg 1x,
                          /wp_2021/wp-content/uploads/general_img00${i +
                          1}b.jpg 2x
                        "
                        alt="${general.plan}"
                        width="326"
                        height="594"
                        loading="lazy"
                      />
                      <span>${general.text}</span>
                    </label>
                  </li>
                `
            )}
          </ul>
        </div>
      </div>`;
  }
  _handleClick(e: Event) {
    const { value } = e.target as HTMLButtonElement;
    const name = (e.currentTarget as HTMLInputElement).getAttribute(
      "data-general"
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
    this.flag =
      this.altar === this.planNames[0]
        ? "a"
        : this.altar === this.planNames[1]
        ? "b"
        : this.altar === this.planNames[2]
        ? "c"
        : "";
  }
}
