document.addEventListener("DOMContentLoaded", function () {
  if (typeof api !== "undefined")
    $.ajax({
      type: "GET",
      url:
        api +
        "?recommendFlg=1&sortkey=2&sortby=1&externalSiteAuthKey=" +
        externalSiteAuthKey +
        "&facilityId=" +
        facilityId +
        "&langCd=ja",
      dataType: "json",
    })
      .done(function (data) {
        console.log("done", data);
        $(".plan_boxes .noresult").removeClass("active");

        var sHtml = "";

        var planLength = Object.keys(data.data.plans).length;
        if (planLength > 6) planLength = 6;
        for (var i = 0; i < planLength; i++) {
          var planData = data.data.plans[i];

          var planImage = planData.imgUrl;
          if (!planImage) {
            planImage = "dummy";
          }

          var planRegularPrice = planData.custom.regular_price;
          var planPrice = planData.custom.plan_price;
          var planSpecialPlan = planData.custom.special_plan;

          // HTMLを生成
          sHtml +=
            "<a href=" +
            planData.detailUrl +
            ' class="plan_box" target="_blank">';
          sHtml +=
            '<div class="plan_img"><img src="' +
            planImage +
            '" class=""></div>';

          sHtml += '<div class="plan_content"><div class="content_inner">';

          sHtml += '<div class="plan_name_wrapper">';
          if (planData.custom.tag)
            sHtml += '<p class="plan_tag">' + planData.custom.tag + "</p>";
          sHtml += '<p class="plan_name">' + planData.name + "</p></div>\n";

          if (planSpecialPlan) {
            //スペシャルプラン
            sHtml +=
              '<p class="plan_price"><span class="special">' +
              planSpecialPlan +
              "</span></p>";
          } else if (planRegularPrice && planPrice) {
            //通常価格あり
            sHtml +=
              '<p class="plan_price"><span class="regular">通常価格<span class="red">' +
              String(planRegularPrice).replace(
                /(\d)(?=(\d\d\d)+(?!\d))/g,
                "$1,"
              ) +
              ' 円</span></span><span class="arrow">→</span><span class="red">' +
              String(planPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
              ' 円～</span><br class="sp"><span>大人お1人様(税込)</span></p>';
          } else if (planPrice) {
            //プラン価格のみ
            sHtml +=
              '<p class="plan_price"><span>大人お1人様(税込)</span><span class="red">' +
              String(planPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
              " 円～</span></p>";
          }
          sHtml +=
            '<p class="plan_period"><span class="plan_period_ttl">宿泊期間：</span>' +
            String(planData.stayPeriodStartDate).replace(/-/g, "/") +
            "～" +
            String(planData.stayPeriodEndDate).replace(/-/g, "/") +
            "</p>\n";

          sHtml += "</div></div>";
          sHtml += '<p class="plan_more">詳しくはこちら</p></a>';
        }

        // HTMLを設定
        $(".plan_boxes").html(sHtml);
      })
      .done(function () {
        let slidesToShowNum = 4; //slidesToShowに設定したい値を挿入
        /* slidesToShowより投稿が少ない場合の処理▽ */
        let item = $(".plan_box").length; //liの個数を取得
        if (item <= slidesToShowNum) {
          for (let i = 0; i <= slidesToShowNum + 1 - item; i++) {
            //足りていない要素数分、後ろに複製
            $(".plan_box:nth-child(" + i + ")")
              .clone()
              .appendTo(".plan_boxes");
          }
        }
        $("#taoyaPickup .plan_boxes").on(
          "init reInit afterChange",
          function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $(".slick-num .nowcnt").text(i);
            $(".slick-num .allcnt").text(slick.slideCount);
          }
        );
        $("#taoyaPickup .plan_boxes")
          .not(".slick-initialized")
          .slick({
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 2000,
            infinite: true,
            arrows: true,
            fade: false,
            dots: false,
            slidesToShow: slidesToShowNum,
            slidesToScroll: 1,
            // dotsClass: "slick-dots lineDots",
            responsive: [
              {
                breakpoint: 750,
                settings: {
                  slidesToShow: 1,
                },
              },
            ],
          });
      })
      .fail(function (data) {
        console.log("fail", data);
        $(".plan_boxes .noresult").addClass("active");
      });
});
