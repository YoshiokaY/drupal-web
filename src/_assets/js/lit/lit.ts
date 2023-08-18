import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { animate, fadeInSlow } from "@lit-labs/motion";
import menu from "./json/menu.json";
import "./utils/price-display";
import "./utils/morgue";
import "./utils/plan-typeA";
import "./utils/plan-typeB";
import "./utils/plan-typeC";
import "./utils/yukan";
import "./utils/dish";
import "./utils/cruising";
import "./utils/gift";
import "./utils/story-viewer";
import "./utils/smart-typeA";
import "./utils/smart-typeB";
import "./utils/general-typeA";
import "./utils/general-typeB";
import "./utils/general-typeC";
import "./utils/imgBtn";

const ww = window.innerWidth;

@customElement("my-element")
export class MyElement extends LitElement {
  @property()
  //jsonデータ取得
  list = menu.data.planName;
  //プランの名前を抽出して配列作成
  planNames = menu.data.planName
    .map(function (row) {
      return [row["plan"]];
    })
    .reduce(function (a, b) {
      return a.concat(b);
    });
  //プランの割引値を抽出して配列作成
  discountPrice = menu.data.planName
    .map(function (row) {
      return [row["discount"]];
    })
    .reduce(function (a, b) {
      return a.concat(b);
    });

  @property()
  name: string | null = ""; //プラン名
  discount: number = 0; //会員割引
  kaiin: number = 0; //会員価格
  plan: number = 0; //プラン
  altar: number = 0; //祭壇
  morgue: number = 0; //安置
  yukan: number = 0; //湯灌
  dish: number = 0; //料理
  cruising: number = 0; //クルージング
  gift: number = 0; //返礼品
  total: number = 0; //合計金額
  step: number = 0; //進行度
  displayedStepCnt: number = 0; //現在表示中のSTEP数
  flag: string = ""; //プランフラグ
  smart: string = ""; //スマートプランフラグ
  general: string = ""; //スタンダードプランフラグ
  end: boolean = false; //エンドフラグ

