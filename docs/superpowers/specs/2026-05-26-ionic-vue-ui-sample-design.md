# 設計書：Ionic + Vue UIサンプル＆テーマ切替アプリ

- 作成日: 2026-05-26
- 対象ディレクトリ: `C:\Oracle\3df002\ionic-ui-sample`

## 1. 目的・ゴール

Ionic 8 + Capacitor の Android アプリとして、**UIコンポーネントとページのサンプル一覧**を提供する。
用途は2つ（両方）：

1. **アプリ内サンプルブラウザ** — 実機でテーマを切り替えながら、各UI／ページサンプルを閲覧・動作確認できる。
2. **Storybook** — コンポーネントを args/コントロール付きで個別に検証するデザインカタログ。

加えて、設定画面で **ライト・ダーク・練習** の3テーマを切り替えられ、**罫線・背景・文字色などすべての部品色**を、**わかりやすい1か所のCSSファイル**で指定できるようにする。

## 2. 技術スタック

| 項目 | 採用 |
|------|------|
| フレームワーク | Ionic 8 + Vue 3 + Vite（Ionic公式 `vue` スターター） |
| ネイティブ | Capacitor（Android プラットフォーム） |
| カタログ | Storybook 8（`@storybook/vue3-vite`） |
| 永続化 | `@capacitor/preferences`（端末）＋ `localStorage` フォールバック（Web/Storybook） |
| テスト | Vitest（単体）＋ Storybook（視覚確認） |

ツールチェーン確認済み: Node v24 / npm 11 / Ionic CLI 7.2.1 / Java 17。

## 3. 全体像（2つの入口）

- **アプリ内**：ホーム（カタログ）→ コンポーネント一覧／ページサンプル一覧／設定 へ遷移。
- **Storybook**：コンポーネントを個別検証。ツールバーから同じ3テーマを切替。

両者は **同一のCSSトークン＋`data-theme` 属性** を共有するため、見た目は完全に一致する。

## 4. ディレクトリ構成（主要部）

```
ionic-ui-sample/
├── src/
│   ├── main.ts                      Ionic Vue セットアップ・ルーター・マウント
│   ├── App.vue                      ルート。起動時にテーマを適用
│   ├── router/index.ts              ルーティング定義
│   ├── theme/
│   │   ├── tokens.css            ★ 層1: --app-* トークン（色を変える唯一の場所）
│   │   ├── ionic-bridge.css         層2: --ion-* → --app-* 紐付け（基本いじらない）
│   │   └── variables.css            Ionic標準（スターター生成・最小限）
│   ├── composables/
│   │   └── useTheme.ts              テーマ状態・切替・保存・復元
│   ├── data/
│   │   └── catalog.ts               サンプル一覧の登録簿（一覧画面を駆動）
│   ├── views/
│   │   ├── HomePage.vue             カタログ（各セクションへの入口）
│   │   ├── ComponentsListPage.vue   コンポーネント一覧
│   │   ├── components/              各コンポーネントのデモ画面（*Demo.vue）
│   │   ├── PagesListPage.vue        ページサンプル一覧
│   │   ├── pages/                   ログイン / リスト＋詳細 / タブ など
│   │   └── SettingsPage.vue         ライト・ダーク・練習の切替（実機能）
│   └── stories/                     Storybook 用ストーリー（*.stories.ts）
├── .storybook/
│   ├── main.ts
│   └── preview.ts                   テーマ切替デコレータ＋ツールバー
├── capacitor.config.ts
└── android/                         cap add android で生成
```

## 5. テーマ・色の仕組み（方式A：2層トークン）

### 層1: `src/theme/tokens.css`（編集する唯一の場所）

テーマごとに、日本語コメント付きで全パーツ色を並べる。

```css
/* ============ ライトテーマ ============ */
:root,
html[data-theme="light"] {
  /* 背景・面 */
  --app-bg:            #ffffff;  /* 画面全体の背景 */
  --app-surface:       #f7f7f9;  /* カード・リスト面 */
  --app-surface-2:     #eeeef2;  /* ヘッダ等の一段濃い面 */
  /* 文字 */
  --app-text:          #1a1a1a;  /* 通常の文字色 */
  --app-text-muted:    #6b7280;  /* 補助・キャプション */
  --app-text-on-primary:#ffffff; /* 主色の上の文字 */
  /* 罫線 */
  --app-border:        #d8d8de;  /* 枠線・区切り線 */
  /* アクセント */
  --app-primary:       #3b82f6;
  --app-success:       #16a34a;
  --app-warning:       #d97706;
  --app-danger:        #dc2626;
}
/* ============ ダークテーマ ============ */
html[data-theme="dark"]     { /* 同じ項目を暗色で */ }
/* ============ 練習テーマ ============ */
html[data-theme="practice"] { /* 練習用の配色 */ }
```

