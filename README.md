<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Svelte](https://img.shields.io/badge/Svelte-5-orange.svg)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2-black.svg)](https://kit.svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7.svg)](https://www.netlify.com/)

</div>

# Svelte & TypeScript Learning Notes

**Svelte / SvelteKit / TypeScript を、実務寄りに学ぶための日本語ドキュメントサイト**

このリポジトリは、自分用の学習ノートとして作った SvelteKit ドキュメントサイトです。「公式チュートリアルの写経」ではなく、**実際に小さな Web アプリを作るときに戻ってこられる**ことを意識して書いています。

[Motion Core Documentation Template](https://github.com/Motion-Core/motion-core-docs-template) をベースに、サイト名・サイドバー・ドキュメント本文を大幅に書き換えています。

---

## ✨ 目的

- Svelte / SvelteKit / TypeScript を **超初心者にもわかるやさしい日本語** で説明する
- 公式チュートリアルでは触れにくい **実務的な使い方**（4状態UI・debounce検索・権限つき管理画面など）まで踏みこむ
- **「あれ何だっけ？」と思ったときに戻ってこられる**逆引きリファレンス（チートシート）も用意する
- 自治会サイト・FAQ・社内ポータル・管理画面などに**そのまま応用できる**実例を集める

## 📚 学べる内容

サイドバーの章立てに沿って、ゼロから順番に読めます。

| セクション | 章数 | 内容 |
| --- | --- | --- |
| **はじめに** | 6 | プロジェクトの作り方・Svelte と SvelteKit の違い・React と Svelte の比較・最初の1ファイル・チートシート |
| **Svelte 実践基本** | 8 | `$state` / `$derived` / `$effect` / `props` / `bind` / `{#if}` / `{#each}` / class・style |
| **SvelteKit 実践基本** | 9 | `+page.svelte` / `+layout.svelte` / `[slug]` / `load` / `+page.server.ts` / `form actions` / `+server.ts` / `error / redirect` / `hooks` |
| **TypeScript 実践基本** | 9 | 型は名札 / type vs interface / Union / Literal / optional / Utility Types / API レスポンス / Generics / 型ガード / Result 型 |
| **実務パターン集** | 4 | 4状態UI・現在地メニュー下線・ダークモード・debounce 検索 |
| **小さなアプリ例** | 8 | Todo（ローカル/localStorage/server）・お知らせ一覧・検索リスト・お知らせ管理画面・サーバー検索リスト・ログインフォーム |

**合計 44 ページ + トップページ + 索引（チートシート）= 46 ページ**

## ⚠️ 注意：認証関連は学習用サンプル

このサイトの **`/docs/examples/login-form`** や **`/docs/examples/admin-board`** で扱うログイン・権限チェックは、**「SvelteKit の hooks / Cookie / form actions / locals.user の流れを理解するための教材」** です。

実務では：

- **パスワードハッシュ化**（bcrypt / argon2 など）
- **HTTPS 必須**
- **CSRF・レート制限・セッションローテーション**

などを満たした、安全な認証設計が必要です。
本番運用では、自前で認証を組むのではなく、

- **SNSログイン**（Google / LINE / GitHub など、OAuth / OpenID Connect）
- **認証ライブラリ**（Auth.js / Lucia / Clerk）
- **マネージド認証サービス**（Firebase Auth / Supabase Auth / Auth0）

を検討するのがおすすめです。

教材ページ内でも警告を入れていますが、**コードを実プロダクトにそのまま持ちこまないでください**。

---

## 🚀 Development

[Bun](https://bun.sh/) を使うモノレポ構成です。

```bash
# 依存関係をインストール
bun install

# 開発サーバを起動（http://localhost:5173）
bun run dev
```

主要コマンド：

```bash
bun run dev        # 開発サーバ
bun run build      # 本番ビルド
bun run preview    # 本番ビルドのローカル確認
bun run check      # svelte-check
bun run lint       # ESLint
bun run format     # Prettier
```

## 🏗️ Build

```bash
bun run build
```

ルートの `bun run build` は、内部で `bun run --cwd apps/web build` を呼び出し、SvelteKit を `@sveltejs/adapter-netlify` でビルドします。出力は `apps/web/build/` と `apps/web/.netlify/functions-internal/` に生成されます。

## 📂 Project Structure

```
.
├─ apps/
│  └─ web/                          ← SvelteKit アプリ本体
│     ├─ src/
│     │  ├─ lib/
│     │  │  ├─ components/docs/     ← サイドバー・TOC・コードブロック等のUI
│     │  │  ├─ config/              ← サイト名・ナビゲーション・docs UI 設定
│     │  │  └─ ...
│     │  └─ routes/
│     │     ├─ +page.svelte         ← トップページ
│     │     └─ docs/                ← 各章の `.svx`（mdsvex）ページ
│     ├─ static/                    ← ファビコン・OG 画像など
│     ├─ svelte.config.js           ← adapter-netlify 設定
│     └─ wrangler.jsonc             ← Cloudflare 用設定（残置）
├─ scripts/                         ← changelog 生成スクリプト
├─ netlify.toml                     ← Netlify ビルド設定
├─ package.json                     ← workspaces ルート
└─ bun.lock
```

主に編集する場所：

- **記事を追加・修正する** → `apps/web/src/routes/docs/<カテゴリ>/<スラッグ>/+page.svx`
- **サイドバーの章立てを変える** → `apps/web/src/lib/config/navigation.ts`
- **サイト名・SEO** → `apps/web/src/lib/config/site.ts`
- **ブランド表示** → `apps/web/src/lib/config/branding.ts`
- **docs UI（検索・TOC・コピーボタン等）** → `apps/web/src/lib/config/docs-ui.ts`

## 🌐 Deployment（Netlify）

このリポジトリは **Netlify でのデプロイ**を想定しています。`netlify.toml` がルートにあるので、Netlify 側ではほぼ自動検出されます。

### 初回デプロイ手順

1. [Netlify ダッシュボード](https://app.netlify.com/) で **Add new site → Import an existing project**
2. **Deploy with GitHub** → このリポジトリを選択
3. 設定はすべて `netlify.toml` から自動入力（base / command / publish / Node version）
4. **Deploy site** をクリック

### `netlify.toml` の中身

```toml
[build]
  base = "apps/web"
  command = "bun run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "20"

[functions]
  directory = ".netlify/functions-internal"
```

- `base = "apps/web"` … モノレポなので SvelteKit アプリのある場所を Netlify に伝える
- `command = "bun run build"` … `apps/web/package.json` の `build` スクリプト
- `publish = "build"` … `adapter-netlify` の出力先（base からの相対パス）
- `[functions] directory = ".netlify/functions-internal"` … `adapter-netlify` が出力する SSR 用 catch-all 関数（Functions v2、`path: ["/*"]`）の置き場を Netlify に明示。auto-detect でも動く場面が多いが、モノレポでは見落とされることがあるため安全策として明示している

### Netlify ダッシュボードの Build settings について

Netlify の UI には **Base directory / Package directory / Publish directory / Functions directory** という入力欄があります。**ここはすべて空欄でOK**です（または UI の自動入力のままでOK）。`netlify.toml` がリポジトリルートにあれば、UI の値より **`netlify.toml` が優先**されます。

UI 側で値を変更すると `Overridden by netlify.toml` という赤いメッセージが表示されますが、これは**正常動作**です。「toml が勝っている」という確認にもなります。

### 環境変数

このサイト本体は **環境変数なしで動きます**（外部 API 連携なし）。
将来 DB や外部認証を足す場合は、Netlify ダッシュボードの **Site settings → Environment variables** から設定してください。

---

## 🙏 Template Credit

このリポジトリは [Motion Core Documentation Template](https://github.com/Motion-Core/motion-core-docs-template) をベースにしています。

ベーステンプレートが提供する機能：

- mdsvex を使った `.svx` 記事システム
- Shiki によるコードブロックハイライト
- TOC（目次）自動生成
- サイドバー・モバイルナビ
- 検索（⌘K）UI
- OG 画像自動生成
- ライト／ダークテーマ切り替え

これらの仕組みは**そのまま活用**しつつ、**サイト名・記事本文・サイドバー構成**を学習用に書き換えています。

ベーステンプレートも MIT License です。テンプレ作者に感謝。

## 📄 License

[MIT](./LICENSE)

このリポジトリのコードは MIT License で公開しています。
ベースとなった Motion Core Documentation Template も MIT License です。
