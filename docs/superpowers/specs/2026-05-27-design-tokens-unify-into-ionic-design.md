# 設計書（改訂・統合版）：デザイントークンを Ionic に流し込んで統合

- 作成日: 2026-05-27
- 対象: `C:\Oracle\3df002\ionic-ui-sample`
- **これは `2026-05-27-design-tokens-design.md`（独自 `Ds*` コンポーネント方式）を置き換える改訂版**。既に main にマージ済みの Ds* 実装を、Ionic タグ＋統合トークン方式へ作り直す。

## 1. 背景・方針転換

当初の design-tokens 実装は、トークンを**独自 Vue コンポーネント `Ds*`** で表現した。しかし本来の狙いは「**Ionic のタグ（`ion-*`）に CSS 変数で色を当て、色変化パターン／部品ごとの色パターン例を見せる**」こと。独自コンポーネントは目的外だった。

加えて、トークンが2系統（既存 `--app-*` ＋ 仕様の `--<部品>-*`）に分かれ、Token Editor は後者だけを編集していたため、**CSS とエディタが分散**していた。これを**1系統に統合**する。

## 2. 方針（確定）

| 項目 | 決定 |
|---|---|
| 表現 | **Ionic タグ（`ion-*`）に CSS 変数で色を当てる**。独自 `Ds*` は廃止 |
| トークン | **1ソースに統合**（既存 `--app-*` ＋ 仕様 `--<部品>-*` を1ファイルへ） |
| Ionic への適用 | 単一の `ionic-bridge.css` で **Ionic に流し込む**（`--ion-*` グローバル＋部品変数） |
| 編集 | 単一の **Token Editor**（統合トークンを編集→Ionic が即追従） |
| Storybook | Ionic タグの**色パターン例**に作り直し |
| アイコン | **ionicons 据え置き**（Material Symbols は不使用＝撤去）。フォント Noto Sans JP は `--ion-font-family` で Ionic に流し込み継続 |

## 3. 統合アーキテクチャ

### 3.1 単一トークンソース
`src/theme/tokens.css` と `src/theme/design-tokens.css` を**1ファイルに統合**（`design-tokens.css` を正準とし `tokens.css` は廃止、`main.ts`/`preview.ts` の import を付け替え）。3テーマは `[data-theme]` 属性セレクタ。構成は3層：
- **土台パレット**（`--app-bg` / `--app-surface` / `--app-surface-2` / `--app-text` / `--app-text-muted` / `--app-text-on-*` / `--app-border` / `--app-primary`(+rgb) / `--app-success` / `--app-warning` / `--app-danger`(+rgb)）… `--ion-*` の駆動元。
- **部品パターン**（`--menu-*` / `--table-*` / `--dropdown-*` / `--dialog-*` / `--stepper-*` / `--link-*` / `--btn-primary1|2|secondary-*` / `--alert-*` / `--scrollbar-*`）… Ionic 部品変数への上書き元。土台と意味が重なる色（例 `--alert-ng` ↔ `--app-danger`）は **`var()` 参照で重複排除**。
- **タイポグラフィ/追加**（`--font-family-base` / `--font-size-*` / `--line-height-*` / `--radius-*` / `--shadow-*` / `--focus-ring-*` / `--spacing-*` / `--transition-base`）。

### 3.2 単一ブリッジ（Ionic へ流し込む）
`src/theme/ionic-bridge.css`（既存を拡張）。2階層で流し込む：
- **グローバル**（`:root`）: `--ion-background-color←--app-bg`、`--ion-text-color←--app-text`、`--ion-border-color←--app-border`、`--ion-color-primary←--app-primary`（+contrast/rgb）、success/warning/danger ← `--app-*`、`--ion-toolbar-background`/`--ion-item-background`/`--ion-card-background` ← surface 系、**`--ion-font-family←--font-family-base`**。
- **部品パターン用クラス**: Ionic 部品の CSS 変数をトークンから当てる小さなユーティリティクラス（場所は `ionic-bridge.css` 内に集約＝Ionic への写像はこの1ファイルに統一）。例：
  - `.btn-primary1 { --background: var(--btn-primary1-bg-active); --color: var(--btn-primary1-text-active); }`、`.btn-primary2`、`.btn-secondary`（outline）
  - テーブルのゼブラ/罫線、メニュー4色、ステッパー4色、ダイアログ項目の選択/未選択 等も同様にクラスで `ion-*`（または素の要素）へ当てる。

