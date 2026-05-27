# 設計書：デザイントークン体系の取り込み（Design System layer）

- 作成日: 2026-05-27
- 対象: `C:\Oracle\3df002\ionic-ui-sample`（Ionic 8 + Vue 3 + Storybook 10）
- 元仕様: ユーザー提供「デザイントークン仕様書（Storybook構築用）v1.0」

## 1. 目的・ゴール

ユーザー提供のデザイントークン仕様（`--<カテゴリ>-<要素>-<状態>` 命名、3モード：Light/Dark/練習）を、既存 ionic-ui-sample に**並列レイヤーとして取り込む**。仮の既定パレットで「すぐ動く土台」を作り、実カラーは後でCSS1ファイルを差し替えるだけで確定できるようにする。加えて、Storybook 上で各トークンの色をランタイム編集し「デフォルトに戻せる」エディタを用意する。

## 2. 採用方針（確定事項）

| 項目 | 決定 |
|---|---|
| 構築先 | 既存 ionic-ui-sample に取り込む |
| フレームワーク | Vue（既存に合わせて確定） |
| トークン構成 | 方式A：並列共存レイヤー（既存 `--app-*`／Ionicサンプルは無改修） |
| 色 | 仮の既定パレットで雛形（後で差し替え） |
| 色編集UI | Storybook の Token Editor ページのみ（実機アプリは編集UIを持たない） |
| テーマ切替 | 既存の `useTheme` ＋ Storybook テーマツールバーを再利用（同一 `data-theme`） |

## 3. アーキテクチャ（方式A：並列共存）

- 新トークンは `src/theme/design-tokens.css` に定義。3モードを **属性セレクタ** `[data-theme="light"|"dark"|"practice"]` で定義する（`:root` 限定にしない）。これにより**ページ内で入れ子のテーマ表示**が可能になり、Foundation > Colors の「3モード横並び」を実現できる。
  - 既存 `tokens.css` は `html[data-theme=...]`（ルート限定）のまま。新レイヤーのみ属性セレクタにする（より柔軟）。両者は同じ `data-theme` に追従。
- 独自コンポーネントは `src/components/ds/` 配下に新規作成し、**新トークンのみ参照**（色の直書き禁止）。Ionic コンポーネントは使わない（プレーンな Vue + CSS）。
- Storybook は名前衝突回避のため新規分を **`Design System/Foundation | Components | Layout/...`** の別ツリーに置く（既存 `Components/*`(Ionic)・`Custom/IconButton` と非衝突）。
- 既存の `--app-*`・`ionic-bridge.css`・Ionic サンプル・`useTheme`・テーマツールバーは**無改修で再利用**。

## 4. トークン定義（`src/theme/design-tokens.css`）

仕様書 2章（色）＋3章（タイポグラフィ）の**全トークン**を3モード分、日本語コメント付き・編集しやすく集約。仮の既定パレットを投入。

定義するトークン群（カテゴリ）:
- 背景: `--bg-base`, `--bg-pattern`
- メニュー: `--menu-color-1..4`, `--menu-badge`, `--menu-open`
- テキスト: `--text-body`, `--text-heading`, `--text-input-filled`, `--text-form-guide`
- 表: `--table-header-bg`, `--table-cell-bg-1`, `--table-cell-bg-2`, `--table-border`, `--table-border-width`
- プルダウン: `--dropdown-bg`, `--dropdown-bg-selected`
- ダイアログ: `--dialog-list-item-bg`, `--dialog-list-item-bg-selected`, `--dialog-list-item-bg-unselected`, `--dialog-overlay`(rgba 30%)
- ステッパー: `--stepper-color-1..4`
- リンク: `--link-primary`, `--link-sub`, `--link-visited`
- ボタン Primary①: `--btn-primary1-bg-active`, `--btn-primary1-text-active`, `--btn-primary1-bg-disabled`, `--btn-primary1-text-disabled`
- ボタン Primary②: `--btn-primary2-*`（同上4種）
- ボタン Secondary: `--btn-secondary-border-active`, `--btn-secondary-text-active`, `--btn-secondary-bg-active`(transparent), `--btn-secondary-border-disabled`, `--btn-secondary-text-disabled`, `--btn-secondary-bg-disabled`(transparent), `--btn-secondary-border-width`, `--btn-secondary-icon-gap`
- アラート: `--alert-ng`, `--alert-warning`, `--alert-ok`
- スクロールバー: `--scrollbar-track`, `--scrollbar-thumb`, `--scrollbar-thumb-hover`
- タイポグラフィ: `--font-size-title|heading|body|caption`, `--line-height-title|heading|body|caption`, `--font-family-base`

追加トークン（仕様7章のうち**コンポーネント実装に必要な最小限**。不要なら削減可）:
- `--radius-sm`, `--radius-md`（ボタン/ダイアログの角丸）
- `--shadow-sm`, `--shadow-md`（ダイアログ等のエレベーション）
- `--focus-ring-color`, `--focus-ring-width`（a11y フォーカスリング）
- `--spacing-1`(4px), `--spacing-2`(8px), `--spacing-3`(12px), `--spacing-4`(16px)
- `--transition-base`（150–200ms 程度）

## 5. 未確定事項の仮置き（すべて後で変更可）

| 項目 | 仮の既定 |
|---|---|
| 色 | neutral ベース＋アクセント。practice はウォーム寄りの独自トーン |
| フォント | Noto Sans JP（`@fontsource/noto-sans-jp`）＋ system-ui フォールバック |
| 罫線太さ（table） | 1px |
| secondary 枠線太さ | 1px |
| 練習モード | 独自トーン（light の単純流用ではない） |
| メニュー4色 | 1=通常 / 2=ホバー / 3=選択 / 4=無効・区切り |
| Primary①② | ①=主要確定（保存/送信） / ②=次へ・遷移系 |
| ステッパー4色 | 1=完了 / 2=現在 / 3=未完了 / 4=エラー |
| Material Icons | Material Symbols Outlined・weight 200・`fill:currentColor`（`material-symbols` を自己ホスト） |