### 層2: `src/theme/ionic-bridge.css`（基本いじらない）

Ionic標準変数を層1トークンへ一度だけ接続。Ionic全部品が自動でテーマ追従。

```css
:root {
  --ion-background-color: var(--app-bg);
  --ion-text-color:       var(--app-text);
  --ion-border-color:     var(--app-border);
  --ion-card-background:  var(--app-surface);
  --ion-toolbar-background:var(--app-surface-2);
  --ion-item-background:  var(--app-surface);
  --ion-color-primary:    var(--app-primary);
  --ion-color-primary-contrast: var(--app-text-on-primary);
  /* success / warning / danger も同様。
     Ionicが内部で使う -rgb 変種も併せて定義する */
}
```

補足：Ionicの一部コンポーネントは `--ion-color-primary-rgb` や `-shade/-tint` を参照する。
これらブリッジ側で必要分を定義し、見た目崩れが無いことをテーマ切替で確認する。

### `src/composables/useTheme.ts`

- `theme` リアクティブ状態（`'light' | 'dark' | 'practice'`）。
- `setTheme(name)` … `document.documentElement.setAttribute('data-theme', name)` ＋ 保存。
- 起動時に保存値を復元。無効値・未保存時は `'light'` にフォールバック。
- 保存層は小さなラッパで抽象化：`@capacitor/preferences` が使える環境ではそれを、無ければ `localStorage` を使用（Storybook では `localStorage` 経路）。

## 6. ナビゲーション / ルーティング

| パス | 画面 |
|------|------|
| `/` | HomePage（カタログ。コンポーネント/ページ/設定への入口） |
| `/components` | ComponentsListPage（コンポーネント一覧） |
| `/components/:id` | 各コンポーネントのデモ画面 |
| `/pages` | PagesListPage（ページサンプル一覧） |
| `/pages/login` | ログイン／サインアップ |
| `/pages/list` `/pages/list/:id` | リスト＋詳細 |
| `/pages/tabs` | タブレイアウト（ネスト `IonTabs`） |
| `/settings` | 設定（テーマ切替） |

設定はホームとヘッダボタンの両方から到達可能。

## 7. コンポーネント厳選セット（約18種）

Button / Icon / Input / Textarea / Select / Checkbox / Toggle / Radio / Range /
Searchbar / Segment / Card / List & Item / Badge & Chip / Avatar & Thumbnail /
Accordion / Modal・Alert・ActionSheet・Toast（オーバーレイ系） /
Loading・Spinner・Progress / FAB

`src/data/catalog.ts` に各サンプルを `{ id, title, route, category }` として登録し、一覧画面はこの登録簿から動的に生成する（追加が容易）。

## 8. ページサンプル（4種）

- **ログイン／サインアップ**：入力フォーム＋ボタンの認証画面雛形。
- **リスト＋詳細**：一覧→タップ→詳細へ遷移（マスター詳細型）。
- **タブレイアウト**：`IonTabs` による下部タブの定番ナビ（ネスト構成のデモ）。
- **設定ページ**：テーマ切替（ライト/ダーク/練習）を含む実機能画面。

## 9. Storybook 連携

- `.storybook/main.ts`：`@storybook/vue3-vite`、`stories: ['../src/**/*.stories.@(ts|js)']`。
- `.storybook/preview.ts`：
  - Ionic コア CSS ＋ `tokens.css` ＋ `ionic-bridge.css` を import。
  - `setup((app) => app.use(IonicVue))` で IonicVue を登録。
  - `globalTypes` に theme トグル（light/dark/practice）。デコレータが `documentElement` に `data-theme` を付与。
- 各コンポーネントに args/コントロール付きストーリーを用意（Storybook の強みを活かす）。

## 10. テスト方針（規模相応）

- **Storybook** を視覚的検証の主軸とする。
- **Vitest** 単体テスト：
  - `useTheme`：属性付与・保存・復元・フォールバック。
  - `catalog`：登録簿の整合（id重複なし、route定義あり）。
- 過剰なテストは作らない（サンプルプロジェクトのため）。

## 11. エラーハンドリング（最小限）

- テーマ保存値が不正なら `'light'` にフォールバック。
- ストレージI/O失敗は捕捉して無視（メモリ上の状態は維持）。

## 12. ビルド／実行フロー

- 開発：`npm run dev`（Vite）／ `npm run storybook`
- Android：`npm run build` → `npx cap sync android` → `npx cap open android`（実機/エミュレータ）
- `capacitor.config.ts`：`appId: com.example.ionicuisample`、`webDir: dist`

## 13. スコープ外（YAGNI）

- アプリ内カラーピッカー（色はCSSファイル編集で対応）。
- 練習モード固有の追加動作（練習モードは配色テーマの1つに留める）。
- iOS プラットフォーム（Android のみ）。
- 認証・データ永続化などの実機能（ログインはUI雛形のみ）。
