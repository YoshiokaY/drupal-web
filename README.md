# nadia web starter kit

## ※v4 からのカスタム要素

### \_assets フォルダ

アンダーバーあった方が見通しがいいので、変えてます。

### typescript の導入

`ts フォルダ`内で typescript が使え、js フォルダにトランスパイルされます。

### html での記述

レイアウトなどのテンプレートは pug を使用していますが、コンテンツの記述は html に書いてます。
html フォルダ内で作業して pug フォルダ直下にページ用の pug を作成して html をインクルードさせてます。※もちろん pug で直接書いても問題ないです。

### wp の場合

env ファイルの`SITE_NAME`と`IMG_PATH`を変更
package.json の`"clean:dist"`と`"wpy"`のテーマファイル名を変更
静的コーディングの`_assets`が WP 側にも反映されます。

## インストール

### macOS

- [Homebrew](https://brew.sh/index_ja.html)
- [nodenv](/nadia-web-starter-kit/docs/nodenv.md)

### Windows

- [nodist](/nadia-web-starter-kit/docs/nodist.md)

### VS Code Extensions

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## セットアップ

```sh
npm i
```

## 開発

```sh
npm start
```

http://localhost:3000

## ビルド

```sh
npm run build
```

css と js を圧縮してソースマップを削除します。

JavaScript のライブラリを使用している場合は `app.js.LICENSE.txt` が出力されます。  
ライセンスの記述が含まれるので、削除せず納品するようにしてください。

## 機能

- [Pug](https://pugjs.org/api/getting-started.html) ([pug-cli](https://github.com/pugjs/pug-cli)) / [EJS](https://ejs.co/) ([ejs-cli](https://github.com/fnobi/ejs-cli))
- [Sass](https://sass-lang.com/) ([dart-sass](https://github.com/sass/dart-sass))
- [PostCSS](https://postcss.org/) ([postcss-cli](https://github.com/postcss/postcss-cli))
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
  - [clean-css](https://github.com/clean-css/clean-css) ([clean-css-cli](https://github.com/clean-css/clean-css-cli))
- [webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [imagemin](https://github.com/imagemin/imagemin) ([imagemin-cli](https://github.com/imagemin/imagemin-cli))
- [Stylelint](https://stylelint.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Browsersync](https://browsersync.io/)

## Pug / EJS

テンプレートエンジンはどちらも使用できます。

ファイル名の先頭に `_` が入るファイルは `htdocs` に吐き出されません。  
インクルードのディレクトリに指定はありません。

### ⚠

ファイル名の先頭に `_tpl_` が入るファイルは Pug ではコンパイル対象外となります。（EJS はコンパイル対象）  
PHP フォームテンプレートを使用する際は注意してください。

### ディレクトリ変更

ディレクトリを変更する場合は package.json を編集してください。

#### Pug

_package.json: Line 26_

```
"pug": "pug src -o htdocs -P",
```

#### EJS

_package.json: Line 27_

```
"ejs": "ejs-cli --base-dir src \"/**/{_tpl_,!(_)}*.ejs\" -o htdocs",
```

## Sass / PostCSS (Autoprefixer, clean-css)

`.gitkeep` は削除してください。

### ディレクトリ変更

ディレクトリを変更する場合は `package.json` を編集してください。

_package.json: Line 14_

```
"watch:styles": "onchange -i \"src/assets/scss\" -- npm run styles",
```

_package.json: Line 22_

```
"scss": "sass --embed-sources src/assets/scss/app.scss:htdocs/assets/css/app.css",
```

_package.json: Line 23_

```
"autoprefixer": "postcss htdocs/assets/css/app.css -u autoprefixer -o htdocs/assets/css/app.css -m",
```

_package.json: Line 24_

```
"cleancss": "cleancss -o htdocs/assets/css/app.css htdocs/assets/css/app.css",
```

### ライブラリの使用

相対パスで指定してください。

```scss
@use "../../../node_modules/path/to/file.ext";
```

## webpack / Babel

### ディレクトリ変更

ディレクトリを変更する場合は `webpack.config.js` を編集してください。

_webpack.config.js: Line 6_

```
entry: "./src/assets/js/index.js",
```

_webpack.config.js: Line 9_

```
filename: "./htdocs/assets/js/app.js",
```

### 設定変更

各設定ファイルを編集してください。

_webpack_  
`webpack.config.js`

_Babel_  
`babel.config.js`

## imagemin

### ディレクトリ変更

ディレクトリを変更する場合は `package.json` と `imagemin.js` を編集してください。

_package.json: Line 18_

```
"watch:images": "onchange -i \"src/assets/images/**/*.*\" -- npm run imagemin",
```

_package.json: Line 19_

```
"watch:copy": "onchange -i \"src/**/!(*.js|*.scss|*.pug|*.ejs)\" -e \"src/assets/images/*.*\" -- npm run copy",
```

_package.json: Line 29_

```
"copy": "copyfiles -e \"src/assets/images/*.*\" -u 1 \"src/**/!(*.js|*.scss|*.pug|*.ejs)\" htdocs"
```

_imagemin.js: Line 7_

```
keepFolder(["./src/assets/images/**/*.*"], {
```

_imagemin.js Line 19_

```
return output.replace(/images\//, "../../htdocs/assets/images/");
```

## Stylelint / ESLint

npm-scripts のタスクには含まず、エディタ側で機能します。

リンター単体でのコード整形は行いません。  
設定したルールに沿って警告・エラーをコンソールに出力します。

### 設定変更

デフォルトでは推奨設定を使用しています。  
変更する場合は各設定ファイルを編集してください。

_Stylelint_  
`.stylelintrc.js`

_ESLint_  
`.eslintrc.js`

## Prettier

npm-scripts のタスクには含まず、エディタ側で機能します。  
Stylelint / ESLint の設定と Prettier のデフォルト設定に沿って保存時にコード整形を行います。

### 設定変更

設定を変更する場合はルートに `.prettierrc.js` を作成してください。

### ファイルを無視する

エディタの設定で Prettier をデフォルトフォーマッタとして指定している場合は javascript と scss 以外のファイルもコード整形が有効になります。  
無視するファイルを指定する場合はルートに `.prettierignore` を作成してください。

## Browsersync

### 設定変更

設定を変更する場合は `bs-config.js` を編集してください。

頻繁に使用しそうな設定の記述箇所は下記に記載します。

#### ベースディレクトリの変更

_bs-config.js: Line 4_

```
baseDir: "htdocs",
```

#### 自動起動

_bs-config.js: Line 7_

```
open: false,
```

`localhost:3000` を起動したい場合はコメントアウトのみで問題ありません。  
※ コンパイルと同時に立ち上がるため、起動時には `Cannot GET /` となります。

#### MAMP, XAMPP などでローカルサーバーを立ち上げる場合

_bs-config.js: Line 6_

```
proxy: false,
```

`proxy` にローカルサーバーの URL を設定してください。  
`server` は削除してください。

## ターゲットブラウザの設定

https://github.com/browserslist/browserslist#queries

ターゲットブラウザは各ブラウザの最新 2 バージョンとしています。  
変更する場合は `package.json` を編集してください。

_package.json: Line 31-33_

```
"browserslist": [
  "last 2 version"
],
```

## WordPress ファイルについて

WordPress のファイルは `htdocs/wp` にインストールされるようにしてください。  
インストール先のディレクトリを変更する場合は削除タスクを調整する必要があるため、`package.json` を編集してください。

_package.json: Line 11_

```
"clean:dist": "del-cli -f \"htdocs/**\" \"!htdocs/**/.*\" \"!htdocs/wp\"",
```

## コンパイル対象外のファイルについて

コンパイル対象外のファイルは `htdocs` にコピーします。  
不可視ファイルはコピーの対象外となるので、必要な場合は `htdocs` に直接作成するようにしてください。

## 削除タスクについて

開発タスク／ビルドタスクを実行した際、一番初めに一度のみ `htdocs` を削除します。  
不可視ファイルは削除対象外となります。

開発タスク実行中は不要ファイルは削除されません。  
同名ファイルは上書きになるので開発に影響はありませんが、納品時にビルドコマンドを叩かずに不要ファイルを納品してしまうことのないよう注意してください。

## 同梱ライブラリ

- [normalize.css](https://necolas.github.io/normalize.css/) (v8.0.1)
- [html5-reset](https://github.com/murtaugh/HTML5-Reset) (v2.1.3)
- [jquery](https://jquery.com/) (v3.6.0)

※ jquery はインポート不要で使用可能にしています。

## 更新履歴

### 4.0.0 (2022-02-xx)

- gulp 廃止、npm-scripts に移行

### [<=3.x.x Changelog](https://github.com/nadia-inc/nodejs-web/tree/v3.0.4/nadia-web-starter-kit#%E6%9B%B4%E6%96%B0%E5%B1%A5%E6%AD%B4)
