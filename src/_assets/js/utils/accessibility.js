import Cookies from "js-cookie";

// -----------------------------------------
// 変数
// -----------------------------------------
//フォントサイズ
let large = "78.5%", //20px相当
  middle = "70.5%", //18px相当
  small = "62.5%"; //16px相当

//カラー
let colorText = toRgb("#1c1a1a"), //テキストカラー
  colorTextReversal = toRgb("#fdfdfd"),
  colorBodyD = toRgb("#303636"), //テキストカラー
  colorHighlightL = toRgb("#e8e9e9"), //ハイライトカラー
  colorHighlightD = toRgb("#454a4a"), //ハイライトカラー
  colorGrayL = toRgb("#757575"), //グレースケール
  colorGrayD = toRgb("#dedede"),
  colorInvertL = "none",
  colorInvertD = "invert(100%)"; //グレースケール

//保存期間
let date = 30;

// -----------------------------------------
// RGBに変換
// -----------------------------------------

function toRgb(color) {
  const red = parseInt(color[1] + color[2], 16);
  const green = parseInt(color[3] + color[4], 16);
  const blue = parseInt(color[5] + color[6], 16);
  const rgb = red + "," + green + "," + blue;
  return rgb;
}

// -----------------------------------------
// フォントサイズ変更
// -----------------------------------------
function sizeSwitch(val) {
  switch (val) {
    case "sizeLarge":
      document.documentElement.style.setProperty("--fontSize", large);
      break;
    case "sizeMiddle":
      document.documentElement.style.setProperty("--fontSize", middle);
      break;
    default:
      document.documentElement.style.setProperty("--fontSize", small);
  }
}

// -----------------------------------------
// テーマカラー変更
// -----------------------------------------
function colorSwitch(val) {
  switch (val) {
    case "colorDark":
      document.documentElement.style.setProperty(
        "--colorText",
        colorTextReversal
      );
      document.documentElement.style.setProperty(
        "--colorTextReversal",
        colorText
      );
      document.documentElement.style.setProperty("--colorBody", colorBodyD);
      document.documentElement.style.setProperty(
        "--colorHighlight",
        colorHighlightD
      );
      document.documentElement.style.setProperty(
        "--colorGrayScale",
        colorGrayD
      );
      document.documentElement.style.setProperty("--invert", colorInvertD);
      break;
    default:
      document.documentElement.style.setProperty("--colorText", colorText);
      document.documentElement.style.setProperty(
        "--colorTextReversal",
        colorTextReversal
      );
      document.documentElement.style.setProperty(
        "--colorBody",
        colorTextReversal
      );
      document.documentElement.style.setProperty(
        "--colorHighlight",
        colorHighlightL
      );
      document.documentElement.style.setProperty(
        "--colorGrayScale",
        colorGrayL
      );
      document.documentElement.style.setProperty("--invert", colorInvertL);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const fontsize = Cookies.get("fontsize");
  const themeColor = Cookies.get("themeColor");
  //クッキーが保存されている場合
  if (fontsize !== undefined || themeColor !== undefined) {
    sizeSwitch(fontsize);
    colorSwitch(themeColor);
    console.log("表示設定：" + fontsize + themeColor);
    $("#" + fontsize).prop("checked", true);
    $("#" + themeColor).prop("checked", true);
    //クッキーが保存されていない場合のみ読み上げ
    if (fontsize !== undefined) {
      $(".consoleContainer").attr("aria-hidden", "true");
    }
    //ダークモードだった時の処理
  } else if (
    window.matchMedia("(prefers-color-scheme: dark)").matches == true
  ) {
    colorSwitch("colorDark");
    $("#colorDark").prop("checked", true);
    if (Cookies.get("skip")) {
      Cookies.set("themeColor", "colorDark", {
        expires: date,
        path: "/",
        // secure: true,
        sameSite: "lax",
      });
    }
    console.log("表示設定：" + fontsize + themeColor);
  } else {
    console.log("表示設定：" + fontsize + themeColor);
  }
});

// -----------------------------------------
// フォントサイズ変更
// -----------------------------------------
$(function () {
  $('input:radio[name="fontsize"]').on("change", function () {
    //chekedがついてるidを変数に格納
    const fontsize = $('input:radio[name="fontsize"]:checked').attr("id");
    if (Cookies.get("skip")) {
      // cookieに格納 expiresで有効日数指定 pathで使用するディレクトリ指定
      Cookies.set("fontsize", fontsize, {
        expires: date,
        path: "/",
        //テスト環境ではhttp通信のため、一旦解除
        // secure: true,
        sameSite: "lax",
      });
    }
    //chekedがついてるidに応じてrootのフォントサイズを変更
    var headerHight = $("header").delay(2000).height();
    $("main").css({ "margin-top": headerHight });
    sizeSwitch(fontsize);
  });
});

// -----------------------------------------
// テーマカラー変更
// -----------------------------------------
$(function () {
  $('input:radio[name="themeColor"]').on("change", function () {
    //chekedがついてるidを変数に格納
    const themeColor = $('input:radio[name="themeColor"]:checked').attr("id");
    if (Cookies.get("skip")) {
      Cookies.set("themeColor", themeColor, {
        expires: date,
        path: "/",
        //テスト環境ではhttp通信のため、一旦解除
        // secure: true,
        sameSite: "lax",
      });
    }
    colorSwitch(themeColor);
  });
});

// -----------------------------------------
// クッキー削除
// -----------------------------------------
$(function () {
  $("#clearColor").on("click", function () {
    Cookies.remove("themeColor", {
      path: "/",
    });
    Cookies.remove("skip", {
      path: "/",
    });
    console.log(Cookies.get("themeColor"));
    console.log(Cookies.get("skip"));
  });
  $("#clearSize").on("click", function () {
    Cookies.remove("fontsize", { path: "/" });
    console.log(Cookies.get("fontsize"));
  });
});

$(function () {
  if (navigator.userAgent.match(/(iPhone|iPad|iPod)/i)) {
    $(".-required").attr("aria-hidden", "false");
  } else {
    return false;
  }
});
