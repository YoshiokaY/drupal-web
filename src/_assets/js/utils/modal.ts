// モーダル
import dialogPolyfill from "dialog-polyfill";

window.addEventListener("load", () => {
  modalControl(); //モーダル開閉
});

function modalControl() {
  //モーダル
  const html = document.querySelector("html");
  const modalBtn = document.querySelectorAll(".c_modal_btn");
  // let modal = "";
  let closes = document.querySelectorAll(".c_modal_close");

  modalBtn.forEach((a) => {
    a.addEventListener("click", (e) => {
      //aタグの遷移抑制
      e.preventDefault();
      let event = e.currentTarget as HTMLElement;
      //ボタンに紐づいたモーダルを開くためにaria-contorolからID取得
      let modalID: string | null = sanitize(
        event?.getAttribute("aria-control") || ""
      );
      let modal = document.getElementById(modalID) as HTMLDialogElement;
      let modalHref = sanitize(event.getAttribute("href"));
      const targetNext = event.nextElementSibling;
      //画像・動画の場合
      if (modalHref) {
        if (!targetNext) {
          const YOUTUBE =
            /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;
          const youtube_uri = YOUTUBE.exec(modalHref);
          let dialog = "";
          dialog += '<dialog class="dialog"><div class="c_modal_content">';
          //youtubeiframe挿入
          if (youtube_uri) {
            dialog +=
              '<button class="c_modal_close" aria-label="モーダルウィンドウを閉じる" tabindex="2"></button>';
            dialog += setFrame(
              appendQueryParams(
                "https://www.youtube" +
                  (youtube_uri[2] || "") +
                  ".com/embed/" +
                  youtube_uri[4],
                //youtubeのオプションを記述
                $.extend(
                  {
                    autoplay: 1,
                    rel: 0,
                  },
                  parseQueryParams(youtube_uri[5] || "")
                )
              )
            );
          } else {
            //画像用モーダル
            dialog += `<figure tabindex="1"><img src=${modalHref} decoding="async"></figure>`;
          }
          dialog +=
            '<button class="c_modal_close" aria-label="モーダルウィンドウを閉じる" tabindex="2"></button>';
          dialog += "</div></dialog>";
          event.insertAdjacentHTML("afterend", dialog);
        }
        modal = event.nextElementSibling as HTMLDialogElement;
        closes = document.querySelectorAll(".c_modal_close");
      } else {
        modal = document.getElementById(modalID) as HTMLDialogElement;
      }

      //古いブラウザ用ポリフィル（別途、jsとcssの読み込みが必要）
      dialogPolyfill.registerDialog(modal);
      //モーダル展開
      modal?.showModal();
      //htmlのスクロール抑制のためのクラス
      html?.classList.add("-modalOpen");

      //モーダルの使い回し時に呼び出す
      // setModal(modalDate);

      //IDメモリ解放
      modalID = null;
      closes.forEach((close) => {
        close.addEventListener("click", () => {
          closeModal(modal);
        });
      });

      modal?.addEventListener("cancel", () => {
        closeModal(modal);
      });

      modal?.addEventListener("click", (e) => {
        let event = e.target as HTMLElement;
        if (event === modal) {
          closeModal(modal);
        }
      });
    });
  });
  //モーダル始末
  function closeModal(modal: HTMLDialogElement) {
    modal.close("cancelled");
    //iframeだけ始末
    modal.querySelector(".frameWrapper") && modal.remove();
    html?.classList.remove("-modalOpen");
  }
}

//サニタイズ
function sanitize(str: string | null) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

//Youtube用
function setFrame(target: any) {
  return (
    '<div class="frameWrapper" tabindex="1"><iframe frameborder="0" allow="autoplay; fullscreen" src="' +
    target +
    '"/></div>'
  );
}

function parseQueryParams(params: string) {
  var pairs = decodeURI(params.split("#")[0]).split("&");
  var obj = new Map();
  var p;

  for (var i = 0, n = pairs.length; i < n; i++) {
    if (!pairs[i]) {
      continue;
    }

    p = pairs[i].split("=");
    obj.set(p[0], p[1]);
  }

  return obj;
}

function appendQueryParams(
  url: string,
  params: { autoplay: number; rel: number }
) {
  return url + (url.indexOf("?") > -1 ? "&" : "?") + $.param(params);
}

//別にやらなくてもいいけど100件もモーダル作るのだるいからjsonから動的にデータ引っ張ってきて都度表示してみる

// //jsonファイルの読み込み
// let request = new XMLHttpRequest();
// //jsonのパス
// let requestURL = "./assets/modal.json";
// let json = [];
// request.open("GET", requestURL);
// request.responseType = "json";
// request.send();
// request.onload = function () {
//   json = request.response;
//   return json;
// };

// function setModal(els) {
//   // 加工用にjsonディープデータコピー
//   let data = json.map((json) => ({ ...json }));
//   //クリックしたaria-contorolsの値を使ってjsonデータを検索
//   if (!els) {
//     //万一取得できなかった一番最初のデータを表示
//     data = data[0];
//   } else {
//     //万一取得できなかった一番最初のデータを表示
//     data = data.find(({ ttl }) => ttl === els) || data[0];
//   }
//   console.log("参照データ：" + data);
//   dataArray(data);
//   data = null;
// }

// // foreachでJSONデータをHTMLに出力
// function dataArray(els) {
//   const container = document.querySelector(".modal");
//   // JSONデータを出力したいHTML要素を指定
//   const body = document.querySelector(".modal_body");
//   // 元の中身削除
//   container.removeChild(body);
//   let name = els.ttl;
//   let time = els.time;
//   let img = els.img;
//   let txt = els.txt;
//   let code = `<div class="modal_body" tabindex="1">`;
//   //以下デザインに合わせて変更
//   if (name) {
//     code += `<h3 class="modal_ttl">${name}</h3>`;
//   }
//   if (time) {
//     code += `<p>${time}</p>`;
//   }
//   if (img) {
//     code += `
//     <figure>
//       <img src="${img}" alt="${name ? name : "タイトル"}">
//     </figure>
//     `;
//   }
//   code += `
//   <p>${txt}</p>
//   </div>`;
//   container.insertAdjacentHTML("afterbegin", code);
//   els = null;
// }
