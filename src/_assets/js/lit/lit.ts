import { html, css, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

//JSON API
const port = "49328";
const news = "http://localhost:" + port + "/jsonapi/node/news/";
const field = "?include=field_eyecatch&fields[file--file]=uri,url";

const listQuota = 3;
const pager = `&page[limit]=${listQuota}`;

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Object })
  //リアクティブな値（この値が変わったら再描画）を設定
  responseData: any;
  sortTitle: boolean = false;
  news: boolean = false;
  catId: string = "";
  cat: string[] = ["お知らせ", "info"];
  page: string = "";
  query: string = "";
  limit: string = "&page[limit]=3";

  //非同期処理でJSON APIを受け取る
  async connectedCallback() {
    super.connectedCallback();
    await this.getJson(news + field + this.limit);
  }

  //実際のJSON API参照
  async getJson(url: string) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        //JSONAPIの戻り値をリアクティブな値に設定
        this.responseData = data;
      } else {
        throw new Error("APIリクエストが失敗しました");
      }
    } catch (error) {
      console.error(error);
    }
  }

  static styles = css`
    /* ここにスタイルを定義する */
  `;
  firstUpdated() {
    this.query = window.location.search.slice(4);
    this.page = window.location.pathname;
    if (this.page === "/news/") {
      this.news = true;
      this.limit = "&page[limit]=3";
      this.getJson(news + this.query + field + this.limit);
    }
  }

  render() {
    if (!this.responseData) {
      return html`<div>Loading...</div>`;
    }

    // JSON APIのdataキーを参照
    const content = this.responseData.data;
    const include = this.responseData.included;
    const ASC_TEXT = "昇順";
    const DESC_TEXT = "降順";

    return html`
      <style>
        @import "/_assets/css/style.css";
      </style>
      <div class="contentInner">
        ${this.news === false
          ? html`
        <h2 class="c_ttl_h2">新着情報</h2>
        <dl class="newsList">
          ${content.map((item: any) => {
            //投稿日を任意の書式に変換
            const time = new Date(item.attributes.created);
            //カテゴリーのUUIDから名前とクラス名を変数に格納
            let cat_id = item.relationships.field_category.data.id;
            const cat =
              cat_id == "da0ebc23-768e-445b-ae57-88de51ce1671"
                ? ["お知らせ", "info"]
                : cat_id == "0cf53627-0fa2-40d3-b78d-6eed417abbb0"
                ? ["ニュースリリース", "release"]
                : ["採用情報", "recruitment"];
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
        <ul>
          <li>
            タイトル：<button
              @click=${this._handleClick}
              data-sort="title"
              data-desc="true"
              class="c_btn"
            >
              降順
            </button>
          </li>
          <li>
            日付：<button
              @click=${this._handleClick}
              data-sort="created"
              data-desc="false"
              class="c_btn"
            >
              昇順
            </button>
          </li>
        </ul>
        <!-- <button @click=${this._handleFilter}>テストで絞り込み</button> -->
        <button @click=${this._handleFilter}>テストで絞り込み</button>
      </div>
        `
          : this.query.length > 0
          ? html`
              <h1 class="c_ttl_h1">${content.attributes.title}</h1>
              <ul>
                <li>
                  <time
                    >${new Date(
                      content.attributes.created
                    ).toLocaleDateString()}</time
                  >
                </li>
                <li>
                  <span class="catBtn -${this.cat[1]}">${this.cat[0]}</span>
                </li>
              </ul>
              <article>
                <figure>
                  <img
                    src="${content.relationships.field_eyecatch.data !== null
                      ? this.responseData.included[0].attributes.uri.url.replace(
                          "/sites/",
                          "http://localhost:" + port + "/sites/"
                        )
                      : "/_assets/img/noimage.png"}"
                  />
                </figure>
                ${unsafeHTML(
                  content.attributes.body.value.replace(
                    "/sites/",
                    "http://localhost:" + port + "/sites/"
                  )
                )}
              </article>
            `
          : html`
              <h2 class="c_ttl_h2">記事一覧</h2>
              <div class="archiveList">
                ${content.map((item: any) => {
                  function truncateText(str: string, len: number) {
                    return str.length <= len ? str : str.substr(0, len) + "...";
                  }
                  //投稿日を任意の書式に変換
                  const time = new Date(item.attributes.created);
                  //カテゴリーのUUIDから名前とクラス名を変数に格納
                  let cat_id = item.relationships.field_category.data.id;
                  const cat =
                    cat_id == "da0ebc23-768e-445b-ae57-88de51ce1671"
                      ? ["お知らせ", "info"]
                      : cat_id == "0cf53627-0fa2-40d3-b78d-6eed417abbb0"
                      ? ["ニュースリリース", "release"]
                      : ["採用情報", "recruitment"];
                  let imgPath =
                    item.relationships.field_eyecatch.data !== null
                      ? include
                          .filter(
                            (obj: { id: any }) =>
                              obj.id ===
                              item.relationships.field_eyecatch.data.id
                          )[0]
                          .attributes.uri.url.replace(
                            "/sites/",
                            "http://localhost:" + port + "/sites/"
                          )
                      : "/_assets/img/noimage.png";
                  return html`
                    <div class="archiveList_item">
                      <a href="/news/?id=${item.id}">
                        <figure><img src=${imgPath} /></figure>
                        <div class="archiveList_txt">
                          <span class="catBtn -${cat[1]}" data-cat="${cat_id}"
                            >${cat[0]}</span
                          >
                          <time>${time.toLocaleDateString()}</time>
                          <h3>${item.attributes.title}</h3>
                          <p>
                            ${truncateText(
                              item.attributes.body.value.replace(
                                /(<([^>]+)>)/gi,
                                ""
                              ),
                              30
                            )}
                          </p>
                        </div>
                      </a>
                    </div>
                  `;
                })}
              </div>
              <ul class="pagerList">
                ${this.responseData.links.prev &&
                html`
                  <li>
                    <button
                      data-link="${this.responseData.links.prev.href}"
                      @click=${this._handleLink}
                    >
                      前
                    </button>
                  </li>
                `}
                <li>
                  <button
                    data-link="${news + field + pager}"
                    @click=${this._handleLink}
                  >
                    1
                  </button>
                </li>
                <li>
                  <button
                    data-link="${news + field + pager + "&page[offset]=3"}"
                    @click=${this._handleLink}
                  >
                    2
                  </button>
                </li>
                ${this.responseData.links.next &&
                html`
                  <li>
                    <button
                      data-link="${this.responseData.links.next.href}"
                      @click=${this._handleLink}
                    >
                      次
                    </button>
                  </li>
                `}
              </ul>
            `}
      </div>
    `;
  }
  //ソート
  async _handleClick(e: Event) {
    const target = e.currentTarget as HTMLElement;
    //ソートボタンのdata属性によってソートルールをセット
    const set = target.getAttribute("data-sort");
    const desc = target.getAttribute("data-desc");
    const sort = `?sort[sort-${set}][path]=${set}`;
    if (desc == "false") {
      await this.getJson(news + sort);
      target.setAttribute("data-desc", "true");
      target.textContent = "降順";
    } else {
      await this.getJson(news + sort + `&sort[sort-${set}][direction]=DESC`);
      target.textContent = "昇順";
      target.setAttribute("data-desc", "false");
    }
  }
  //絞り込み
  async _handleFilter(e: Event) {
    const filter =
      "?filter[label-a][condition][path]=title&filter[label-a][condition][operator]=CONTAINS&filter[label-a][condition][value]=テスト";
    await this.getJson(news + filter);
  }
  async _handleLink(e: Event) {
    const target = e.currentTarget as HTMLElement;
    //ソートボタンのdata属性によってソートルールをセット
    const url = target.getAttribute("data-link");
    console.log(url);
    if (url) {
      await this.getJson(url);
    }
  }
}
