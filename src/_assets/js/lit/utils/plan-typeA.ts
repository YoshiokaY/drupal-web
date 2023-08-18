import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { animate, fadeInSlow } from "@lit-labs/motion";
import { PropertyValues } from "lit-element";

const ww = window.innerWidth;

@customElement("plan-typea")
export class PlanTypeA extends LitElement {
  constructor() {
    super();
  }

  @property()
  open: boolean = false;
  target: number = 0;

  update(changedProperties: PropertyValues) {
    const target = this.getBoundingClientRect();
    const top = target.top + window.pageYOffset - 150;
    this.open === false &&
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    super.update(changedProperties);
  }

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
          <h3 class="-color01">シンプルプラン-A-</h3>
          <figure class="planImage">
            <img
              src="/wp_2021/wp-content/uploads/tyokuso_img001.jpg"
              srcset="
                /wp_2021/wp-content/uploads/tyokuso_img001.jpg 1x,
                /wp_2021/wp-content/uploads/tyokuso_img001.jpg 2x
              "
              alt="直葬プラン"
              width="560"
              height="373"
              loading="lazy"
            />
          </figure>
          <div class="iconBox">
            <h4>含まれているもの</h4>
            <div class="planIcon">
              <figure>
                <img
                  src="/wp_2021/wp-content/uploads/plan_icon04.svg"
                  alt="お棺"
                  width="134"
                  height="134"
                  loading="lazy"
                />
              </figure>
              <figure>
                <img
                  src="/wp_2021/wp-content/uploads/plan_icon101.svg"
                  alt="お棺花"
                  width="134"
                  height="134"
                  loading="lazy"
                />
              </figure>
              <figure>
                <img
                  src="/wp_2021/wp-content/uploads/plan_icon06.svg"
                  alt="仏衣"
                  width="134"
                  height="134"
                  loading="lazy"
                />
              </figure>
              <figure>
                <img
                  src="/wp_2021/wp-content/uploads/plan_icon07.svg"
                  alt="納棺の儀"
                  width="134"
                  height="134"
                  loading="lazy"
                />
              </figure>
              ${ww > 750 || this.open === true
                ? html`
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon10.svg"
                        alt="火葬手続き"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>

                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon15.svg"
                        alt="納骨セット"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon19.svg"
                        alt="ドライアイス（3日分）"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon20.svg"
                        alt="寝台車（病院→式場）"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon21.svg"
                        alt="霊柩車（式場→斎場）"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                  `
                : html``}
            </div>
            <button
              class="oPbtn spOnly${this.open === true ? " -open" : ""}"
              @click=${this._handleClick}
            >
              ${this.open === false ? "すべて見る" : "閉じる"}
            </button>
          </div>
          <p class="annotation">プランによって細かい詳細は変動致します。</p>
        </div>
      </div>`;
  }
  _handleClick(e: Event) {
    this.open = !this.open;
  }
}
