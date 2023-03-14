//スライダー
$(function () {
  $(".kvSlider")
    .not(".slick-initialized")
    .slick({
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 2000,
      infinite: true,
      arrows: false,
      fade: true,
      dots: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {},
        },
      ],
    });
});

$(function () {
  for (let i = 0; i < $(".onsenSlideMain").length; i++) {
    $(".onsenSlideMain.slider" + i)
      .not(".slick-initialized")
      .slick({
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 800,
        infinite: true,
        arrows: true,
        fade: true,
        dots: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        asNavFor: ".onsenSlideThumb.slider" + i,
      });
    $(".onsenSlideThumb.slider" + i)
      .not(".slick-initialized")
      .slick({
        asNavFor: ".onsenSlideMain.slider" + i,
        focusOnSelect: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        infinite: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              infinite: true,
            },
          },
        ],
      });
  }
});

$(function () {
  $(".onsenSlideCenter").not(".slick-initialized").slick({
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 2000,
    infinite: true,
    arrows: true,
    fade: false,
    dots: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  });
});

$(function () {
  $(".onsenSlideThreeColm")
    .not(".slick-initialized")
    .on("init", function (event, slick) {
      $(this).append(
        '<div class="slick-num"><span class="now"></span><span class="delimiter"></span><span class="all"></span></div>'
      );
      $(".now").text(slick.currentSlide + 1);
      $(".all").text(slick.slideCount);
    })
    .slick({
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 2000,
      slidesToShow: 3,
      infinite: true,
      arrows: true,
      fade: false,
      dots: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      $(".now").text(nextSlide + 1);
    })
    .on("setPosition", function (e, slick) {
      $(this).append(
        '<div class="slick-num"><span class="now"></span><span class="delimiter"></span><span class="all"></span></div>'
      );
      $(".now").text(slick.currentSlide + 1);
      $(".all").text(slick.slideCount);
    });
});

$(function () {
  $(".onsenSlideOneColmList")
    .not(".slick-initialized")
    .on("init", function (event, slick) {
      $(this).append(
        '<div class="slick-num"><span class="now"></span><span class="delimiter"></span><span class="all"></span></div>'
      );
      $(".now").text(slick.currentSlide + 1);
      $(".all").text(slick.slideCount);
    })
    .slick({
      autoplay: false,
      autoplaySpeed: 4000,
      speed: 2000,
      slidesToShow: 1,
      infinite: true,
      arrows: true,
      fade: false,
      dots: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      $(".now").text(nextSlide + 1);
    })
    .on("setPosition", function (e, slick) {
      $(this).append(
        '<div class="slick-num"><span class="now"></span><span class="delimiter"></span><span class="all"></span></div>'
      );
      $(".now").text(slick.currentSlide + 1);
      $(".all").text(slick.slideCount);
    });
});

$(function () {
  $("#onsen01 .onsenSlideMain")
    .not(".slick-initialized")
    .slick({
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 800,
      infinite: true,
      arrows: true,
      fade: true,
      dots: true,
      dotsClass: "slick-dots lineDots",
      asNavFor: "#onsen01 .onsenSlideThumb",
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
          },
        },
      ],
    });
  let slidesToShowNum = 8; //slidesToShowに設定したい値を挿入
  let item = $("#onsen01 .onsenSlideThumb li").length;
  if (item >= slidesToShowNum) {
    slidesToShowNum = item;
  }
  $("#onsen01 .onsenSlideThumb").not(".slick-initialized").slick({
    asNavFor: "#onsen01 .onsenSlideMain",
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    infinite: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    slidesToShow: slidesToShowNum,
    slidesToScroll: 1,
    cssEase: "ease-out",
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  });
});

$(function () {
  $("#onsen02 .onsenSlideMain")
    .not(".slick-initialized")
    .slick({
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 800,
      infinite: true,
      arrows: true,
      fade: true,
      dots: true,
      dotsClass: "slick-dots lineDots",
      asNavFor: "#onsen02 .onsenSlideThumb",
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
          },
        },
      ],
    });
  let slidesToShowNum = 8; //slidesToShowに設定したい値を挿入
  let item = $("#onsen02 .onsenSlideThumb li").length;
  if (item >= slidesToShowNum) {
    slidesToShowNum = item;
  }
  $("#onsen02 .onsenSlideThumb").not(".slick-initialized").slick({
    asNavFor: "#onsen02 .onsenSlideMain",
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    infinite: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    slidesToShow: slidesToShowNum,
    slidesToScroll: 1,
    cssEase: "ease-out",
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  });
});

