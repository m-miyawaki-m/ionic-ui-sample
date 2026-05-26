# ionic-ui-sample

Ionic 8 + Vue 3 + Capacitor(Android) の **UI / ページ サンプル集**。
ライト / ダーク / 練習 の3テーマを切り替えでき、配色は `src/theme/tokens.css` の
`--app-*` 変数を編集するだけで変更できます。Storybook でもコンポーネントをカタログ化しています。

## 構成

- **アプリ内サンプルブラウザ** — ホーム（カタログ）→ コンポーネント一覧 / ページサンプル一覧 / 設定。
  実機でテーマを切り替えながら確認できます。
- **Storybook** — コンポーネントを args/コントロール付きで個別検証。ツールバーから同じ3テーマを切替。

両者は同じ CSS トークン（`--app-*`）と `data-theme` 属性を共有するため、見た目は一致します。

## 開発

```bash
npm run dev             # Vite 開発サーバ
npm run storybook       # コンポーネントカタログ（Storybook）
npm test                # 単体テスト（Vitest）
npm run build           # 本番ビルド（vue-tsc 型チェック + Vite）
npm run build-storybook # Storybook の静的ビルド
```

## Android（Capacitor）

```bash
npm run build
npx cap sync android
npx cap open android    # Android Studio で開いて実機/エミュレータで実行
```

`appId` は `com.example.ionicuisample`（`capacitor.config.ts`）。
テーマ設定は `@capacitor/preferences`（端末）/ `localStorage`（Web）に保存され、再起動後も保持されます。

## 配色のカスタマイズ（ここだけ編集すればOK）

`src/theme/tokens.css` の各テーマブロック（`html[data-theme="light" | "dark" | "practice"]`）に、
背景・面・文字・罫線・アクセントの色が **わかりやすい名前の変数** で並んでいます。

| 変数 | 用途 |
|------|------|
| `--app-bg` | 画面全体の背景 |
| `--app-surface` / `--app-surface-2` | カード・リスト面 / ヘッダ等の濃い面 |
| `--app-text` / `--app-text-muted` | 通常の文字色 / 補助・キャプション |
| `--app-text-on-primary` ほか `-on-*` | アクセント色の上に乗る文字色 |
| `--app-border` | 枠線・区切り線 |
| `--app-primary` / `--app-success` / `--app-warning` / `--app-danger` | アクセント色 |

Ionic 標準変数（`--ion-*`）へのマッピングは `src/theme/ionic-bridge.css` が担います（通常は編集不要）。
新しいテーマを増やしたいときは `tokens.css` に `html[data-theme="..."] { ... }` ブロックを追加し、
`src/composables/useTheme.ts` の `ThemeName` と `THEMES` に名前を加えてください。

## ディレクトリ

```
src/
├── theme/{tokens.css, ionic-bridge.css, variables.css, storage.ts}
├── composables/useTheme.ts        テーマ状態・切替・保存
├── data/catalog.ts                サンプル登録簿（一覧画面を駆動）
├── router/index.ts                登録簿+レジストリからルート生成
├── views/
│   ├── HomePage / ComponentsListPage / PagesListPage / SettingsPage
│   ├── components/                DemoLayout.vue + 各 *Demo.vue + registry.ts
│   └── pages/                     ログイン / リスト+詳細 / タブ
└── stories/                       Storybook 用ストーリー
```
