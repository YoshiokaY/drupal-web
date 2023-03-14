import Cookies from "js-cookie";

/*/-----------------オープニング*/
window.addEventListener("load", function () {
  setTimeout(function () {
    const spinner = document.getElementById("loading");
    spinner.classList.add("-loaded");
  }, 400);
});

// setTimeout(function () {
//   const spinner = document.getElementById("loading");
//   spinner.classList.add("-loaded");
// }, 500);

$(function () {
  //セッションストレージに値が存在しなければ表示
  if (!Cookies.get("skip")) {
    if (!sessionStorage.getItem("skip")) {
      $(".opening-container").css({ display: "flex" });
      $(".openingContents").animate({ opacity: 1 });
    }
    //自動で消す場合はonclickを外して.delay()で消えるまでの秒数を指定
    $(".skip").on("click", function () {
      $(".opening-container").fadeOut(400);
      //セッションストレージに値を格納
      Cookies.set("skip", "true", {
        path: "/",
        // secure: true,
        sameSite: "lax",
      });
    });
    $(".refusal").on("click", function () {
      $(".opening-container").fadeOut(400);
      Cookies.remove("themeColor", {
        path: "/",
      });
      Cookies.remove("skip", {
        path: "/",
      });
      Cookies.remove("fontsize", { path: "/" });
      //セッションストレージに値を格納
      sessionStorage.setItem("skip", "true");
    });
  }
});