$(function () {
  $("#onsen03 .onsenSlideMain")
    .not(".slick-initialized")
    .slick({
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 800,
      infinite: true,
      arrows: true,
      fade: true,
      dots: true,
      dotsClass: "slick-dots lineDots",
      asNavFor: "#onsen03 .onsenSlideThumb",
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
          },
        },
      ],
    });
  let slidesToShowNum = 8; //slidesToShowに設定したい値を挿入
  let item = $("#onsen03 .onsenSlideThumb li").length;
  if (item >= slidesToShowNum) {
    slidesToShowNum = item;
  }
  $("#onsen03 .onsenSlideThumb").not(".slick-initialized").slick({
    asNavFor: "#onsen03 .onsenSlideMain",
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    infinite: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    slidesToShow: slidesToShowNum,
    slidesToScroll: 1,
    cssEase: "ease-out",
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  });
});

$("#onsenAmenity .amenitySlide")
  .not(".slick-initialized")
  .slick({
    autoplay: false,
    infinite: false,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    slidesToShow: 3,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          cssEase: "ease-out",
          autoplay: false,
          autoplaySpeed: 4000,
          speed: 2000,
          infinite: true,
          arrows: true,
        },
      },
    ],
  });

$(function () {
  const $slider = $(".banner_cards_slide");
  $slider.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
    $slider.find(".slick-slide").each((index, el) => {
      const $this = $(el),
        slickindex = $this.attr("data-slick-index");
      if (nextSlide == slick.slideCount - 1 && currentSlide == 0) {
        // 現在のスライドが最初のスライドでそこから最後のスライドに戻る場合
        if (slickindex == "-1") {
          // 最後のスライドに対してクラスを付与
          $this.addClass("is-active-next");
        } else {
          // それ以外は削除
          $this.removeClass("is-active-next");
        }
      } else if (nextSlide == 0) {
        // 次のスライドが最初のスライドの場合
        if (slickindex == slick.slideCount) {
          // 最初のスライドに対してクラスを付与
          $this.addClass("is-active-next");
        } else {
          // それ以外は削除
          $this.removeClass("is-active-next");
        }
      } else {
        // それ以外は削除
        $this.removeClass("is-active-next");
      }
    });
  });
  $(".banner_cards_slide")
    .not(".slick-initialized")
    .slick({
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 1000,
      infinite: true,
      arrows: true,
      fade: false,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "15%",
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "60px",
          },
        },
      ],
    });
});

$(function () {
  for (let i = 0; i < $(".c_time_slides").length; i++) {
    $(".c_time_slides.slide" + i)
      .not(".slick-initialized")
      .slick({
        autoplay: false,
        speed: 800,
        infinite: true,
        arrows: true,
        fade: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
      });
  }
});

//表示件数が少ない場合崩れるのを防ぐ
// $(function () {
//   let slidesToShowNum = 5; //slidesToShowに設定したい値を挿入
//   /* slidesToShowより投稿が少ない場合の処理▽ */
//   let item = $(".v3-top-campaign_list div").length; //liの個数を取得
//   if (item <= slidesToShowNum) {
//     for (i = 0; i <= slidesToShowNum + 1 - item; i++) {
//       //足りていない要素数分、後ろに複製
//       $(".v3-top-campaign_list div:nth-child(" + i + ")")
//         .clone()
//         .appendTo(".v3-top-campaign_list");
//     }
//   }
//   $(".v3-top-campaign_list")
//     .not(".slick-initialized")
//     .slick({
//       autoplay: true,
//       autoplaySpeed: 3000,
//       speed: 1000,
//       infinite: true,
//       arrows: true,
//       fade: false,
//       dots: true,
//       slidesToShow: slidesToShowNum,
//       slidesToScroll: 1,
//       centerMode: true,
//       centerPadding: "0px",
//       responsive: [
//         {
//           breakpoint: 1025,
//           settings: {
//             slidesToShow: 3,
//           },
//         },
//         {
//           breakpoint: 768,
//           settings: {
//             slidesToShow: 1,
//             centerPadding: "70px",
//           },
//         },
//       ],
//     });
// });

//カクつく場合
// window.addEventListener("load", function () {
//   $("#onsenPickup .plan_boxes")
//     .not(".slick-initialized")
//     .slick({
//       autoplay: true,
//       autoplaySpeed: 4000,
//       speed: 2000,
//       infinite: true,
//       arrows: true,
//       fade: false,
//       dots: true,
//       slidesToShow: 4,
//       slidesToScroll: 1,
//       dotsClass: "slick-dots lineDots",
//       responsive: [
//         {
//           breakpoint: 750,
//           settings: {
//             slidesToShow: 1,
//           },
//         },
//       ],
//     });
// });
