const keepFolder = require("imagemin-keep-folder");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const gifsicle = require("imagemin-gifsicle");
const svgo = require("imagemin-svgo");
const imageminWebp = require("imagemin-webp");
const changed = process.argv[2];
const file =
  changed !== "" && changed
    ? [changed]
    : ["./src/_assets/img/**/*.{jpg,jpeg,png,gif,svg}"];
//画像の出力先を環境変数で指定
require("dotenv").config();
const img = process.env.ASSETS_PATH + "img/";

//webP変換用に変更ファイルのURLを変換
const outDir = file
  .map((str) => str.replace(/\/src\/_assets\/img\//, `${img}`))
  .join(",");

const convertWebp = (targetFiles) => {
  keepFolder([targetFiles], {
    use: [imageminWebp({ quality: 70 })],
  });
};

keepFolder(file, {
  plugins: [
    mozjpeg({
      quality: 80,
    }),
    pngquant({
      quality: [0.75, 0.8],
    }),
    gifsicle(),
    svgo(),
  ],
  replaceOutputDir: (output) => {
    return output.replace(/img\//, `../..${img}`);
  },
})
  //webP不要の場合はコメントアウト
  .then(() => {
    convertWebp(outDir);
  });
