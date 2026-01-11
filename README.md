# ランダムメッセージWebサイト

スマホ向けの1ページWebサイトです。ボタンを押すとランダムなメッセージが表示されます。

## 機能

- ボタンをクリック/タップでランダムメッセージを表示
- スマホ最適化されたレスポンシブデザイン
- シンプルで読みやすいUI
- スムーズなアニメーション効果

## ファイル構成

```
.
├── index.html   # メインHTMLファイル
├── style.css    # スタイルシート
├── script.js    # JavaScript（ランダムメッセージ機能）
└── README.md    # このファイル
```

## ローカルでの実行方法

1. リポジトリをクローン
2. `index.html` をブラウザで開く

または、簡易サーバーを起動：

```bash
# Pythonの場合
python -m http.server 8000

# Node.jsの場合（http-serverが必要）
npx http-server
```

## GitHub Pagesでの公開手順

### 方法1: GitHubのWeb UIから設定

1. GitHubでリポジトリページを開く
2. 「Settings」タブをクリック
3. 左サイドバーから「Pages」を選択
4. 「Source」セクションで以下を設定：
   - Branch: `main`（またはメインブランチ名）を選択
   - Folder: `/ (root)` を選択
5. 「Save」をクリック
6. 数分待つと、ページ上部に公開URLが表示されます
   - URL形式: `https://<ユーザー名>.github.io/<リポジトリ名>/`

### 方法2: GitHub CLIを使用

```bash
# GitHub CLIがインストールされている場合
gh repo edit --enable-pages --pages-branch main
```

### 方法3: GitHubワークフロー（推奨）

1. `.github/workflows/pages.yml` を作成（オプション）
2. GitHubの「Settings」→「Pages」で「GitHub Actions」をソースとして選択
3. プッシュすると自動的にデプロイされます

## カスタマイズ

### メッセージの追加・変更

`script.js` の `messages` 配列を編集：

```javascript
const messages = [
    "あなたのメッセージ1",
    "あなたのメッセージ2",
    // メッセージを追加
];
```

### デザインの変更

`style.css` でカラーやレイアウトをカスタマイズできます：

- グラデーションカラー: `.btn` と `body` の `background`
- フォントサイズ: 各要素の `font-size`
- 余白・間隔: `padding`, `margin`

## ライセンス

MIT License
