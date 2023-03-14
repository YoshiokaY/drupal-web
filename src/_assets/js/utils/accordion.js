// // アコーディオン
$(window).on("load", function () {
  var ww = window.innerWidth;
  if (ww < 750) {
    $(".v3-newsTag > .v3-newsTag_ttl").on("click", function () {
      $(this).next().slideToggle(600, "swing");
      $(this).toggleClass("is-active");
      return false;
    });
  }
  // $(".pull-inner > .pull-close").on("click", function () {
  //   $(this).parent().slideToggle(600, "swing");
  //   $(this).parent().prev().toggleClass("active");
  //   return false;
  // });
  // if (ww < 767) {
  //   $(".sp_pull > p").on("click", function () {
  //     $(this).next().slideToggle(600, "swing");
  //     $(this).toggleClass("active");
  //     return false;
  //   });
  // }

  const accBtn = [].slice.call(document.getElementsByClassName("js-accBtn"));
  const accContents = [].slice.call(
    document.getElementsByClassName("js-accCon")
  );
  for (let i = 0; i < accBtn.length; i++) {
    accBtn[i].addEventListener("click", (e) => {
      let space = 0;
      if (window.innerWidth >= 751) {
        space = 40;
      }

      if (!accBtn[i].classList.contains("isActive")) {
        accBtn[i].classList.add("isActive");
        accContents[i].style.height =
          accContents[i].scrollHeight + space + "px";
        accContents[i].style.opacity = 1;
      } else {
        accBtn[i].classList.remove("isActive");
        accContents[i].style.height = "0";
        accContents[i].style.paddingBottom = "0";
        accContents[i].style.opacity = 0;
      }
    });
  }
});

$(window).on("resize", function () {
  var ww = window.innerWidth;
  if (ww > 750) {
    $(".v3-newsTag > .v3-newsTag_ttl").removeClass("is-active");
  }
});

// //faq
// $(function () {
//   $(".faqWrapper dt").on("click", function () {
//     $(this).next().slideToggle(600, "swing");
//     $(this).toggleClass("open");
//     return false;
//   });
// });
