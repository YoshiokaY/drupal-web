const webpack = require("webpack");
const devtool =
  process.argv[2] === "--mode=development" ? "cheap-module-source-map" : false;
//WPテーマファイル内への出力先を環境変数で指定
require("dotenv").config();
const title = process.env.SITE_NAME;
// const wpDir = "wp-content/themes/" + title + "/_assets/";
const wpDir = "web/themes/contrib/nadia/";
//htdocsへのパス
const distDir = "htdocs/taoya_common/js/";

module.exports = {
  cache: true,
  stats: "errors-only",
  entry: {
    //ここで設定したキーが出力時の[name]に入るので、パス込みでファイル名を記述する
    [distDir + "taoya"]: "./src/_assets/js/index.js",
    // [distDir + "app"]: "./src/_assets/js/top.js",
    // [distDir + "js/ts"]: "./src/_assets/ts/index.ts",
    [wpDir + "js/app"]: "./src/_assets/js/index.js",
    // [wpDir + "js/ts"]: "./src/_assets/ts/index.ts",
  },
  output: {
    path: __dirname,
    filename: "[name].js",
  },
  devtool: devtool,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: ["web", "es5"],
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: ["/htdocs/", "/node_modules/"],
  },
};
