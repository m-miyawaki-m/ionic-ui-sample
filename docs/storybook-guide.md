# Storybook 利用ガイド

このプロジェクト（Ionic + Vue 3）での Storybook の使い方をまとめたドキュメントです。

- **Part 1** … Storybook そのものの基礎概念（一般知識）
- **Part 2** … この repo で実際に採用している規約（現状）

> 環境: Storybook 10.4 / `@storybook/vue3-vite` / Vue 3 / Ionic 8

---

## 起動方法

```bash
npm run storybook        # 開発サーバ起動（http://localhost:6006）
npm run build-storybook  # 静的サイトとしてビルド
```

---

# Part 1 — Storybook の基礎（一般知識）

## 1. Storybook とは / 何のために使うか

Storybook は、UI コンポーネントを**アプリ本体から切り離して単独で開発・確認する**ためのツールです。主な用途は次の4つ。

| 用途 | 説明 |
|---|---|
| **コンポーネント駆動開発** | 1コンポーネントを画面遷移やAPIなしで単独表示し、作りながら確認する |
| **状態カタログ** | 「無効化」「エラー」「ローディング」など各状態を一覧して見せる |
| **動的な動作確認** | プロパティ（props）の値を画面上で切り替え、見た目の変化を即座に確認する |
| **ドキュメント** | プロパティ仕様や使用例を自動生成し、デザイナー/レビュアと共有する |

**実アプリのビジネスロジック検証が主目的ではない**点に注意。ロジックは vitest 等のテストやアプリ側で確認する領域で、Storybook は「見た目・状態・プロパティ」の確認が中心です。

## 2. CSF の基本構造 — meta と Story

Storybook のストーリーは **CSF（Component Story Format）** という形式で書きます。1ファイルにつき:

- **default export = `meta`** … そのコンポーネント共通の設定（タイトル・argTypes・既定の args）
- **named export = Story** … 1つ1つの表示パターン

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonButton } from '@ionic/vue';

// default export = meta（このファイル全体の設定）
const meta: Meta = {
  title: 'Components/Button',   // サイドバーでの表示パス
};
export default meta;

type Story = StoryObj;

// named export = 1つのストーリー
export const Primary: Story = {
  args: { color: 'primary' },
};
```

`title: 'Components/Button'` の `/` がサイドバーの階層になります。

## 3. args と Controls — プロパティを動的に渡す中心の仕組み

`args` は**コンポーネントに渡すプロパティ値**です。Storybook の最も中心的な仕組みで、`args` を定義すると **Controls パネル**（画面下部）で値を GUI で切り替えられるようになります。

```ts
export const Primary: Story = {
  args: {
    color: 'primary',
    disabled: false,
    expand: 'block',
  },
};
```

これだけで Controls に `color` / `disabled` / `expand` の入力欄が現れ、値を変えると表示が即座に更新されます。**「プロパティを渡して動的に確認する」= この args + Controls のこと**です。

> ⚠️ args は **args → コンポーネント の一方向**です。Controls で値を変えれば反映されますが、画面側でコンポーネントを操作（入力・トグル）しても Controls の値は自動では戻りません。双方向にしたい場合は Part 1-7 を参照。

## 4. argTypes — control の種類と表示の制御

`argTypes` は各プロパティの「Controls での編集方法」と「ドキュメント表示」を細かく指定するものです。

```ts
const meta: Meta = {
  argTypes: {
    color: {
      control: 'select',                       // 編集UIの種類
      options: ['primary', 'success', 'danger'], // select の選択肢
      description: 'テーマカラー',               // 説明（ドキュメントに表示）
      table: {
        type: { summary: "'primary' | 'success' | 'danger'" }, // 型表示
        defaultValue: { summary: 'primary' },                  // 既定値表示
      },
    },
  },
};
```

主な `control` の種類:

| control | 用途 |
|---|---|
| `'text'` | 文字列 |
| `'boolean'` | true/false トグル |
| `'number'` | 数値 |
| `'select'` / `'radio'` | `options` から選択 |
| `'color'` | カラーピッカー |

`table.type` / `table.defaultValue` は動作には影響せず、**自動ドキュメント（autodocs）の表に出る表示**を整えるためのものです。

## 5. render 関数 — Vue 3 でのコンポーネント定義

単純に args を渡すだけなら `args` の定義だけで足りますが、**複数要素で囲む / テンプレートを組む**場合は `render` 関数を使います。Vue 3 では「コンポーネントオブジェクトを返す関数」を書きます。

```ts
export const Playground: Story = {
  render: (args) => ({
    components: { IonButton },          // 使うコンポーネントを登録
    setup: () => ({ args }),            // template から args を参照可能に
    template: '<ion-button v-bind="args">ボタン</ion-button>',
  }),
};
```

- `components` … テンプレート内で使う Vue コンポーネント
- `setup` … `return` したものが template から参照できる（`args` を渡すのが定番）
- `template` … 実際に描画する HTML。`v-bind="args"` で args を一括でプロパティに展開

## 6. autodocs — 自動ドキュメント生成

`meta`（または preview 全体）に `tags: ['autodocs']` を付けると、argTypes と Story から **Docs ページが自動生成**されます。プロパティ一覧表・各 Story のプレビューがまとまり、仕様書代わりになります。

このプロジェクトでは `.storybook/preview.ts` で全体に `tags: ['autodocs']` を設定済みなので、**個々のストーリーで指定する必要はありません**。

## 7. 一歩進んだ話（概念紹介）

このプロジェクトの規約（Part 2）では使っていませんが、知っておくと役立つ機能。

### args の一方向性と v-model 連携

args は一方向なので、入力系コンポーネントで「触って動くデモ」を作りたい場合はローカル state を使います。

```ts
import { ref } from 'vue';

