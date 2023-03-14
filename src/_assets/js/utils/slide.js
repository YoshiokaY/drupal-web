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
