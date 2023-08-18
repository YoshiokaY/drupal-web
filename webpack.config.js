const webpack = require("webpack");
const devtool =
  process.argv[2] === "--mode=development" ? "cheap-module-source-map" : false;
//WPテーマファイル内への出力先を環境変数で指定
require("dotenv").config();
const title = process.env.SITE_NAME;
const wpDir = "wp-content/themes/" + title + "/_assets/";
//htdocsへのパス
const distDir = process.env.ASSETS_PATH;

module.exports = {
  cache: true,
  stats: "errors-only",
  entry: {
    //ここで設定したキーが出力時の[name]に入るので、パス込みでファイル名を記述する
    [distDir + "js/app"]: "./src/_assets/js/index.ts",
    // [wpDir + "js/ts"]: "./src/_assets/js/index.ts",
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
