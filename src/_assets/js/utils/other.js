//パーティクルjs
// particlesJS.load("particles-js", "./_assets/js/particles.json", function () {
//   console.log("callback - particles.js config loaded");
// });

// particlesJS.load("particles-js2", "./_assets/js/particles2.json", function () {
//   console.log("callback - particles.js config loaded");
// });

//SVGアニメーション
// $(function() {
// 	var mySVG = $('#svg1').drawsvg({
//   duration:1000,
//   stagger:100,
//   easing:'swing',
//   reverse:false,
// 	callback: function() {
// 		//処理を記述
// 		$('#svg1').addClass('callback');
// 	}
//   });
//   mySVG.drawsvg('animate');
// });

// window.onload = function(){
// 	let currentIcon = "pdcaP";
// 	let myIcons = new SVGMorpheus('#pdcaIconSet',{
// 		duration: "250",
// 		easing: 'linear',
// 		rotation: "clock"
// 	});
//
// 	$(window).scroll(function () {
// 		var showFlag = false;
// 			if ($(this).scrollTop() > 100) {
// 				if(currentIcon == "pdcaP"){
// 						myIcons.to("pdcaD");
// 						currentIcon = "pdcaD";
// 					}
// 			} else {
// 				myIcons.to("pdcaP");
// 				currentIcon = "pdcaP";
// 			}
// 	});
// };

// <?php if(is_front_page()) : ?>
// <script type="text/javascript">
// jQuery(function() {
// $(".scroll").click(function(event){
// event.preventDefault();
// var url = $(this).attr("href");
//
// var dest = url.split("#");
// var target = dest[1];
// var target_offset = $("#"+target).offset();
// var target_top = target_offset.top;
//
// $('body,html').animate({scrollTop:target_top}, 800, 'swing');
// return false;
// });
// });
// </script>
// <?php else : ?>
// <script type="text/javascript">
// jQuery(function() {
// $('a[href^=#]').click(function() {
// var speed = 800;
// var href= $(this).attr("href");
// var target = $(href == "#" || href == "" ? 'html' : href);
// var position = target.offset().top;
// $('body,html').animate({scrollTop:position}, speed, 'swing');
// return false;
// });
// });
// </script>
// <?php endif; ?>

// var widthFlag = "";
// $(function () {
//   // 画面サイズのチェック
//   $(window).on("load resize", function () {
//     widthCheck();
//   });
// });

// //画面サイズのチェック
// function widthCheck() {
//   // 画面幅取得
//   var winWidth = $(window).width();

//   // 画面幅640以下でフラグがspでない時
//   if (winWidth <= 750 && widthFlag != "sp") {
//     // フラグをSPに変更
//     widthFlag = "sp";
//     $(".pull-inner").hide();
//     $(".sp_pull > h5").on("click", function () {
//       $(this).next().slideToggle(600, "swing");
//       $(this).toggleClass("active");
//       // $('.slickSlider').slick('setPosition');
//       return false;
//     });
//     $(".navi li a").on("click", function () {
//       $(".navi").slideToggle();
//       $(".ac_menu").toggleClass("active");
//       return false;
//     });

//     // 画面幅640よりおおきく、フラグがpcでない時
//   } else if (winWidth > 750 && widthFlag != "pc") {
//     // フラグをPCに変更
//     widthFlag = "pc";
//     $(".pull-inner").hide();
//   }
// }

//追従ボタン
// jQuery(function (e) {
//   var thisOffset;
//   var thisOffset2;
//   var baff = 300;
//   var sideCta = $(".sideBtn");
//   jQuery(window).on("load resize", function (e) {
//     thisOffset = $("#ctaStart").offset().top + $("#ctaStart").outerHeight();
//     thisOffset2 =
//       $("#ctaClose").offset().top + $("#ctaClose").outerHeight() + baff;
//   });

//   jQuery(window).scroll(function (e) {
//     if (
//       $(window).scrollTop() + $(window).height() > thisOffset &&
//       $(window).scrollTop() + $(window).height() < thisOffset2
//     ) {
//       sideCta.addClass("fixed");
//     } else {
//       sideCta.removeClass("fixed");
//     }
//   });
// });
