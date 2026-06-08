# Vite + Eleventy + Tailwind CSS プロジェクト

このプロジェクトは、Vite + Eleventy + Tailwind CSS のフロントエンド開発環境です。

## 🛠 技術スタック

- **静的サイトジェネレーター**: [Eleventy (11ty)](https://www.11ty.dev/)
- **ビルドツール**: [Vite](https://vitejs.dev/)
- **テンプレートエンジン**: [EJS](https://ejs.co/)
- **CSS フレームワーク**: [Tailwind CSS](https://tailwindcss.com/)
- **CSS プリプロセッサ**: [Sass](https://sass-lang.com/)
- **画像最適化**: [Sharp](https://sharp.pixelplumbing.com/)
- **Node.js バージョン管理**: [Volta](https://volta.sh/)

## 📋 前提条件

- **Node.js**: 24.1.0 以上 (Volta推奨)
- **npm**: 最新版

### Volta の設定

このプロジェクトでは Node.js のバージョン管理に Volta を使用しています。
Volta が無くても動作しますが、Volta を使用することで Node.js のバージョンを簡単に管理できます。

## 🚀 セットアップ

### 1. 依存関係のインストール

```
npm install
```

### 2. 開発サーバーの起動

```
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてサイトを確認できます。

## 📂 プロジェクト構造

```
root/
├── src/                   # ソースファイル
│   ├── _data/             # Eleventy データファイル
│   ├── _includes/         # テンプレートファイル
│   │   ├── layouts/       # レイアウトテンプレート
│   │   └── parts/         # パーツテンプレート
│   ├── assets/            # アセットファイル
│   │   ├── css/           # SCSS ファイル
│   │   ├── images/        # 画像ファイル
│   │   └── js/            # JavaScript ファイル
│   ├── business/          # 事業紹介ページ
│   ├── company/           # 会社情報ページ
│   ├── news/              # ニュースページ
│   └── *.ejs              # 各種ページファイル
├── public/                # 静的アセット
├── vite-plugins/          # カスタム Vite プラグイン
└── dist/                  # ビルド出力 (生成される)
```

## 🧑‍💻 開発コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番用ビルド |
| `npm run preview` | ビルド結果のプレビュー |
| `npm run lint` | ESLint + Stylelint 実行 |
| `npm run lint:fix` | リント問題の自動修正 |
| `npm run eslint` | ESLint のみ実行 |
| `npm run eslint:fix` | ESLint 自動修正 |
| `npm run stylelint` | Stylelint のみ実行 |
| `npm run stylelint:fix` | Stylelint 自動修正 |

## 🎨 CSS 開発

### Tailwind CSS

このプロジェクトでは、ユーティリティファーストの CSS フレームワークである Tailwind CSS を使用しています。

- 設定ファイル: `tailwind.config.js`
- プラグイン: `@tailwindcss/typography`
- パージ対象: `./src/**/*.{html,ejs,js,ts}`

### Sass/SCSS

カスタムスタイルには Sass を使用しています。

- メインファイル: `src/assets/css/style.scss`
- モジュール構成:
  - `base/`: ベーススタイル
  - `components/`: コンポーネントスタイル
  - `modules/`: ページモジュールスタイル
  - `global/`: グローバル変数・ミックスイン

## 📷 画像最適化

Sharp プラグインにより、画像の自動最適化が行われます。

- WebP 形式への変換
- 適切な圧縮率での最適化

開発中（`npm run dev`実行中）にpngやjpg画像を追加すると、同じディレクトリに自動的に変換されたWebP画像が生成されます。
※ただし、src/assets/images/以下の画像のみが対象です。
※src/assets/images/以下のwebp画像はコミット対象外になっています。（オリジナル画像のpngやjpgのみがコミット対象です）

ビルド時には、すべての画像が最適化され、`dist/assets/images/`配下に出力されます。

## 🔧 リンティング & フォーマット

### ESLint

- JavaScript/TypeScript のコード品質チェック
- 設定ファイル: `eslint.config.js`

### Stylelint

- CSS/SCSS のスタイルチェック
- 設定ファイル: `stylelint.config.js`
- ルール:
  - `stylelint-config-standard-scss`
  - `stylelint-config-recess-order`
  - `stylelint-config-tailwindcss`

### Prettier

- コードフォーマッター
- 設定ファイル: `prettier.config.js`

### Lefthook (Git Hooks)

- pre-commit でのリント自動実行
- 設定ファイル: `lefthook.yml`

## 🏗 ビルド設定

### Vite 設定 (`vite.config.js`)

- **ルートディレクトリ**: `src`
- **パブリックディレクトリ**: `public`
- **出力ディレクトリ**: `dist`
- **プラグイン**:
  - `vite-plugin-eleventy`: Eleventy 統合
  - `sharp-optimizer`: 画像最適化

### アセット出力設定

```
// JavaScript ファイル
assets/js/[name].js

// CSS ファイル
assets/css/[name].min.css

// 画像ファイル
assets/images/[name].[ext]
```

## 📋 サイト設定 (`src/_data/site.js`)

### 概要

`src/_data/site.js`は、Eleventy のグローバルデータファイルです。サイト全体で共通して使用される設定値（メタデータ、OGP情報、SEO設定など）を一元管理しています。

### 設定項目

| プロパティ | 説明 | 使用例 |
|-----------|------|--------|
| `title` | サイトタイトル | `<title>` タグのデフォルト値 |
| `description` | サイト説明 | `<meta name="description">` のデフォルト値 |
| `keywords` | キーワード | `<meta name="keywords">` のデフォルト値 |
| `url` | サイトURL | カノニカルURL、OGP設定 |
| `ogType` | OGタイプ | Open Graph の type 属性 |
| `author` | 著者・会社名 | `<meta name="author">` |
| `siteName` | サイト名 | OGP の site_name |
| `ogImage` | OGP画像 | SNSシェア時の画像 |
| `twitterCard` | Twitterカードタイプ | Twitter シェア設定 |
| `twitterImage` | Twitter画像 | Twitter シェア時の画像 |

### テンプレートでの使用方法

#### 基本的な使用

EJSテンプレート内で `site` オブジェクトとしてアクセスできます：

```ejs
<!-- サイトタイトルの使用 -->
<title><%= site.title %></title>

<!-- サイト説明の使用 -->
<meta name="description" content="<%= site.description %>">

<!-- OGP設定の使用 -->
<meta property="og:title" content="<%= site.title %>">
<meta property="og:image" content="<%= site.ogImage %>">
```

#### フォールバック設定

各ページで個別に設定がある場合はそれを優先し、ない場合は `site.js` の値をフォールバックとして使用：

```ejs
<!-- ページ固有のタイトルがあればそれを使用、なければサイトタイトルを使用 -->
<title><%= typeof title !== 'undefined' ? title : site.title %></title>

<!-- ページ固有の説明があればそれを使用、なければサイト説明を使用 -->
<meta name="description" content="<%= typeof description !== 'undefined' ? description : site.description %>">
```

### Front Matter での個別設定

各ページファイルのFront Matterで個別設定が可能：

```ejs
---
layout: layouts/base
title: ページタイトル | 株式会社コーポレートサイト
description: ページの説明文
keywords: キーワード,キーワード,キーワード,キーワード
url: https://example.com/dummy/index.html
---
```

### レイアウトテンプレートでの使用例

**`src/_includes/layouts/base.ejs`での使用例：**

```ejs
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title><%= typeof title !== 'undefined' ? title : site.title %></title>
  <meta name="description" content="<%= typeof description !== 'undefined' ? description : site.description %>">
  <meta name="keywords" content="<%= typeof keywords !== 'undefined' ? keywords : site.keywords %>">
  <meta name="author" content="<%= typeof author !== 'undefined' ? author : site.author %>">
  
  <!-- OGP設定 -->
  <meta property="og:title" content="<%= typeof title !== 'undefined' ? title : site.title %>">
  <meta property="og:description" content="<%= typeof description !== 'undefined' ? description : site.description %>">
  <meta property="og:type" content="<%= typeof ogType !== 'undefined' ? ogType : site.ogType %>">
  <meta property="og:url" content="<%= typeof url !== 'undefined' ? url : site.url %>">
  <meta property="og:image" content="<%= typeof ogImage !== 'undefined' ? ogImage : site.ogImage %>">
  <meta property="og:site_name" content="<%= typeof siteName !== 'undefined' ? siteName : site.siteName %>">
  
  <!-- Twitter Card設定 -->
  <meta name="twitter:card" content="<%= typeof twitterCard !== 'undefined' ? twitterCard : site.twitterCard %>">
  <meta name="twitter:title" content="<%= typeof title !== 'undefined' ? title : site.title %>">
  <meta name="twitter:description" content="<%= typeof description !== 'undefined' ? description : site.description %>">
  <meta name="twitter:image" content="<%= typeof twitterImage !== 'undefined' ? twitterImage : site.twitterImage %>">
</head>
<body>
  <%- content %>
</body>
</html>
```

### 新しい設定項目の追加

サイト全体で使用したい設定項目がある場合は、`site.js` に追加できます：

```javascript
export default {
  // 既存の設定...
  siteName: '株式会社コーポレートサイト',
  
  // 新しい設定項目の例
  socialMedia: {
    twitter: 'https://twitter.com/dummycompany',
    linkedin: 'https://linkedin.com/company/dummycompany'
  }
};
```

テンプレートでの使用：

```ejs
<!-- 新しい設定項目の使用 -->
<a href="<%= site.socialMedia.twitter %>">Twitter</a>
<a href="<%= site.socialMedia.linkedin %>">LinkedIn</a>
```
