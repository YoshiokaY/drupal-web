import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

//jsonAPI
let archive = "http://localhost:50476/jsonapi/node/news/";

async function getJson(url: string) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json.data);
    return json.data;
  } catch (error) {
    //200以外が返ってきた場合
    console.log("JSONを取得できませんでした：" + error);
    return null;
  }
}

let list: string[] = await getJson(archive);

@customElement("my-element")
export class MyElement extends LitElement {
  // list: any;
  constructor() {
    super();
  }

  render() {
    console.log(list);
    return html`
      <style>
        @import "/_assets/css/style.css";
      </style>
      <div class="contentInner">
        <h2 class="c_ttl_h2">新着情報</h2>
        <dl class="newsList">
          ${list.map((item: any) => {
            //投稿日を任意の書式に変換
            const time = new Date(item.attributes.created);
            //カテゴリーのUUIDから名前とクラス名を変数に格納
            let cat_id = item.relationships.field_category.data.id;
            const cat =
              cat_id == "da0ebc23-768e-445b-ae57-88de51ce1671"
                ? ["お知らせ", "info"]
                : cat_id == "d27d631b-65ef-4e52-8b67-7d9326898ddc"
                ? ["ニュースリリース", "release"]
                : ["イベント", "event"];
            return html`
              <div class="newsList_item">
                <dt>
                  <time>${time.toLocaleDateString()}</time>
                  <span class="catBtn -${cat[1]}" data-cat="${cat_id}"
                    >${cat[0]}</span
                  >
                </dt>
                <dd>
                  <a href="/news/?id=${item.id}"> ${item.attributes.title} </a>
                </dd>
              </div>
            `;
          })}
        </dl>
        <h3 class="c_ttl_h3">ソートボタン</h3>
        <button @click=${this._handleClick} data-sort="title" data-desc="true">
          昇順
        </button>
        <button @click=${this._handleClick} data-sort="title" data-desc="false">
          降順
        </button>
        <button
          @click=${this._handleFilter}
          data-sort="title"
          data-desc="false"
        >
          テストで絞り込み
        </button>
      </div>
    `;
  }
  async _handleClick(e: Event) {
    const target = e.currentTarget as HTMLElement;
    //ソートボタンのdata属性によってソートルールをセット
    const set = target.getAttribute("data-sort");
    const desc = target.getAttribute("data-desc");
    const url = `http://localhost:50476/jsonapi/node/news/?sort[sort-${set}][path]=${set}`;
    const sort = "?sort[sort-title][path]=title";
    const sort2 =
      "?sort[sort-title][path]=title&sort[sort-title][direction]=DESC";
    if (desc != "true") {
      list = await getJson(archive + sort);
      await this.render();
    } else {
      list = await getJson(archive + sort2);
      await this.render();
    }
    // render() 関数を呼び出す
  }
  async _handleFilter(e: Event) {
    const target = e.currentTarget as HTMLElement;
    const filter =
      "?filter[label-a][condition][path]=title&filter[label-a][condition][operator]=CONTAINS&filter[label-a][condition][value]=テスト";
    // const text = target.textContent;
    archive =
      "http://localhost:50476/jsonapi/node/news/?filter[label-a][condition][path]=title&filter[label-a][condition][operator]=CONTAINS&filter[label-a][condition][value]=テスト";
    console.log(archive);
    list = await getJson(archive);
    this.render();
  }
}
