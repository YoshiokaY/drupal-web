import "jquery-match-height";
//スムーズスクロール
document.addEventListener("DOMContentLoaded", () => {
  const anchors = document.querySelectorAll('a[href^="#"]');
  const body = document.querySelector("body");
  anchors?.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      let event = e.target as HTMLElement;
      const target = event.getAttribute("href");
      if (!target) {
        return;
      }
      if (target !== "#") {
        const targetElement = document.querySelector(target);
        targetElement?.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        body?.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  acMenu();
});

//TOPに戻るボタン
$(function () {
  let showFlag: boolean = false;
  const topBtn = $("#toTop");
  topBtn.css("bottom", "-200px");

  //スクロールが100に達したらボタン表示
  document.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      if (!showFlag) {
        showFlag = true;
        if (window.innerWidth >= 834) {
          topBtn.stop().animate({ bottom: "10px" }, 200);
        } else {
          const fixedBnr = document.getElementsByClassName("fixed-bnr")[0];
          if (!fixedBnr) {
            topBtn.stop().animate({ bottom: "10px" }, 200);
          } else {
            topBtn.stop().animate({ bottom: "70px" }, 200);
          }
        }
        $("header").addClass("-fixed");
      }
    } else {
      if (showFlag) {
        showFlag = false;
        topBtn.stop().animate({ bottom: "-200px" }, 200);
        $("header").removeClass("-fixed");
      }
    }
  });
});

//ハンバーガーメニュー
function acMenu() {
  const html = document.querySelector("html");
  const menu = document.querySelector(".ac_menu") as HTMLElement;
  const menu_label = document.querySelector(".ac_menu span") as HTMLElement;
  const wrap = document.querySelector(".naviWrapper");
  const close_btn = document.querySelector(".closeBtn");

  menu?.addEventListener("click", () => {
    wrap?.classList.toggle("-active");
    menu?.classList.toggle("-active");
    html?.classList.toggle("-disable");
    if (menu.classList.contains("-active")) {
      menu.setAttribute("aria-expanded", "true");
      menu_label.textContent = "メニューを閉じる";
    } else {
      menu.setAttribute("aria-expanded", "false");
      menu_label.textContent = "メニューを開く";
    }
  });
  close_btn?.addEventListener("click", () => {
    menuClose();
  });
  wrap?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("#navi") === null) {
      menuClose();
    }
  });

  const menuClose = () => {
    wrap?.classList.remove("-active");
    menu.classList.remove("-active");
    html?.classList.remove("-disable");
    menu.setAttribute("aria-expanded", "false");
    menu_label.textContent = "メニューを開く";
  };
}

//マッチハイト
// $(window).on("load resize", function () {
//   var target_img = $(".-tile img");
//   target_img.on("load", function () {
//     $(".-tile").matchHeight();
//   });
// });
// $(function () {
//   $(".-tile").matchHeight();
// });

// //lazyloadのカクつき防止
// $(window).on("load", function () {
//   var target_img = $("img[loading='lazy']");
//   target_img.css("opacity", "0");
//   target_img.on("load", function () {
//     target_img.animate({ opacity: "1" }, { duration: 600, easing: "swing" });
//   });
// });