### 3.3 単一エディタ
既存 **Token Editor** を統合トークン（土台＋部品）編集に拡張。`token-registry.ts` を統合トークンへ更新。`token-overrides.ts`（テーマ別ランタイム上書き＋リセット）は**そのまま流用**。編集すると **既存 Ionic サンプルも色パターン例も同時に即追従**。

### 3.4 Storybook
- **Foundation（`src/stories/ds/` に維持）**: `Colors`（統合トークン一覧・3モード横並び）/ `Typography` / `Token Editor`。`Icons`（Material版）は**廃止**（ionicons 据え置きのため）。
- **色パターンは新規ファイルを作らず、既存の Ionic サンプル stories（`src/stories/*.stories.ts`）に追記**して見せる（新規作成はいったん見送り）。対応する既存ストーリーがある部品から適用：
  - `Button.stories.ts` … `ion-button` に `.btn-primary1` / `.btn-primary2` / `.btn-secondary` を当てた活性/非活性の色パターン例を追加。
  - `Select` / `Card` / `Input` / `Badge` / `Overlays` 等、対応する既存ストーリーにトークン由来の色パターン例を追記。
- **対応する既存ストーリーが無い部品トークン**（`--table-*` / `--menu-*` / `--stepper-*` / `--link-*` / `--scrollbar-*` など）は、トークン定義＋ Token Editor の編集対象としては残すが、**専用デモは今回は作らない**（新規ファイル作成は見送り）。
- 旧 `src/stories/ds/*` のうち **Ds* コンポーネントを使うストーリー（Button/Table/Dropdown/Dialog/Stepper/Alert/Link/Menu/Scrollbar）は削除**。Foundation 系（Colors/Typography/Token Editor）は残す。

## 4. 撤去するもの
- `src/components/ds/*.vue`（9コンポーネント）。
- `src/stories/ds/` のうち **Ds* コンポーネント依存のストーリー**（Button/Table/Dropdown/Dialog/Stepper/Alert/Link/Menu/Scrollbar）。**Foundation 系（Colors/Typography/Token Editor）は残す**。
- `src/theme/tokens.css`（`design-tokens.css` に統合）。
- **Material Symbols 一式**：`material-symbols` 依存、`src/theme/ds-icons.css`、Foundation の Material `Icons` ストーリー、`main.ts`/`preview.ts` の該当 import。
  - フォントは **Noto Sans JP のみ残す**（`@fontsource/noto-sans-jp` → `--font-family-base` → `--ion-font-family`）。

## 5. 影響・非回帰
- 既存 Ionic サンプル（`Components/*`、`Custom/IconButton`）は `--ion-*` 経由で統合トークンに追従（**無改修**。むしろ Token Editor の編集対象になる）。
- `--app-*` の直接参照（`SettingsPage.vue` の hint、`DetailPage.vue` の `.sub` 等）は統合ファイルに**同名で残す**ため不変。
- `ionicons` はそのまま（Ionic 内蔵アイコン含む。`docs/ionic-builtin-icons.md` 参照）。
- `IconButton`（`Custom/`）と既存デモ・ストーリーは **ionicons を使用**しており Material Symbols は参照していないため、Material 撤去の**影響を受けない**（Material を使っていたのは廃止対象の `Ds*` と Foundation の Material `Icons` ストーリーのみ）。

## 6. テスト方針
- `token-registry` を統合トークンへ更新し、対応してテスト更新（重複なし・各エントリの構造）。
- `token-overrides` テストは流用（ロジック不変）。
- Storybook を視覚検証の主軸に。4ゲート（build / test / lint / build-storybook）合格を確認。

## 7. スコープ外（YAGNI）
- 実カラーの確定（仮値継続）。
- ionicons → Material Symbols 移行（別途・見送り）。
- 実機アプリ側の色編集UI（Storybook 限定）。

## 8. 段階分け（計画で詳細化）
1. トークン統合（`tokens.css`＋`design-tokens.css`→1ファイル、import 付替、`--app-*` 重複排除）＋ registry 更新。
2. ブリッジ拡張（グローバル `--ion-*`＋`--ion-font-family`＋部品パターン用クラス）。
3. Material Symbols 撤去（`material-symbols` 依存・`ds-icons.css`・Material `Icons` ストーリー・該当 import）。
4. Ds* コンポーネント＋ Ds* 依存ストーリーの削除（Foundation 系は残す）。
5. 既存 Ionic サンプル stories への色パターン追記（Button 等、対応する部品のみ。新規ファイルなし）。
6. 各段階で4ゲート（build / test / lint / build-storybook）確認。
