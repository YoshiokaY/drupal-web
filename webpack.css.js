// const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
//cssコンパイル用プラグイン
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const devtool =
  process.argv[2] === "--mode=development" ? "cheap-module-source-map" : false;
require("dotenv").config();
//ファイルコピープラグイン
const CopyFilePlugin = require("copy-webpack-plugin");
const title = process.env.SITE_NAME;
// const wpDir = "wp-content/themes/" + title + "/_assets/css/";
const wpDir = "web/themes/contrib/nadia/css/";

//scssディレクトリ直下の_がついていないファイルを全て取得してキーに入れる（笹本マジック）
const scssDir = "src/_assets/scss";
const distDir = "htdocs/taoya_common/css/";
const entries = glob
  .sync("**/*.scss", { ignore: "**/_*.scss", cwd: scssDir })
  .map(function (key) {
    return [distDir + key.replace(".scss", ""), path.resolve(scssDir, key)];
  });
// [ '**/files' , './src/**/files.scss' ]という形式の配列になる
const entryObj = Object.fromEntries(entries); // 配列→{key:value}の連想配列へ変換

module.exports = {
  entry: entryObj,
  output: {
    path: __dirname,
    filename: "[name].js",
  },
  devtool: devtool,
  cache: true,
  stats: "errors-only",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i, // 対象にするファイルを指定
        use: [
          MiniCssExtractPlugin.loader, // JSとCSSを別々に出力する
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // ベンダープレフィックスを自動付与する
                plugins: [require("autoprefixer")({ grid: true })],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              warnRuleAsWarning: true,
            },
          },
          "glob-import-loader",
          // 下から順にコンパイル処理が実行されるので、記入順序に注意
        ],
      },
    ],
  },
  watchOptions: {
    ignored: ["/htdocs/", "/node_modules/"],
    poll: true,
  },
  plugins: [
    // 不要なJSファイルは削除
    new FixStyleOnlyEntriesPlugin({
      silent: true,
    }),
    // cssの出力先を指定する
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    new CopyFilePlugin({
      patterns: [
        { from: distDir, to: wpDir, force: true, noErrorOnMissing: true },
      ],
    }),
  ],
};
