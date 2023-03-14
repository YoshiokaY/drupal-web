const keepFolder = require("imagemin-keep-folder");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const gifsicle = require("imagemin-gifsicle");
const svgo = require("imagemin-svgo");
const changed = process.argv[2];
const file =
  changed !== "" && changed ? [changed] : ["./src/_assets/img/**/*.*"];
//コマンドラインの引数を受け取れるようにする
// const inputDir =
//   process.argv[2] !== "" ? [process.argv[2]] : ["./src/_assets/img/**/*.*"];
//画像の出力先を環境変数で指定
require("dotenv").config();
const img = process.env.IMG_PATH;

keepFolder(file, {
  plugins: [
    mozjpeg({
      quality: 80,
    }),
    pngquant({
      quality: [0.65, 0.8],
    }),
    gifsicle(),
    svgo(),
  ],
  replaceOutputDir: (output) => {
    return output.replace(/img\//, `../../${img}`);
  },
});
