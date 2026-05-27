# Ionic 内蔵アイコンを使うコンポーネント一覧

> **目的**: アイコンを Google Material Symbols に統一（ionicons 全廃）するにあたり、
> **Ionic コンポーネントが内部で自動描画するアイコン**は今回の置換対象外であることを明確にするための一覧。
> これらは Ionic 部品の一部として ionicons から描画されるため、`<span class="material-symbols-outlined">` には置き換えません（置換すると部品が壊れる／不要）。
>
> 環境: Ionic 8（`@ionic/vue` / `@ionic/core`）。既定 glyph は `mode`（iOS/MD）で異なる場合があります。

---

## 1. 前提

- 今回の Material Symbols 移行で置き換えるのは「**私たちが明示的に `<ion-icon>` で置いたアイコン**」だけです。
- 下表の「内蔵アイコン」は Ionic コンポーネントが内部で描画するもので、**そのまま ionicons を使い続けます**。
- そのため `ionicons` パッケージは `@ionic/vue` の依存として残ります（直接 import は全廃しますが、アンインストールはしません）。
- 多くは**差し替え用プロパティ**を持つので、将来どうしても Material 化したい場合はそのプロパティに Material の SVG を渡すことで個別対応は可能です（今回はやりません）。

---

## 2. 一覧（本プロジェクトで使用中の部品）

| コンポーネント | 内蔵アイコン（用途） | 既定 glyph (ionicons) | 差し替えプロパティ | 本 repo の主な使用箇所 |
|---|---|---|---|---|
| `ion-back-button` | 戻る矢印 | `arrow-back-sharp`(MD) / `chevron-back`(iOS) | `icon` | `DemoLayout`、各ページ/デモのヘッダ、ListPage/DetailPage、SettingsPage、LoginPage、tabs/Tab1-3 |
| `ion-item`（`detail` 有効時） | 行末の詳細矢印 | `chevron-forward` | `detail-icon`（または `:detail="false"`） | HomePage、ComponentsListPage、PagesListPage、ListPage、ListDemo |
| `ion-select` | 開閉シェブロン | `chevron-expand`(MD) / `caret-down-sharp` | `toggle-icon` | SelectDemo |
| `ion-searchbar` | 検索アイコン＋クリア(×)＋キャンセル | `search-outline` / `close-circle` / `close-sharp` | `search-icon` / `clear-icon` / `cancel-button-icon` | SearchbarDemo、tabs/Tab2 |
| `ion-input`（`clear-input` 有効時）/ `ion-textarea` | クリア(×)ボタン | `close-circle` | （公開プロパティなし＝内蔵固定） | InputDemo（「クリア可」） |
| `ion-accordion` / `ion-accordion-group` | 開閉シェブロン | `chevron-down` | `toggle-icon` / `expanded-icon` | AccordionDemo |
| `ion-toggle`（`enableOnOffLabels` 有効時のみ） | ON/OFF ラベルの ✓ / × | `checkmark-outline` / `close-outline` | （なし。ラベル有効時のみ表示） | Toggle Playground（任意で有効化可） |

### 描画系（ionicons ではなく SVG/CSS で描かれるマーク）
以下は「ionicons の glyph」ではなく Ionic が内部で SVG/CSS 描画する印のため、ionicons の概念にも該当せず、当然 Material 化対象外です（参考までに記載）。

| コンポーネント | 印 |
|---|---|
| `ion-checkbox` | チェックマーク（SVG 描画） |
| `ion-radio` | 選択ドット（CSS 描画） |
| `ion-spinner` | スピナー（SVG シェイプ） |
| `ion-progress-bar` | バー（CSS） |

---

## 3. 参考：本 repo では未使用だが内蔵アイコンを持つ主な Ionic 部品

将来これらを使う場合も、内蔵アイコンは ionicons のまま動きます。

| コンポーネント | 内蔵アイコン | 差し替えプロパティ |
|---|---|---|
| `ion-refresher` / `ion-refresher-content` | 引っ張り更新の矢印/スピナー | `pulling-icon` / `refreshing-spinner` |
| `ion-reorder` | 並べ替えハンドル（`reorder-three`） | `ion-reorder` のスロット |
| `ion-breadcrumb` | 区切りシェブロン | `ion-breadcrumbs` の `itemsBeforeCollapse` 等 |
| `ion-datetime` | 月送り等のシェブロン | 一部プロパティ |
| `ion-toast` / `ion-modal` | 閉じる等 | `close-icon`（toast のボタン等） |
| `ion-menu-button` | ハンバーガー（`menu`） | `icon` |

---

## 4. まとめ

- **置換する**：私たちが置いた `<ion-icon :icon="...">`（→ `<span class="material-symbols-outlined">名前</span>`）。
- **置換しない（ionicons のまま）**：上記 第2章・第3章の各コンポーネントが内部描画するアイコン。
- 結果として、アプリ/Storybook 上に ionicons が完全にゼロになるわけではなく、「**自前のアイコンは Material Symbols、Ionic 部品の内蔵アイコンは ionicons**」という状態になります。これは Ionic を使う限り避けられず、実用上の問題はありません。

---

**作成日**: 2026-05-27
