//jsonを指定
const archive = "http://localhost:55969/jsonapi/node/news/";
//表示箇所
const dl = document.querySelector(".newsList");

async function getJson(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    // const date = JSON.stringify(json);
    // eslint-disable-next-line no-console
    console.log(url);
    setHtml(json.data, dl);
    // return json.data;
  } catch (error) {
    //200以外が返ってきた場合
    console.log("JSONを取得できませんでした：" + error);
    setHtml(null, dl);
    // return null;
  }
}

// function getJson(url) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url, true);
//   xhr.onload = function () {
//     if (xhr.readyState === 4) {
//       // 4は完了
//       if (xhr.status === 200) {
//         // Done or load
//         const json = JSON.parse(xhr.responseText);
//         // eslint-disable-next-line no-console
//         console.log(json.data);
//         setHtml(json.data, dl);
//         return json;
//       } else {
//         console.log("JSONを取得できませんでした" + xhr.statusText);
//         setHtml(null, dl);
//       }
//     }
//   };
//   xhr.send();
// }

function setHtml(dataList, el) {
  let html = "";
  if (dataList === null) {
    html +=
      "<p>記事取得中にエラーが発生しました。<br>時間をおいてから再度アクセスしてください。</p>";
  } else if (el) {
    dataList.forEach((element) => {
      const time = new Date(element.attributes.created);
      const cat_id = element.relationships.field_category.data.id;
      const cat =
        cat_id == "da0ebc23-768e-445b-ae57-88de51ce1671"
          ? ["お知らせ", "info"]
          : cat_id == "d27d631b-65ef-4e52-8b67-7d9326898ddc"
          ? ["ニュースリリース", "release"]
          : ["イベント", "event"];
      html += '<div class="newsList_item">';
      html += "<dt>";
      html += `<time>${time.toLocaleDateString()}</time>`;
      html += `<span class="catBtn -${cat[1]}" data-cat="${cat_id}">${cat[0]}</span>`;
      html += "</dt>";
      html += `<dd><a href="/news/?id=${element.id}">${element.attributes.title}</a></dd>`;
      html += "</div>";
    });
  }
  // HTMLに出力
  if (el) {
    el.innerHTML = html;
  }
}

getJson(archive);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      const addElements = mutation.addedNodes;
      addElements.forEach((addElement) => {
        const btn = addElement.querySelector(".catBtn");
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-cat");
          console.log(target);
          const url =
            "http://localhost:55969/jsonapi/node/news?filter[field_katekori]=" +
            target;
          getJson(url);
        });
      });
    }
  });
});

const target = document.querySelector(".newsList");

if (target) {
  observer.observe(target, {
    subtree: true,
    childList: true,
    characterData: true,
  });
}

const acs = document.querySelectorAll(".sortBtn");
acs.forEach((btn) => {
  btn.addEventListener("click", () => {
    const set = btn.getAttribute("data-sort");
    const desc = btn.getAttribute("data-desc");
    const url = `http://localhost:55969/jsonapi/node/news/?sort[sort-${set}][path]=${set}`;
    if (desc != "true") {
      getJson(url);
    } else {
      getJson(url + `&sort[sort-${set}][direction]=DESC`);
    }
  });
});

const filters = document.querySelectorAll(".filterBtn");
const filterurl =
  "http://localhost:58030/jsonapi/node/news?filter[label-a][condition][path]=title&filter[label-a][condition][operator]=CONTAINS&filter[label-a][condition][value]=";
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const set = filter.textContent;
    const url = filterurl + set;
    console.log(url);
    getJson(url);
  });
});

const query = window.location.search.slice(4);
const single = archive + query;
const news = document.getElementById("news_body");
// console.log(single);
async function getNews(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    // const date = JSON.stringify(json);
    // eslint-disable-next-line no-console
    console.log(json);
    setNews(json.data, news);
    // setNews(json.data, news);
    // return json.data;
  } catch (error) {
    //200以外が返ってきた場合
    console.log("JSONを取得できませんでした：" + error);
    // setNews(null, dl);
    // return null;
  }
}
getNews(single);

function setNews(dataList, el) {
  let html = "";
  if (dataList === null) {
    html +=
      "<p>記事取得中にエラーが発生しました。<br>時間をおいてから再度アクセスしてください。</p>";
  } else {
    const time = new Date(dataList.attributes.created);
    const cat_id = dataList.relationships.field_katekori.data.id;
    const cat =
      cat_id == "24a2aad5-8ae3-4251-aac4-b27d35f908b9"
        ? ["お知らせ", "info"]
        : cat_id == "d27d631b-65ef-4e52-8b67-7d9326898ddc"
        ? ["ニュースリリース", "release"]
        : ["イベント", "event"];
    const body = decodeURI(dataList.attributes.body.value).replace(
      "/sites/",
      "http://localhost:58030/sites/"
    );
    html += `<h1 class="c_ttl_h1">${dataList.attributes.title}</h1>`;
    html += '<section><div class="contentInner">';
    html += `<ul><li><time>${time.toLocaleDateString()}</time></li><li><span class="catBtn -${
      cat[1]
    }">${cat[0]}</span></li></ul>`;
    html += `<article>${body}</article>`;
    html += "</div></section>";
  }
  // HTMLに出力
  if (el) {
    el.innerHTML = html;
  }
}
