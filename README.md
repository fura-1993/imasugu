# 便利屋 いますぐ365 公式サイト

茨城県南エリアで暮らしのお困りごとをお手伝いする「便利屋 いますぐ365」の公式サイトです。ビルド工程を必要としない静的HTML・CSS・JavaScriptで構成しています。

## ローカルで確認する

Python 3が入っている環境で、このリポジトリのルートへ移動して次を実行します。

```bash
python -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いてください。終了する場合は、ターミナルで `Ctrl + C` を押します。

## お問い合わせフォームについて

お問い合わせフォームは、入力内容を端末のメールアプリへ引き渡す `mailto:` 方式です。フォーム送信時にメールアプリが起動し、お客様自身で内容を確認してから送信します。サイト側のサーバーには入力内容を保存しません。

メールアプリが設定されていない端末では送信できないため、その場合は次の窓口をご利用ください。

- 電話：080-5535-0365
- メール：info@imasugu365.site
- LINE：https://lin.ee/BLQjGlF

## RailwayへGitHubからデプロイする

1. このリポジトリを `https://github.com/fura-1993/imasugu` の `main` ブランチへプッシュします。
2. Railwayへログインし、**New Project** → **Deploy from GitHub repo** を選びます。
3. GitHub連携を許可し、`fura-1993/imasugu` を選びます。
4. Railwayがルートの `index.html` を静的サイトとして検出したことを確認し、デプロイを開始します。ビルドコマンドや出力ディレクトリの指定は不要です。
5. 発行された `*.up.railway.app` のURLで、トップページ、フォーム、旧URLからの移動を確認します。存在しないURLにもアクセスし、`404.html` の表示とHTTPステータスが404であることを確認します。
6. Railwayのサービス画面で **Settings** → **Public Networking** → **+ Custom Domain** を開き、`www.imasugu365.site` を追加します。
7. Railwayに表示される接続先へのCNAMEと、ドメイン所有確認用のTXTを、どちらもドメイン側へ登録します。既存のメール用MX・SPF・DKIM・DMARCやネームサーバーの設定は削除しないでください。
8. `imasugu365.site`（wwwなし）も利用する場合はRailwayへ追加し、Railwayが示すALIAS/TXTを設定します。どちらか一方を正規URLに決め、もう一方からHTTP 301で転送してください。本サイトは `www.imasugu365.site` を正規URLとして設定しています。

`main` ブランチへの以後のプッシュは、RailwayのGitHub自動デプロイで反映されます。独自ドメインのDNSを切り替える前に、Railwayの仮URLで全ページを確認してください。DNSの反映には最大72時間ほどかかる場合があります。

このリポジトリの旧URL互換ページは、静的サイト内の即時転送（JavaScriptとmeta refresh）です。公開後に各URLの動作を確認し、検索評価を確実に引き継ぐHTTP 301が必要な場合は、Cloudflare等の配信レイヤーで恒久転送を設定してください。

## 主なファイル

- `index.html`：トップページ
- `styles.css`：共通スタイル
- `script.js`：メニューやフォーム等の動作
- `privacy-policy/`：プライバシーポリシー
- `price/`、`service/`、`faq/`、`customer-voices/`、`contact/`、`会社概要/`：旧URL互換ページ
- `robots.txt`、`sitemap.xml`：検索エンジン向け設定
- `site.webmanifest`、`favicon.svg`：端末・ブラウザ向けサイト情報
- `404.html`：ページが見つからない場合の案内

## 公開前チェック

- 電話番号、メールアドレス、LINEリンクが正しいこと
- スマートフォンとパソコンで表示が崩れていないこと
- お問い合わせフォームからメールアプリが正しく起動すること
- `robots.txt` と `sitemap.xml` が公開URLで表示できること
- Railwayの独自ドメインでHTTPSが有効になっていること
