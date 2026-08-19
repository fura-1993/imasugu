# 便利屋 いますぐ365 公式サイト

茨城県南エリアで暮らしのお困りごとをお手伝いする「便利屋 いますぐ365」の公式サイトです。ビルド工程を必要としない静的HTML・CSS・JavaScriptで構成しています。

## ローカルで確認する

Python 3が入っている環境で、このリポジトリのルートへ移動して次を実行します。

```bash
python -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いてください。終了する場合は、ターミナルで `Ctrl + C` を押します。

## お問い合わせ方法

サイトからのお問い合わせは電話のみです。

- 電話：080-5535-0365（受付 7:00〜22:00・年中無休）

## RailwayへGitHubからデプロイする

1. このリポジトリを `https://github.com/fura-1993/imasugu` の `main` ブランチへプッシュします。
2. Railwayへログインし、**New Project** → **Deploy from GitHub repo** を選びます。
3. GitHub連携を許可し、`fura-1993/imasugu` を選びます。
4. Railwayがルートの `index.html` を静的サイトとして検出したことを確認し、デプロイを開始します。ビルドコマンドや出力ディレクトリの指定は不要です。
5. 発行された `*.up.railway.app` のURLで、トップページ、電話リンク、旧URLからの移動を確認します。存在しないURLにもアクセスし、`404.html` の表示とHTTPステータスが404であることを確認します。
6. Railwayのサービス画面で **Settings** → **Public Networking** → **+ Custom Domain** を開き、`www.imasugu365.site` を追加します。
7. Railwayに表示される接続先へのCNAMEと、ドメイン所有確認用のTXTを、どちらもドメイン側へ登録します。既存のDNSレコードやネームサーバーの設定は削除しないでください。
8. `imasugu365.site`（wwwなし）も利用する場合はRailwayへ追加し、Railwayが示すALIAS/TXTを設定します。どちらか一方を正規URLに決め、もう一方からHTTP 301で転送してください。本サイトは `www.imasugu365.site` を正規URLとして設定しています。

`main` ブランチへの以後のプッシュは、RailwayのGitHub自動デプロイで反映されます。独自ドメインのDNSを切り替える前に、Railwayの仮URLで全ページを確認してください。DNSの反映には最大72時間ほどかかる場合があります。

このリポジトリの旧URL互換ページは、静的サイト内の即時転送（JavaScriptとmeta refresh）です。公開後に各URLの動作を確認し、検索評価を確実に引き継ぐHTTP 301が必要な場合は、Cloudflare等の配信レイヤーで恒久転送を設定してください。

## 主なファイル

- `index.html`：トップページ
- `styles.css`：共通スタイル
- `script.js`：メニューや表示アニメーション等の動作
- `privacy-policy/`：プライバシーポリシー
- `price/`、`service/`、`faq/`、`customer-voices/`、`contact/`、`会社概要/`：旧URL互換ページ
- `robots.txt`、`sitemap.xml`：検索エンジン向け設定
- `site.webmanifest`、`favicon.svg`：端末・ブラウザ向けサイト情報
- `404.html`：ページが見つからない場合の案内

## 公開前チェック

- 電話番号が正しく、電話以外の問い合わせ導線が表示されていないこと
- スマートフォンとパソコンで表示が崩れていないこと
- すべての問い合わせ導線から電話をかけられること
- `robots.txt` と `sitemap.xml` が公開URLで表示できること
- Railwayの独自ドメインでHTTPSが有効になっていること
