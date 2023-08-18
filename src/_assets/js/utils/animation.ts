// スクロールアニメーション
window.addEventListener("DOMContentLoaded", () => {
  const loadIns = document.querySelectorAll(".loadIn,.load");
  loadIns.forEach((loadIn) => {
    loadIn.classList.add("-active");
  });
  typTxt(".typTxt,.moveTxt");
  fadeAnimation();
});

//IOSを使ってターゲット要素が画面内に入ってきたら".-active"をつける
function fadeAnimation() {
  const elements = document.querySelectorAll(
    ".scrollIn,.scroll,.typTxt,.moveTxt"
  );
  const elementArr = Array.prototype.slice.call(elements);

  //IOSのオプション
  const options: IntersectionObserverInit = {
    root: null, // ビューポートをルート要素とする
    rootMargin: "0px 0px", // ビューポートの中心を判定基準にする
    threshold: 0, // 閾値は0
  };
  const observer = new IntersectionObserver(callback, options);
  elementArr.forEach((box: HTMLDivElement) => {
    observer.observe(box);
  });

  //監視対象に".-active"がなければ付与する
  function callback(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry: IntersectionObserverEntry, i: number) => {
      const target = entry.target;

      const typTxts = document.querySelectorAll(".typTxt,.moveTxt") || [];
      if (entry.isIntersecting && !target.classList.contains(".-active")) {
        const delay = i * 100;
        setTimeout(() => {
          target.classList.add("-active");
          setTimeout(() => {
            typTxts.forEach((typTxt) => {
              const text = typTxt.innerHTML;
              const textWithoutBr = text.replace(
                /<font( class="br")?>|<\/font>/g,
                ""
              );
              typTxt.innerHTML = textWithoutBr;
            });
          }, 4000);
        }, delay);
      }
    });
  }
}

//一文字ずつアニメーションさせるため、該当クラスのテキストを取得して一文字ずつfont（他と干渉しなさそうなタグ）タグでくくる
//引数：クラス名を記述
//初期値：".typTxt"
function typTxt(className: string = ".typTxt") {
  const typTxts = document.querySelectorAll(className) || [];
  typTxts.forEach((typTxt) => {
    const text = typTxt.innerHTML;
    const textWithoutBr = text.replace(/<br>/g, "Γ");
    console.log(text);
    let textbox = "";
    textWithoutBr?.split("").forEach((t: string, i: number) => {
      if (t !== " ") {
        if (t == "Γ") {
          textbox += "<font class='br'>" + t + "</font>";
        } else {
          textbox += "<font><font>" + t + "</font></font>";
        }
      } else {
        textbox += t;
      }
    });
    textbox = textbox.replace("Γ", "<br>");
    typTxt.innerHTML = textbox;
  });
}

// function copyImg(className: string = ".noiseImg") {
//   const elements = document.querySelectorAll(className) || [];
//   elements.forEach((element) => {
//     const img = element.innerHTML;
//     let imgbox = "";
//     if (img !== " ") {
//       imgbox += img;
//       imgbox += "<font class='-red'>" + img + "</font>";
//       imgbox += "<font class='-green'>" + img + "</font>";
//       imgbox += "<font class='-blue'>" + img + "</font>";
//     } else {
//       imgbox += img;
//     }
//     element.innerHTML = imgbox;
//   });
// }

// マウスの位置を取得する
// document.onmousemove = function (e) {
//   let mousePos = {
//     x: e.pageX,
//     y: e.pageY,
//   };
//   console.log(mousePos.x + "," + mousePos.y);

//   // 形の位置をマウスの位置に変更する
//   const shape = document.querySelector("rect");
//   //shape.style.left = mousePos.x + "px";
//   //shape.style.top = mousePos.y + "px";

//   // 形のサイズをマウスの位置に応じて変更する
//   //shape.style.width = mousePos.x + "px";
//   //shape.style.height = mousePos.y + "px";

//   // 形の色をマウスの位置に応じて変更する
//   if (shape) {
//     shape.style.filter = `hue-rotate(${roundTo360(mousePos.x)}deg)`;
//     console.log(shape.style.filter);

//     // 形の回転をマウスの位置に応じて変更する
//     shape.style.transform = `rotate(${roundTo360(mousePos.x)}deg)`;
//     console.log(shape.style.transform);
//   }
//   function roundTo360(number: number) {
//     return (number + 360) % 360;
//   }
// };
