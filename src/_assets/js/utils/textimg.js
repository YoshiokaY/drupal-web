function textToImg($id, $text, $size, $color, $x) {
  var canvas = document.getElementById($id);
  var ctx = canvas.getContext("2d"); // CanvasRenderingContext2D

  $size = typeof $size !== "undefined" ? $size : 32;
  $color = typeof $color !== "undefined" ? $color : "#222";
  $x = typeof $x !== "undefined" ? $x : 0;

  // フォントの設定
  ctx.font = $size + "px Noto Sans JP, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = $color;
  ctx.fillText($text, $x, 7);
}
textToImg("tel01", "TEL:03-5447-2615（代表）");
textToImg("tel02", "FAX:03-5447-2618");
textToImg("tokyo01", "TEL.03-5447-2615（代表）", "32", "#fff");
textToImg("tokyo02", "FAX.03-5447-2618", "32", "#fff");
textToImg("nagoya01", "TEL.052-221-8008(代表)", "32", "#fff");
textToImg("nagoya02", "FAX.052-221-8028", "32", "#fff");
textToImg("osaka01", "TEL.06-6241-6405(代表)", "32", "#fff");
textToImg("osaka02", "FAX.06-6241-6406", "32", "#fff");
textToImg("oita01", "TEL.097-574-4998", "30", "#fff");
textToImg("oita02", "FAX.097-574-4997", "32", "#fff");
