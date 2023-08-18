import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { animate, fadeInSlow } from "@lit-labs/motion";
import { PropertyValues } from "lit-element";

const ww = window.innerWidth;

@customElement("general-typea")
export class GeneralTypeA extends LitElement {
  static styles = css`
    .planBox {
      padding-top: 0;
    }
  `;
  constructor() {
    super();
  }

  update(changedProperties: PropertyValues) {
    const target = this.getBoundingClientRect();
    const top = target.top + window.pageYOffset - 60;
    this.open === false &&
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    super.update(changedProperties);
  }

  @property()
  open: boolean = false;

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
          <h3 class="-color01">檜（ひのき）</h3>
          <figure class="planImage">
            <img
              src="/wp_2021/wp-content/uploads/general_img001.jpg"
              srcset="
                /wp_2021/wp-content/uploads/general_img001.jpg 1x,
                /wp_2021/wp-content/uploads/general_img001.jpg 2x
              "
              alt="檜（ひのき）"
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
                  src="/wp_2021/wp-content/uploads/plan_icon01.svg"
                  alt="祭壇"
                  width="134"
                  height="134"
                  loading="lazy"
                />
              </figure>
              <figure>
                <img
                  src="/wp_2021/wp-content/uploads/plan_icon02.svg"
                  alt="祭壇脇花"
                  width="134"
                  height="134"
                  loading="lazy"
                />
              </figure>
              <figure>
                <img
                  src="/wp_2021/wp-content/uploads/plan_icon03.svg"
                  alt="遺影写真"
                  width="134"
                  height="134"
                  loading="lazy"
                />
              </figure>
              <figure>
                <img
                  src="/wp_2021/wp-content/uploads/plan_icon04.svg"
                  alt="お棺"
                  width="134"
                  height="134"
                  loading="lazy"
                />
              </figure>
              ${ww > 750 || this.open === true
                ? html`
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon05.svg"
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
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon08.svg"
                        alt="湯灌"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon09.svg"
                        alt="受付用品"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
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
                        src="/wp_2021/wp-content/uploads/plan_icon11.svg"
                        alt="式スタッフ"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon12.svg"
                        alt="司会・音響設備"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon13.svg"
                        alt="メモリアルフォト"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon35.svg"
                        alt="メモリアルクルージング"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon14.svg"
                        alt="お寺様お菓子"
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
                        src="/wp_2021/wp-content/uploads/plan_icon16.svg"
                        alt="中陰壇"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon17.svg"
                        alt="搬送セット"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon18.svg"
                        alt="枕飾り"
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
                    <figure>
                      <img
                        src="/wp_2021/wp-content/uploads/plan_icon36.svg"
                        alt="出棺マイクロバス"
                        width="134"
                        height="134"
                        loading="lazy"
                      />
                    </figure>
                    <figure class="spOnly invisi"></figure>
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
          <p>
            湯灌の儀が含まれております。<br />湯灌の儀は、故人様のご洗体をおこない仏衣お着せ替えをしてご納棺致します。
          </p>
          <p class="annotation">プランによって細かい詳細は変動致します。</p>
        </div>
      </div>`;
  }
  _handleClick(e: Event) {
    this.open = !this.open;
  }
}