## 6. ランタイム色編集＋デフォルト復帰（Storybook Token Editor）

- `src/theme/token-registry.ts` … 全トークン名をカテゴリ別に列挙した正準リスト（型付き）。各エントリは `{ name, label, category, kind: 'color' | 'size' | 'raw' }`。**Colors ストーリーと Token Editor の単一ソース**。
- `src/theme/token-overrides.ts` … テーマ別の上書き管理。
  - `setOverride(theme, token, value)`：`document.documentElement.style.setProperty(token, value)` でインライン上書き（テーマCSSより優先）＋保存。
  - `resetToken(theme, token)` / `resetAll(theme)`：`removeProperty` ＋保存削除 → `design-tokens.css` の既定へ復帰。
  - `applyOverrides(theme)`：レジストリ既知トークンのインライン値を全クリア→当該テーマの保存分を再適用。
  - 保存先：localStorage（キー例 `ds-token-overrides:<theme>`）。
- `.storybook/preview.ts` デコレータ：`data-theme` 設定後に `applyOverrides(context.globals.theme)` を呼ぶ。**テーマ切替でそのテーマの上書きへ切替**（3テーマ独立編集）。
- `Design System/Foundation/Token Editor` ストーリー：カラートークンに `input[type=color]`（透過が要る `--dialog-overlay` 等はテキスト入力）を並べ、変更即反映。各行に個別「↺ デフォルト」、上部に「すべてデフォルトに戻す」。現在のツールバー選択テーマに対して編集する。
- スコープ：編集UIは Storybook のみ。実機アプリは `design-tokens.css` の既定値を使用。

## 7. コンポーネント＆ストーリー（`src/components/ds/` ＋ `Design System/`）

すべて CSS 変数参照のみ。SVG/アイコンは `fill: currentColor` で文字色連動。各コンポーネントは props で状態を切替（Storybook Controls 対応）。

- **Foundation**
  - `Colors`：全カラートークンをスウォッチ表示。**3モード横並び**（各列を `[data-theme]` で包む）。
  - `Typography`：`--font-size-*`・`--line-height-*` のサンプル。
  - `Icons`：Material Symbols の代表アイコン一覧（weight 200・currentColor）。
  - `Token Editor`：6章の編集UI。
- **Components**
  - `Button`：`DsButton`（variant: primary1 / primary2 / secondary、disabled、secondary はアイコン+枠線、icon-gap）。
  - `Table`：`DsTable`（見出し行・ゼブラ・罫線）。
  - `Dropdown`：`DsDropdown`（背景・選択中背景）。
  - `Dialog`：`DsDialog`（オーバーレイ30%・一覧項目の選択/未選択）。
  - `Stepper`：`DsStepper`（4状態：完了/現在/未完了/エラー）。
  - `Alert`：`DsAlert`（NG/警告/OK、Controls で種類切替）。
  - `Link`：`DsLink`（primary/sub/visited）。
- **Layout**
  - `Menu`：`DsMenu`（4色・バッジ・展開状態）。
  - `Scrollbar`：`DsScrollbar`（`--scrollbar-*` を使ったカスタムスクロールバー領域のデモ）。

## 8. アセット・読み込み

- 追加依存：`@fontsource/noto-sans-jp`、`material-symbols`。
- `src/main.ts` と `.storybook/preview.ts` で、フォント・Material Symbols・`design-tokens.css` を読み込む（`design-tokens.css` は既存 `tokens.css`/`ionic-bridge.css` と並べて import）。
- `--font-family-base` に Noto Sans JP を設定。

## 9. テスト方針（規模相応）

- Storybook を視覚検証の主軸に。
- Vitest（軽量）：
  - `token-registry`：トークン名の重複なし・各エントリに name/label/category/kind が揃う。
  - `token-overrides`：`setOverride` がインライン値を設定し localStorage に保存、`resetToken` が `removeProperty` ＋保存削除、`applyOverrides` がテーマ切替で正しく再適用（jsdom）。
- 過剰なテストは作らない。

## 10. 実装の段階分け

- Phase 1：依存追加 ＋ `design-tokens.css`（全トークン仮値）＋ `token-registry.ts` ＋ CSS/フォント読み込み ＋ Foundation（Colors / Typography / Icons）。
- Phase 2：`token-overrides.ts`（TDD）＋ `Token Editor` ストーリー。
- Phase 3：Components（Button / Table / Dropdown / Dialog / Stepper / Alert / Link）。
- Phase 4：Layout（Menu / Scrollbar）。
- 各フェーズで4ゲート（`npm run build` / `npm test` / `npm run lint` / `npm run build-storybook`）合格を確認。

## 11. スコープ外（YAGNI）

- 実カラーの確定（仮値で進め、後で差し替え）。
- 既存 `--app-*`・`ionic-bridge.css`・Ionic サンプルの改修。
- 実機アプリ側の色編集UI（Storybook のみ）。
- React / プレーンHTML 版（Vue のみ）。
- トークン上書きの実機アプリ同期（Storybook 限定）。

## 12. 既存への影響

- 既存ストーリー（`Components/*`(Ionic), `Custom/IconButton`）・テーマ・テストは無改修。新規追加のみ。
- `main.ts`/`preview.ts` は import 追加とデコレータ拡張のみ（既存挙動は維持）。
