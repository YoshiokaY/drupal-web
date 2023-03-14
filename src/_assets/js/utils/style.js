window.addEventListener("load", function () {
  // var headerHight = 0;
  var headerHight = $("header:not(.clone)").height();
  var mvHeight = $("#lowerMv").height();
  $("html").css({ "scroll-padding-top": headerHight });
  // $("#onsenMv").css({ "margin-top": headerHight });
  $(".bgContainer").css({ "margin-top": mvHeight });
  $("#lowerTtl").css({ "margin-top": headerHight });

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // $('a[href^="#"]').on("click", function (e) {
  //   var href = $(this).attr("href");
  //   var target = $(href == "#" || href == "" ? "html" : href);
  //   var position = target.offset().top - headerHight;

  //   $.when(
  //     $("html, body").animate(
  //       {
  //         scrollTop: position,
  //       },
  //       400,
  //       "swing"
  //     ),
  //     e.preventDefault()
  //   ).done(function () {
  //     var diff = target.offset().top - headerHight;
  //     if (diff !== position) {
  //       $("html, body").animate(
  //         {
  //           scrollTop: diff,
  //         },
  //         10,
  //         "swing"
  //       );
  //     }
  //   });
  // });
});

window.addEventListener("resize", function () {
  var mvHeight = $("#lowerMv").height();
  var headerHight = $("header:not(.clone)").height();
  $(".bgContainer").css({ "margin-top": mvHeight });
  $("#lowerTtl").css({ "margin-top": headerHight });
});

//TOPに戻るボタン
$(function () {
  var showFlag = false;
  var topBtn = $(".btn_to_top");
  topBtn.css("bottom", "-200px");

  //スクロールが100に達したらボタン表示
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      if (showFlag == false) {
        showFlag = true;
        if (window.innerWidth >= 751) {
          topBtn.stop().animate({ bottom: "10px" }, 200);
        } else {
          if (!document.getElementsByClassName("fixed-bnr")[0]) {
            topBtn.stop().animate({ bottom: "10px" }, 200);
          } else {
            topBtn.stop().animate({ bottom: "70px" }, 200);
          }
        }

        $("header").addClass("-fixed");
        $("#onsenMv").addClass("-fixed");
      }
    } else {
      if (showFlag) {
        showFlag = false;
        topBtn.stop().animate({ bottom: "-200px" }, 200);
        $("header").removeClass("-fixed");
        $("#onsenMv").removeClass("-fixed");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let elms = document.querySelectorAll('a[href^="#"]');
  if (elms) {
    elms.forEach((elm) => {
      elm.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(
          e.currentTarget.getAttribute("href")
        );
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }
});

//ハンバーガーメニュー
// $(function () {
//   var preventScroll = {
//     x: 0,
//     y: 0,
//     setPos: function () {
//       this.x = window.pageXOffset;
//       this.y = window.pageYOffset;
//     },
//     handleEvent: function () {
//       window.scrollTo(this.x, this.y);
//     },
//     enable: function () {
//       this.setPos();
//       window.addEventListener("touchmove", this, { passive: false });
//     },
//     disable: function () {
//       window.removeEventListener("touchmove", this);
//     },
//   };
//   $(".ac_menu").on("click", function () {
//     $(this).next().toggleClass("-active");
//     $(this).toggleClass("-active");
//     if ($(this).attr("aria-expanded") === "false") {
//       $(this).attr({ "aria-expanded": "true" });
//     } else {
//       $(this).attr({ "aria-expanded": "false" });
//     }
//     if ($(this).hasClass("-active")) {
//       preventScroll.enable();
//     } else {
//       preventScroll.disable();
//     }
//     return false;
//   });
//   $("#menuClose").on("click", function () {
//     $(".ac_menu").removeClass("-active");
//     $(".ac_menu").next().removeClass("-active");
//     $(".ac_menu").attr({ "aria-expanded": "false" });
//     preventScroll.disable();
//   });
// });

// $(function () {
//   $(".subMenu .has-child > a").on("click", function (e) {
//     $(this).next().slideToggle();
//     $(this).parent().toggleClass("pullOpen");
//     e.preventDefault();
//     return false;
//   });
// });

// $(function () {
//   let timeOut;
//   $(window).on("scroll touchmove", function () {
//     if ($(this).scrollTop() > 100) {
//       //スクロール中に判断する
//       $("#toTop").css("display", "none");
//       clearTimeout(timeOut);
//       timeOut = setTimeout(function () {
//         $("#toTop").fadeIn();
//       }, 500);
//       //スクロール中は非表示にして、500ミリ秒遅らせて再び表示
//     }
//   });
// });

//lazyloadのカクつき防止
// $(window).on("load", function () {
//   var target_img = $("img[loading='lazy']");
//   target_img.css("opacity", "0");
//   target_img.on("load", function () {
//     target_img.animate({ opacity: "1" }, { duration: 600, easing: "swing" });
//   });
// });
