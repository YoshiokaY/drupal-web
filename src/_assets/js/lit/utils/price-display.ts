import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PropertyValues } from "lit-element";
import { animate, fadeInSlow, flyBelow } from "@lit-labs/motion";

const target2 = document.querySelector<HTMLElement>(".naviContainer")!;

@customElement("total-price")
export class totalPrice extends LitElement {
  @property()
  total: number = 0;
  kaiin: number = 0;
  end: boolean = false;

  constructor() {
    super();
  }

  update(changedProperties: PropertyValues) {
    const fixedTarget = this;
    const options = {
      root: null, // 今回はビューポートをルート要素とする
      rootMargin: "0px 0px", // ビューポートの中心を判定基準にする
      threshold: 0, // 閾値は0~1
    };
    const callback = (entries: any, options: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          fixedTarget.classList.add("-static");
          fixedTarget.shadowRoot
            ?.getElementById("totalPrice")
            ?.classList.add("-static");
        } else {
          fixedTarget.classList.remove("-static");
          fixedTarget.shadowRoot
            ?.getElementById("totalPrice")
            ?.classList.remove("-static");
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target2);
    const target = this.getBoundingClientRect();
    const top = target.top + window.pageYOffset - 50;
    if (this.end === true) {
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
      this.end = false;
    }
    super.update(changedProperties);
  }

  render() {
    return html` <style>
        @import "/_assets/css/common.css";
        @import "/_assets/css/simulation.css";
      </style>
      <div
        ${animate({
          in: flyBelow,
        })}
        class="inner priceInner"
        id="totalPrice"
      >
        <div class="textContainer">
          <div class="priceContainer">
            <p class="priceText -color01">
              <span>会員<br />価格</span>
              <strong>${this.kaiin.toLocaleString()}</strong
              ><ruby><rb>円</rb><rp>（</rp><rt>（税込）</rt><rp>）</rp></ruby>
            </p>
            <p class="priceText">
              <span>一般<br />価格</span>
              <strong>${this.total.toLocaleString()}</strong
              ><ruby><rb>円</rb><rp>（</rp><rt>（税込）</rt><rp>）</rp></ruby>
            </p>
          </div>
          <p class="noteContainer">
            <span class="note"
              >※⽕葬料⾦・宗教家様へのお礼は含まれておりません。</span
            ><span class="note"
              >※表示されている会員価格はゴールド会員価格を表示しています。</span
            >
          </p>
        </div>
        <div class="btnContainer">
          <a href="/membership/merit/"
            ><img
              src="/wp_2021/wp-content/uploads/simu_btn01_2.png"
              alt="会員登録"
              width="139"
              height="139"
              loading="lazy"
              class="pcOnly fixOnly" /><img
              src="/wp_2021/wp-content/uploads/simu_btn01.png"
              alt="会員登録"
              width="139"
              height="139"
              loading="lazy"
              class="pcOnly staticOnly" /><img
              src="/wp_2021/wp-content/uploads/simu_btn01_sp.png"
              alt="会員登録"
              width="375"
              height="72"
              loading="lazy"
              class="spOnly" /></a
          ><a href="/inquiry/"
            ><img
              src="/wp_2021/wp-content/uploads/simu_btn02_2.png"
              alt="資料請求"
              width="139"
              height="139"
              loading="lazy"
              class="pcOnly fixOnly" /><img
              src="/wp_2021/wp-content/uploads/simu_btn02.png"
              alt="資料請求"
              width="139"
              height="139"
              loading="lazy"
              class="pcOnly staticOnly" /><img
              src="/wp_2021/wp-content/uploads/simu_btn02_sp.png"
              alt="資料請求"
              width="375"
              height="72"
              loading="lazy"
              class="spOnly"
          /></a>
        </div>
      </div>`;
  }
}