export const Interactive: Story = {
  render: (args) => ({
    components: { IonInput, IonItem },
    setup() {
      const text = ref('');
      return { args, text };
    },
    template: `
      <ion-item><ion-input v-model="text" v-bind="args" /></ion-item>
      <p>入力値: {{ text }}</p>`,
  }),
};
```

Controls パネルと完全に双方向同期させたい場合は `useArgs`（`storybook/preview-api`）でイベントを拾って `updateArgs` する方法もあります。

### play 関数（インタラクションテスト）

`play` 関数を書くと、ストーリー表示後に「クリック」「入力」などの操作を自動実行し、結果を検証できます（`storybook/test` の `userEvent` / `expect` を使用）。自動 UI テストの領域です。

---

# Part 2 — この repo の規約（現状）

## 1. ファイル配置

ストーリーは **`src/stories/` 配下**に `<コンポーネント名>.stories.ts` という名前で置きます。

```
src/stories/
  Button.stories.ts
  Input.stories.ts
  Select.stories.ts
  ...
```

`.storybook/main.ts` の `stories` 設定で `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)` を読み込んでいます。

## 2. 基本は「Playground + Showcase」の2本立て

このプロジェクトでは、各コンポーネントにつき **2つのストーリー**を用意するのを基本とします。役割が違います。

| ストーリー | 役割 | Controls | 書き方 |
|---|---|---|---|
| **`Playground`** | プロパティを1つずつ動かして挙動を試す | ◎ 使う（主役） | `v-bind="args"` で args 駆動 |
| **`Showcase`** | 代表的な使用例を固定で複数並べて見せる | × 使わない | 値を直書きして複数パターンを列挙 |

### Playground（args 駆動）

`setup: () => ({ args })` で args を渡し、`v-bind="args"` で展開します。Controls で各プロパティを操作できます。

```ts
export const Playground: Story = {
  render: (args) => ({
    components: { IonSelect, IonSelectOption, IonItem, IonList },
    setup: () => ({ args }),
    template: `
      <ion-list>
        <ion-item>
          <ion-select v-bind="args">
            <ion-select-option value="apple">りんご</ion-select-option>
            <ion-select-option value="orange">みかん</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>`,
  }),
};
```

### Showcase（代表例の固定列挙）

args は使わず、プロパティを直書きして「実際の使われ方」を複数並べます。`<div style="padding:16px; max-width:480px;">` で囲んで見やすくするのが慣習です。

```ts
export const Showcase: Story = {
  render: () => ({
    components: { IonSelect, IonSelectOption, IonItem, IonList },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item>
            <ion-select label="果物" placeholder="選択">
              <ion-select-option value="apple">りんご</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-select label="複数選択" :multiple="true" placeholder="選択">
              <ion-select-option value="a">A</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>`,
  }),
};
```

## 3. argTypes の書き方（日本語）

`meta.argTypes` で各プロパティを記述します。このプロジェクトの記述スタイルは次の通り（`Input.stories.ts` などより）:

- `control` と、必要なら `options` を指定
- `description` は**日本語**で書く
- `table.type.summary` に型（複数候補は `'a' | 'b'` 形式）、`table.defaultValue.summary` に既定値を書く

```ts
const meta: Meta = {
  title: 'Components/Input',
  argTypes: {
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'fixed', 'floating', 'stacked'],
      description: 'ラベルの配置',
      table: {
        type: { summary: "'start' | 'end' | 'fixed' | 'floating' | 'stacked'" },
        defaultValue: { summary: 'start' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
  args: { label: '名前', labelPlacement: 'floating' },  // Playground の初期値
};
```

`meta.args` に書いた値が **Playground の初期表示値**になります。

## 4. Ionic 特有の注意点

- **入力系は `IonItem` / `IonList` で囲む** … `IonInput` / `IonSelect` / `IonToggle` などは Item の中に置くのが Ionic の作法。Story でもそれに合わせます。
- **イベント名が独自** … Ionic は標準の `input`/`change` ではなく `ionInput` / `ionChange` を発火します。`v-model` も内部的にこれらを使うため、イベントを直接拾う場合は `@ionInput` 等を指定します。
- **選択肢は子要素** … `IonSelect` の選択肢は `IonSelectOption`、という具合に子コンポーネントが必要なものは `components` に登録し忘れないこと。

## 5. .storybook 設定の現状

### `.storybook/main.ts`

- `stories`: `../src/**/*.mdx` と `../src/**/*.stories.*`
- `addons`: `@chromatic-com/storybook` / `addon-a11y`（アクセシビリティ検査）/ `addon-docs` / `addon-onboarding`
- `framework`: `@storybook/vue3-vite`
- `viteFinal`: `@vitejs/plugin-legacy` を除去（古いブラウザ向け変換が BigInt リテラルで esbuild を壊すため）

### `.storybook/preview.ts`

- `setup` で `IonicVue` を登録し、Ionic のコア CSS とプロジェクトのデザイントークン CSS（`design-tokens.css`〔土台パレット＋部品トークン〕 / `ionic-bridge.css`）、Noto Sans JP フォントを読み込み（旧 `tokens.css`・`ds-icons.css` は統合・撤去済み）
- `tags: ['autodocs']` を全体に設定（→ 各ストーリーでの autodocs 指定は不要）
- `controls.matchers` で `background`/`color` 系をカラーピッカー、`Date` 系を日付入力に自動割り当て
- **テーマ切替ツールバー**（`globalTypes.theme`）… ツールバーから `light` / `dark` / `practice` を選ぶと、`decorators` が `<html data-theme="...">` を切り替える。デザイントークンの確認に使う

---

## まとめ — 新しいコンポーネントの Story を足すとき

1. `src/stories/<Name>.stories.ts` を作成
2. `meta` に `title: 'Components/<Name>'` と `argTypes`（日本語 description + table）を記述
3. `meta.args` に Playground の初期値を設定
4. `Playground`（`v-bind="args"`）と `Showcase`（代表例の固定列挙）の2ストーリーを export
5. 入力系なら `IonItem`/`IonList` で囲む
6. `npm run storybook` で表示を確認