  @state() _panData: { isFinal?: boolean; deltaX?: number } = {};

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        @import "/_assets/css/common.css";
        @import "/_assets/css/simulation.css";
      </style>
      <div class="inner">
        <ul
          class="buttonContainer"
          id="planStep"
          ${animate({
            in: fadeInSlow,
          })}
        >
          ${Object.values(this.list).map(
            (item: any, i: number) =>
              html`
                <li>
                  <input
                    @click=${this._handleClick}
                    class=""
                    value="${item.price}"
                    name="selector"
                    type="radio"
                    id="select01-${i}"
                    data-plan="${item.plan}"
                  />
                  <label for="select01-${i}">
                    ${item.plan}
                    <span>${item.text}</span>
                  </label>
                  <div class="check"><div class="inside"></div></div>
                </li>
              `
          )}
        </ul>
      </div>
      <div class="highlight">
        <!-- プラン -->
        ${this.flag === "A"
          ? html` <plan-typea></plan-typea> `
          : this.flag === "B"
          ? ww < 750
            ? html`
                <img-btn @price-changed=${this.onSmart}></img-btn>
                ${this.smart === "a"
                  ? html`<smart-typea></smart-typea> `
                  : this.smart === "b"
                  ? html`<smart-typeb></smart-typeb> `
                  : html``}
              `
            : html`
                <plan-typeb
                  .step=${this.step}
                  @price-changed=${this.onSmart}
                  .steps="${1}"
                >
                </plan-typeb>
                ${this.smart === "a"
                  ? html`<smart-typea></smart-typea> `
                  : this.smart === "b"
                  ? html`<smart-typeb></smart-typeb> `
                  : html``}
              `
          : this.flag === "C"
          ? ww < 750
            ? html`
                <img-btn
                  @price-changed=${this.onGeneral}
                  .flag=${this.flag}
                ></img-btn>
                ${this.general === "a"
                  ? html`<general-typea></general-typea> `
                  : this.general === "b"
                  ? html`<general-typeb></general-typeb> `
                  : this.general === "c"
                  ? html`<general-typec></general-typec> `
                  : html``}
              `
            : html`
                <plan-typec
                  .step=${this.step}
                  @price-changed=${this.onGeneral}
                  .steps="${1}"
                >
                </plan-typec>
                ${this.general === "a"
                  ? html`<general-typea></general-typea> `
                  : this.general === "b"
                  ? html`<general-typeb></general-typeb> `
                  : this.general === "c"
                  ? html`<general-typec></general-typec> `
                  : html``}
              `
          : html``}
        ${(this.displayedStepCnt >= 1 && this.flag === "A") ||
        (this.displayedStepCnt >= 2 && this.flag !== "A")
          ? html`
              <span class="border"></span>
              <option-morgue
                @price-changed=${this.onMorgue}
                .steps="${this.flag === "A" ? 1 : 2}"
                .flag="${this.flag}"
              ></option-morgue>
            `
          : html``}
        ${(this.displayedStepCnt >= 2 && this.flag === "A") ||
        (this.displayedStepCnt >= 3 && this.flag === "B")
          ? html`
              <span class="border"></span>
              <option-yukan
                @price-changed=${this.onYukan}
                .steps="${this.flag === "A" ? 2 : 3}"
                .flag="${this.flag}"
              ></option-yukan>
            `
          : html``}
        ${(this.displayedStepCnt >= 4 && this.flag !== "A") ||
        (this.displayedStepCnt >= 3 && this.flag === "C")
          ? html`
              <span class="border"></span>
              <option-cruising
                @price-changed=${this.onCrusing}
                .steps="${this.flag === "B" ? 4 : 3}"
                .flag="${this.flag}"
              ></option-cruising>
            `
          : html``}
        ${this.displayedStepCnt >= 5 && this.smart === "a"
          ? html`
              <span class="border"></span>
              <option-gift
                @price-changed=${this.onGift}
                .steps=${5}
                .smart="${this.smart}"
              ></option-gift>
            `
          : (this.displayedStepCnt >= 5 && this.smart !== "a") ||
            (this.displayedStepCnt >= 4 && this.flag === "C")
          ? html`
              <span class="border"></span>
              <option-dish
                @price-changed=${this.onDish}
                .flag=${this.flag}
                .steps="${this.flag === "B" ? 5 : 4}"
              ></option-dish>
            `
          : html``}
        ${(this.displayedStepCnt >= 6 && this.smart !== "a") ||
        (this.displayedStepCnt >= 5 && this.flag === "C")
          ? html`
              <span class="border"></span>
              <option-gift
                @price-changed=${this.onGift}
                .flag=${this.flag}
                .steps="${this.flag === "B" ? 6 : 5}"
              ></option-gift>
            `
          : html``}
      </div>
      ${(this.displayedStepCnt >= 1 && this.flag === "A") ||
      (this.displayedStepCnt >= 2 && this.flag !== "A")
        ? html` <div class="totalPadding"></div>
            <total-price
              .kaiin=${this.kaiin}
              .total=${this.total}
              .end=${this.end}
            ></total-price>`
        : html``}
    `;
  }
  // -----------------------------------------
  // 内部変数の初期化
  // -----------------------------------------
  variableReset() {
    this.altar = 0;
    this.morgue = 0;
    this.yukan = 0;
    this.dish = 0;
    this.cruising = 0;
    this.gift = 0;
    this.end = false;
    this.smart = "";
    this.general = "";
    this.discount = 0;
    this.step = 0;
  }
  // -----------------------------------------
  // 葬儀プランの選択肢クリック時のイベントハンドラ
  // -----------------------------------------
  _handleClick(e: Event) {
    //TSではevent.target.valueを取れないため、定義
    const { value } = e.target as HTMLInputElement;
    const name = (e.currentTarget as HTMLInputElement).getAttribute(
      "data-plan"
    );
    // プラン名の取得
    this.name = name;
    // プランの状態フラグを取得
    const clickedPlan =
      this.name === this.planNames[0]
        ? "A"
        : this.name === this.planNames[1]
        ? "B"
        : this.name === this.planNames[2]
        ? "C"
        : "";
    // 選択中の葬儀プランクリック時には何もしない
    if (clickedPlan === this.flag) {
      return;
    }

    // 情報の保存
    this.variableReset(); // 内部データのリセット
    const planPrice = +value; // 数値型に変換
    this.plan = planPrice; // プラン料金
    this.flag = clickedPlan; //プランの状態フラグ設定

    //プランAとその他の分岐
    if (this.flag === "A") {
      // 次に選択するお見送りプランがないため、この葬儀プランの値を保存する
      this.total = planPrice;
      this.discount = this.discountPrice[0];
      this.kaiin = this.total - this.discount;
      this.step = 0;
    } else {
      this.total = 0;
      this.kaiin = 0;
      this.step = 0;
    }
    this.displayedStepCnt = 1; // 表示中のSTEP数は１になる

    console.log("プラン" + this.flag);
    console.log("割引：" + this.discount);

    this.refreshSubElements();
    return super.requestUpdate(); //再描画
  }

  // -----------------------------------------
  // 金額を更新する
  // -----------------------------------------
  totalChange() {
    //合計値と会員価格を出す関数
    let result = [
      this.plan,
      this.altar,
      this.morgue,
      this.yukan,
      this.dish,
      this.cruising,
      this.gift,
    ];
    this.total = result.reduce(function (sum, element) {
      return sum + element;
    }, 0);
    console.log("ステップ" + this.step);
    this.kaiin = this.total - this.discount;
  }

  // -----------------------------------------
  // 子要素の表示をリフレッシュ
  // -----------------------------------------
  refreshSubElements() {
    const selectors = ["option-morgue"];
    for (let i = 0; i < selectors.length; i++) {
      if (this.shadowRoot!.querySelector(selectors[i])) {
        // inputのchecked削除
        const inputs = this.shadowRoot!.querySelector(
          selectors[i]
        )!.shadowRoot!.querySelectorAll("input")!;
        inputs.forEach((input) => {
          (<any>input).checked! = false;
        });
        // 再表示
        (<LitElement>(
          this.shadowRoot!.querySelector(selectors[i])!
        )).requestUpdate();
      }
    }
  }

  // -----------------------------------------
  // スマートプランの祭壇（お見送りプラン）クリック時の処理
  // -----------------------------------------
  onSmart(eve: any) {
    // JSON内の祭壇情報を取得
    const altar = this.flag === "C" ? menu.data.general : menu.data.smart;
    const altarNames = altar
      .map(function (row) {
        return [row["price"]];
      })
      .reduce(function (a, b) {
        return a.concat(b);
      });
    // クリックした祭壇の種類を取得
    const clickedAltar =
      eve.detail.altar === altarNames[0]
        ? "a"
        : eve.detail.altar === altarNames[1]
        ? "b"
        : eve.detail.altar === altarNames[2]
        ? "c"
        : "";
    // 選択中の葬儀プランクリック時には何もしない
    if (clickedAltar === this.smart) {
      return;
    }

    // 情報の保存
    this.variableReset(); // 内部データのリセット
    this.altar = eve.detail.altar; // 祭壇の料金
    this.discount = eve.detail.discount; // 割引額
    this.smart = clickedAltar; // 祭壇の種類
    this.step = 1;
    this.displayedStepCnt = 2;

    // 金額を更新
    this.totalChange();

    console.log("祭壇：" + this.altar);
    console.log("割引：" + this.discount);
    this.refreshSubElements();
    return super.requestUpdate();
  }

  // -----------------------------------------
  // スタンダードプランの祭壇（お見送りプラン）クリック時の処理
  // -----------------------------------------
  onGeneral(eve: any) {
    // JSON内の祭壇情報を取得
    const altars = menu.data.general
      .map(function (row) {
        return [row["price"]];
      })
      .reduce(function (a, b) {
        return a.concat(b);
      });
    // クリックした祭壇の種類を取得
    const clickedAltar =
      eve.detail.altar === altars[0]
        ? "a"
        : eve.detail.altar === altars[1]
        ? "b"
        : eve.detail.altar === altars[2]
        ? "c"
        : "";
    // 選択中の葬儀プランクリック時には何もしない
    if (clickedAltar === this.general) {
      return;
    }

    // 情報の保存
    this.variableReset(); // 内部データのリセット
    this.altar = eve.detail.altar; // 祭壇の料金
    this.discount = eve.detail.discount; // 割引額
    this.general = clickedAltar; // 祭壇の種類
    this.step = 1;
    this.displayedStepCnt = 2;

    // 金額を更新
    this.totalChange();

    console.log("祭壇：" + this.altar);
    this.refreshSubElements();
    return super.requestUpdate();
  }
  //安置
  onMorgue(eve: any) {
    this.morgue = eve.detail.option;
    if (this.flag === "A") {
      this.step = 1;
    } else {
      this.step = 2;
    }
    this.totalChange();
    if (this.step >= this.displayedStepCnt) {
      this.displayedStepCnt++;
    }
    console.log("安置：" + this.morgue);
    return super.requestUpdate();
  }
  //湯灌
  onYukan(eve: any) {
    this.yukan = eve.detail.option;
    this.totalChange();
    if (this.flag === "A") {
      this.end = true;
    }
    if (this.flag === "A") {
      this.step = 2;
    } else {
      this.step = 3;
    }
    if (this.step >= this.displayedStepCnt) {
      this.displayedStepCnt++;
    }
    console.log("湯灌：" + this.yukan);
    return super.requestUpdate();
  }
  //クルージング
  onCrusing(eve: any) {
    this.cruising = eve.detail.option;
    this.totalChange();
    this.step = 4;
    console.log("クルージング：" + this.cruising);
    if (this.step >= this.displayedStepCnt) {
      this.displayedStepCnt++;
    }
    return super.requestUpdate();
  }

  //料理
  onDish(eve: any) {
    this.dish = eve.detail.option;
    this.totalChange();
    if (this.flag === "B") {
      this.step = 6;
    } else {
      this.step = 5;
    }
    if (this.step >= this.displayedStepCnt) {
      this.displayedStepCnt++;
    }
    console.log("料理：" + this.dish);
    return super.requestUpdate();
  }

  //返礼品
  onGift(eve: any) {
    this.gift = eve.detail.option;
    this.totalChange();

    this.step = 5;
    if (this.step >= this.displayedStepCnt) {
      this.displayedStepCnt++;
    }
    const top = window.pageYOffset + 400;
    if (this.gift === 0 && this.end === false) {
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
      this.end = true;
    }
    this.end = true;
    console.log("返礼品：" + this.gift);
    return super.requestUpdate();
  }
}
