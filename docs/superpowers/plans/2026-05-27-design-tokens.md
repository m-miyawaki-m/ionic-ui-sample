# Design Tokens Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a design-token layer (`--<category>-<element>-<state>` tokens, 3 themes) plus custom DS components and a Storybook Token Editor (runtime color override + reset-to-default) into the existing ionic-ui-sample, without touching the existing Ionic samples.

**Architecture:** New tokens in `src/theme/design-tokens.css` using `[data-theme="..."]` attribute selectors (nestable, so Colors can show 3 modes side-by-side). Custom components in `src/components/ds/` reference ONLY the new tokens. A `token-registry.ts` lists all tokens (single source for the Colors story and Token Editor). `token-overrides.ts` applies per-theme inline overrides on `documentElement` (reset = `removeProperty`). Stories live under a `Design System/` Storybook tree. The existing `useTheme` + Storybook theme toolbar drive `data-theme` for both old and new tokens.

**Tech Stack:** Vue 3, Storybook 10 (@storybook/vue3-vite), Vitest, `@fontsource/noto-sans-jp`, `material-symbols`.

**Spec:** `docs/superpowers/specs/2026-05-27-design-tokens-design.md`

---

## Conventions & shared types (read first)

- Editable token "kind": `'color' | 'size' | 'raw'` (color = swatch/`input[type=color]`; size = px/number; raw = gradient/rgba/shadow shown read-only or as text).
- `ThemeName` (already exists in `src/composables/useTheme.ts`) = `'light' | 'dark' | 'practice'`.
- Storybook story type imports come from `'@storybook/vue3-vite'` (lint rule). Use plain `Meta`/`StoryObj` for stories that wrap DS components; DS components are plain Vue so `Meta<typeof DsButton>` also works — prefer the typed generic for DS components.
- Material Symbols: rendered via `<span class="material-symbols-outlined">icon_name</span>`; the `material-symbols/outlined.css` import defines the font + class. A global rule sets `font-variation-settings: 'wght' 200`.

## File structure (created/modified)

```
src/theme/design-tokens.css        新規: 全トークン×3モード（[data-theme] 属性セレクタ・仮パレット）
src/theme/token-registry.ts        新規: 全トークンの正準リスト（Colors/Editor 駆動）
src/theme/token-overrides.ts       新規: テーマ別ランタイム上書き＋リセット（localStorage）
src/theme/ds-icons.css             新規: material-symbols 読み込み＋weight200
src/main.ts                        変更: フォント/Material/design-tokens 読み込み
.storybook/preview.ts              変更: 同上 import ＋ applyOverrides デコレータ
src/components/ds/DsButton.vue 等  新規: 各DSコンポーネント
src/stories/ds/*.stories.ts        新規: Design System ストーリー
src/tests/token-registry.spec.ts   新規
src/tests/token-overrides.spec.ts  新規
package.json                       変更: 依存追加
```

---

# Phase 1 — Tokens, assets, Foundation

## Task 1: Install fonts & icon font

**Files:** Modify `package.json`, `package-lock.json`

- [ ] **Step 1: Install**

```powershell
npm install @fontsource/noto-sans-jp material-symbols
```
Expected: both added to dependencies.

- [ ] **Step 2: Verify resolution**

```powershell
node -e "require.resolve('@fontsource/noto-sans-jp/index.css'); require.resolve('material-symbols/outlined.css'); console.log('ok')"
```
Expected: prints `ok`.

- [ ] **Step 3: Commit**

```powershell
git add package.json package-lock.json
git commit -m "chore: add Noto Sans JP and Material Symbols fonts"
```

---

## Task 2: design-tokens.css (all tokens, 3 themes, placeholder palette)

**Files:** Create `src/theme/design-tokens.css`

- [ ] **Step 1: Create `src/theme/design-tokens.css`**

```css
/* =====================================================================
   デザインシステム トークン — 色を変えたいときはこのファイルを編集します。
   3モードは [data-theme] 属性セレクタで定義（入れ子のテーマ表示が可能）。
   :root と light は同値（data-theme 未設定でも light で表示）。
   ===================================================================== */

:root,
[data-theme="light"] {
  /* 背景 */
  --bg-base: #ffffff;
  --bg-pattern: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);
  /* メニュー: 1=通常 2=ホバー 3=選択 4=無効/区切り */
  --menu-color-1: #f4f6f9;
  --menu-color-2: #e7ecf3;
  --menu-color-3: #d8e3f3;
  --menu-color-4: #c3ccd8;
  --menu-badge: #dc2626;
  --menu-open: #e0e7f1;
  /* テキスト */
  --text-body: #1f2937;
  --text-heading: #111827;
  --text-input-filled: #1f2937;
  --text-form-guide: #6b7280;
  /* 表 */
  --table-header-bg: #f1f5f9;
  --table-cell-bg-1: #ffffff;
  --table-cell-bg-2: #f8fafc;
  --table-border: #d8dee6;
  --table-border-width: 1px;
  /* プルダウン */
  --dropdown-bg: #ffffff;
  --dropdown-bg-selected: #e8f0fe;
  /* ダイアログ */
  --dialog-list-item-bg: #ffffff;
  --dialog-list-item-bg-selected: #e8f0fe;
  --dialog-list-item-bg-unselected: #f8fafc;
  --dialog-overlay: rgba(0, 0, 0, 0.3);
  /* ステッパー: 1=完了 2=現在 3=未完了 4=エラー */
  --stepper-color-1: #16a34a;
  --stepper-color-2: #2563eb;
  --stepper-color-3: #cbd5e1;
  --stepper-color-4: #dc2626;
  /* リンク */
  --link-primary: #2563eb;
  --link-sub: #475569;
  --link-visited: #7c3aed;
  /* ボタン Primary① (主要確定) */
  --btn-primary1-bg-active: #2563eb;
  --btn-primary1-text-active: #ffffff;
  --btn-primary1-bg-disabled: #b9c5da;
  --btn-primary1-text-disabled: #eef2f8;
  /* ボタン Primary② (次へ/遷移) */
  --btn-primary2-bg-active: #0f766e;
  --btn-primary2-text-active: #ffffff;
  --btn-primary2-bg-disabled: #b4cdca;
  --btn-primary2-text-disabled: #eef5f4;
  /* ボタン Secondary (アウトライン) */
  --btn-secondary-border-active: #2563eb;
  --btn-secondary-text-active: #2563eb;
  --btn-secondary-bg-active: transparent;
  --btn-secondary-border-disabled: #c3ccd8;
  --btn-secondary-text-disabled: #9aa4b2;
  --btn-secondary-bg-disabled: transparent;
  --btn-secondary-border-width: 1px;
  --btn-secondary-icon-gap: 8px;
  /* アラート */
  --alert-ng: #dc2626;
  --alert-warning: #d97706;
  --alert-ok: #16a34a;
  /* スクロールバー */
  --scrollbar-track: #eef2f7;
  --scrollbar-thumb: #c3ccd8;
  --scrollbar-thumb-hover: #a8b3c2;
  /* タイポグラフィ */
  --font-family-base: 'Noto Sans JP', system-ui, sans-serif;
  --font-size-title: 23px;
  --font-size-heading: 20px;
  --font-size-body: 16px;
  --font-size-caption: 14px;
  --line-height-title: 1.4;
  --line-height-heading: 1.5;
  --line-height-body: 1.6;
  --line-height-caption: 1.5;
  /* 追加（コンポーネント実装に必要な最小限） */
  --radius-sm: 4px;
  --radius-md: 8px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.16);
  --focus-ring-color: #2563eb;
  --focus-ring-width: 2px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --transition-base: 160ms;
}

[data-theme="dark"] {
  --bg-base: #0f1419;
  --bg-pattern: linear-gradient(135deg, #141b22 0%, #0d1217 100%);
  --menu-color-1: #1a222c;
  --menu-color-2: #232d3a;
  --menu-color-3: #2d3b4e;
  --menu-color-4: #3a4656;
  --menu-badge: #f87171;
  --menu-open: #243040;
  --text-body: #e5e9f0;
  --text-heading: #f3f6fb;
  --text-input-filled: #e5e9f0;
  --text-form-guide: #9aa4b2;
  --table-header-bg: #1c2630;
  --table-cell-bg-1: #11171e;
  --table-cell-bg-2: #161d26;
  --table-border: #2d3b4e;
  --table-border-width: 1px;
  --dropdown-bg: #1a222c;
  --dropdown-bg-selected: #2a3a52;
  --dialog-list-item-bg: #1a222c;
  --dialog-list-item-bg-selected: #2a3a52;
  --dialog-list-item-bg-unselected: #161d26;
  --dialog-overlay: rgba(0, 0, 0, 0.5);
  --stepper-color-1: #4ade80;
  --stepper-color-2: #60a5fa;
  --stepper-color-3: #475569;
  --stepper-color-4: #f87171;
  --link-primary: #60a5fa;
  --link-sub: #94a3b8;
  --link-visited: #c4b5fd;
  --btn-primary1-bg-active: #3b82f6;
  --btn-primary1-text-active: #ffffff;
  --btn-primary1-bg-disabled: #2a3645;
  --btn-primary1-text-disabled: #6b7888;
  --btn-primary2-bg-active: #14b8a6;
  --btn-primary2-text-active: #04201d;
  --btn-primary2-bg-disabled: #23423e;
  --btn-primary2-text-disabled: #6b8c88;
  --btn-secondary-border-active: #60a5fa;
  --btn-secondary-text-active: #60a5fa;
  --btn-secondary-bg-active: transparent;
  --btn-secondary-border-disabled: #3a4656;
  --btn-secondary-text-disabled: #6b7888;
  --btn-secondary-bg-disabled: transparent;
  --btn-secondary-border-width: 1px;
  --btn-secondary-icon-gap: 8px;
  --alert-ng: #f87171;
  --alert-warning: #fbbf24;
  --alert-ok: #4ade80;
  --scrollbar-track: #161d26;
  --scrollbar-thumb: #3a4656;
  --scrollbar-thumb-hover: #4a586a;
  --font-family-base: 'Noto Sans JP', system-ui, sans-serif;
  --font-size-title: 23px;
  --font-size-heading: 20px;
  --font-size-body: 16px;
  --font-size-caption: 14px;
  --line-height-title: 1.4;
  --line-height-heading: 1.5;
  --line-height-body: 1.6;
  --line-height-caption: 1.5;
  --radius-sm: 4px;
  --radius-md: 8px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
  --focus-ring-color: #60a5fa;
  --focus-ring-width: 2px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --transition-base: 160ms;
}

[data-theme="practice"] {
  --bg-base: #fffaf0;
  --bg-pattern: linear-gradient(135deg, #fff6e6 0%, #ffeccc 100%);
  --menu-color-1: #fff3da;
  --menu-color-2: #ffe8bf;
  --menu-color-3: #ffd9a0;
  --menu-color-4: #e8c99a;
  --menu-badge: #c2410c;
  --menu-open: #ffe2b3;
  --text-body: #3a2f1b;
  --text-heading: #2a2010;
  --text-input-filled: #3a2f1b;
  --text-form-guide: #8a7a5c;
  --table-header-bg: #ffeccc;
  --table-cell-bg-1: #fffaf0;
  --table-cell-bg-2: #fff4e0;
  --table-border: #e0c79a;
  --table-border-width: 1px;
  --dropdown-bg: #fffaf0;
  --dropdown-bg-selected: #ffe2b3;
  --dialog-list-item-bg: #fffaf0;
  --dialog-list-item-bg-selected: #ffe2b3;
  --dialog-list-item-bg-unselected: #fff4e0;
  --dialog-overlay: rgba(60, 40, 10, 0.3);
  --stepper-color-1: #15803d;
  --stepper-color-2: #c2410c;
  --stepper-color-3: #d8c39a;
  --stepper-color-4: #b91c1c;
  --link-primary: #c2410c;
  --link-sub: #8a6d3b;
  --link-visited: #9333ea;
  --btn-primary1-bg-active: #c2410c;
  --btn-primary1-text-active: #ffffff;
  --btn-primary1-bg-disabled: #e6c7a8;
  --btn-primary1-text-disabled: #fff4e8;
  --btn-primary2-bg-active: #b45309;
  --btn-primary2-text-active: #ffffff;
  --btn-primary2-bg-disabled: #e6d2a8;
  --btn-primary2-text-disabled: #fff7e8;
  --btn-secondary-border-active: #c2410c;
  --btn-secondary-text-active: #c2410c;
  --btn-secondary-bg-active: transparent;
  --btn-secondary-border-disabled: #d8c39a;
  --btn-secondary-text-disabled: #b09a72;
  --btn-secondary-bg-disabled: transparent;
  --btn-secondary-border-width: 1px;
  --btn-secondary-icon-gap: 8px;
  --alert-ng: #b91c1c;
  --alert-warning: #b45309;
  --alert-ok: #15803d;
  --scrollbar-track: #ffeccc;
  --scrollbar-thumb: #e0c79a;
  --scrollbar-thumb-hover: #d0b487;
  --font-family-base: 'Noto Sans JP', system-ui, sans-serif;
  --font-size-title: 23px;
  --font-size-heading: 20px;
  --font-size-body: 16px;
  --font-size-caption: 14px;
  --line-height-title: 1.4;
  --line-height-heading: 1.5;
  --line-height-body: 1.6;
  --line-height-caption: 1.5;
  --radius-sm: 4px;
  --radius-md: 8px;
  --shadow-sm: 0 1px 2px rgba(120, 80, 20, 0.12);
  --shadow-md: 0 4px 16px rgba(120, 80, 20, 0.2);
  --focus-ring-color: #c2410c;
  --focus-ring-width: 2px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --transition-base: 160ms;
}
```

- [ ] **Step 2: Commit**

```powershell
git add src/theme/design-tokens.css
git commit -m "feat: add design-system token palette for 3 themes"
```

---

## Task 3: token-registry.ts (TDD)

**Files:** Create `src/theme/token-registry.ts`, Test `src/tests/token-registry.spec.ts`

- [ ] **Step 1: Write failing test `src/tests/token-registry.spec.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { tokenRegistry, colorTokens, type TokenEntry } from '../theme/token-registry';

describe('token-registry', () => {
  it('トークン名は一意', () => {
    const names = tokenRegistry.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('全エントリが name/label/category/kind を持つ', () => {
    for (const t of tokenRegistry) {
      expect(t.name.startsWith('--')).toBe(true);
      expect(t.label.length).toBeGreaterThan(0);
      expect(t.category.length).toBeGreaterThan(0);
      expect(['color', 'size', 'raw']).toContain(t.kind);
    }
  });

  it('colorTokens は kind=color のみ', () => {
    expect(colorTokens.every((t: TokenEntry) => t.kind === 'color')).toBe(true);
    expect(colorTokens.length).toBeGreaterThan(20);
  });
});
```

- [ ] **Step 2: Run test, expect FAIL**

```powershell
npm test
```
Expected: FAIL (module not found).

- [ ] **Step 3: Create `src/theme/token-registry.ts`**

```ts
export type TokenKind = 'color' | 'size' | 'raw';

export interface TokenEntry {
  name: string;        // CSS変数名（-- 始まり）
  label: string;       // 表示名
  category: string;    // グループ
  kind: TokenKind;     // color=色, size=寸法, raw=その他(gradient/rgba/shadow)
}

export const tokenRegistry: TokenEntry[] = [
  // Background
  { name: '--bg-base', label: '背景（基本）', category: 'Background', kind: 'color' },
  { name: '--bg-pattern', label: '背景（パターン）', category: 'Background', kind: 'raw' },
  // Menu
  { name: '--menu-color-1', label: 'メニュー 通常', category: 'Menu', kind: 'color' },
  { name: '--menu-color-2', label: 'メニュー ホバー', category: 'Menu', kind: 'color' },
  { name: '--menu-color-3', label: 'メニュー 選択', category: 'Menu', kind: 'color' },
  { name: '--menu-color-4', label: 'メニュー 無効/区切り', category: 'Menu', kind: 'color' },
  { name: '--menu-badge', label: 'メニュー バッジ', category: 'Menu', kind: 'color' },
  { name: '--menu-open', label: 'メニュー 展開', category: 'Menu', kind: 'color' },
  // Text
  { name: '--text-body', label: '本文', category: 'Text', kind: 'color' },
  { name: '--text-heading', label: '見出し', category: 'Text', kind: 'color' },
  { name: '--text-input-filled', label: '入力済み', category: 'Text', kind: 'color' },
  { name: '--text-form-guide', label: 'フォーム案内', category: 'Text', kind: 'color' },
  // Table
  { name: '--table-header-bg', label: '見出し行 背景', category: 'Table', kind: 'color' },
  { name: '--table-cell-bg-1', label: 'セル背景 ①', category: 'Table', kind: 'color' },
  { name: '--table-cell-bg-2', label: 'セル背景 ②', category: 'Table', kind: 'color' },
  { name: '--table-border', label: '罫線色', category: 'Table', kind: 'color' },
  { name: '--table-border-width', label: '罫線太さ', category: 'Table', kind: 'size' },
  // Dropdown
  { name: '--dropdown-bg', label: 'プルダウン 背景', category: 'Dropdown', kind: 'color' },
  { name: '--dropdown-bg-selected', label: 'プルダウン 選択', category: 'Dropdown', kind: 'color' },
  // Dialog
  { name: '--dialog-list-item-bg', label: '項目 背景', category: 'Dialog', kind: 'color' },
  { name: '--dialog-list-item-bg-selected', label: '項目 選択', category: 'Dialog', kind: 'color' },
  { name: '--dialog-list-item-bg-unselected', label: '項目 未選択', category: 'Dialog', kind: 'color' },
  { name: '--dialog-overlay', label: 'オーバーレイ', category: 'Dialog', kind: 'raw' },
  // Stepper
  { name: '--stepper-color-1', label: 'ステップ 完了', category: 'Stepper', kind: 'color' },
  { name: '--stepper-color-2', label: 'ステップ 現在', category: 'Stepper', kind: 'color' },
  { name: '--stepper-color-3', label: 'ステップ 未完了', category: 'Stepper', kind: 'color' },
  { name: '--stepper-color-4', label: 'ステップ エラー', category: 'Stepper', kind: 'color' },
  // Link
  { name: '--link-primary', label: 'リンク 基本', category: 'Link', kind: 'color' },
  { name: '--link-sub', label: 'リンク サブ', category: 'Link', kind: 'color' },
  { name: '--link-visited', label: 'リンク 既読', category: 'Link', kind: 'color' },
  // Button Primary 1
  { name: '--btn-primary1-bg-active', label: 'P① 活性 背景', category: 'Button/Primary1', kind: 'color' },
  { name: '--btn-primary1-text-active', label: 'P① 活性 文字', category: 'Button/Primary1', kind: 'color' },
  { name: '--btn-primary1-bg-disabled', label: 'P① 非活性 背景', category: 'Button/Primary1', kind: 'color' },
  { name: '--btn-primary1-text-disabled', label: 'P① 非活性 文字', category: 'Button/Primary1', kind: 'color' },
  // Button Primary 2
  { name: '--btn-primary2-bg-active', label: 'P② 活性 背景', category: 'Button/Primary2', kind: 'color' },
  { name: '--btn-primary2-text-active', label: 'P② 活性 文字', category: 'Button/Primary2', kind: 'color' },
  { name: '--btn-primary2-bg-disabled', label: 'P② 非活性 背景', category: 'Button/Primary2', kind: 'color' },
  { name: '--btn-primary2-text-disabled', label: 'P② 非活性 文字', category: 'Button/Primary2', kind: 'color' },
  // Button Secondary
  { name: '--btn-secondary-border-active', label: 'Sec 活性 枠線', category: 'Button/Secondary', kind: 'color' },
  { name: '--btn-secondary-text-active', label: 'Sec 活性 文字', category: 'Button/Secondary', kind: 'color' },
  { name: '--btn-secondary-bg-active', label: 'Sec 活性 背景', category: 'Button/Secondary', kind: 'raw' },
  { name: '--btn-secondary-border-disabled', label: 'Sec 非活性 枠線', category: 'Button/Secondary', kind: 'color' },
  { name: '--btn-secondary-text-disabled', label: 'Sec 非活性 文字', category: 'Button/Secondary', kind: 'color' },
  { name: '--btn-secondary-bg-disabled', label: 'Sec 非活性 背景', category: 'Button/Secondary', kind: 'raw' },
  { name: '--btn-secondary-border-width', label: 'Sec 枠線太さ', category: 'Button/Secondary', kind: 'size' },
  { name: '--btn-secondary-icon-gap', label: 'Sec アイコン間隔', category: 'Button/Secondary', kind: 'size' },
  // Alert
  { name: '--alert-ng', label: 'NG/エラー', category: 'Alert', kind: 'color' },
  { name: '--alert-warning', label: '警告', category: 'Alert', kind: 'color' },
  { name: '--alert-ok', label: 'OK/成功', category: 'Alert', kind: 'color' },
  // Scrollbar
  { name: '--scrollbar-track', label: 'トラック', category: 'Scrollbar', kind: 'color' },
  { name: '--scrollbar-thumb', label: 'サム', category: 'Scrollbar', kind: 'color' },
  { name: '--scrollbar-thumb-hover', label: 'サム（ホバー）', category: 'Scrollbar', kind: 'color' },
];

export const colorTokens: TokenEntry[] = tokenRegistry.filter((t) => t.kind === 'color');

/** カテゴリ順を保ったままグループ化 */
export function groupByCategory(entries: TokenEntry[] = tokenRegistry): Record<string, TokenEntry[]> {
  const out: Record<string, TokenEntry[]> = {};
  for (const e of entries) (out[e.category] ??= []).push(e);
  return out;
}
```

- [ ] **Step 4: Run test, expect PASS**

```powershell
npm test
```
Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/theme/token-registry.ts src/tests/token-registry.spec.ts
git commit -m "feat: add design-token registry with tests"
```

---

## Task 4: Icon CSS + wire assets into app and Storybook

**Files:** Create `src/theme/ds-icons.css`; Modify `src/main.ts`, `.storybook/preview.ts`

- [ ] **Step 1: Create `src/theme/ds-icons.css`**

```css
@import 'material-symbols/outlined.css';

/* weight 200・currentColor 連動（fill は塗りつぶし切替: 0=アウトライン） */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
  user-select: none;
}
```

- [ ] **Step 2: Edit `src/main.ts` — add imports AFTER the existing theme imports (`./theme/ionic-bridge.css`)**

Add these import lines (keep all existing imports):
```ts
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/700.css';
import './theme/design-tokens.css';
import './theme/ds-icons.css';
```

- [ ] **Step 3: Edit `.storybook/preview.ts` — add imports after the existing `../src/theme/ionic-bridge.css` import**

```ts
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/700.css';
import '../src/theme/design-tokens.css';
import '../src/theme/ds-icons.css';
```

- [ ] **Step 4: Verify build + storybook build**

```powershell
npm run build
npm run build-storybook
```
Expected: both succeed.

- [ ] **Step 5: Commit**

```powershell
git add src/theme/ds-icons.css src/main.ts .storybook/preview.ts
git commit -m "feat: load fonts, material symbols and design tokens"
```

---

## Task 5: Foundation/Colors story (3 modes side-by-side)

**Files:** Create `src/stories/ds/Colors.stories.ts`

- [ ] **Step 1: Create `src/stories/ds/Colors.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { groupByCategory } from '../../theme/token-registry';

const meta: Meta = { title: 'Design System/Foundation/Colors' };
export default meta;
type Story = StoryObj;

const THEMES = ['light', 'dark', 'practice'] as const;

/** 全カラートークンを 3モード横並びで表示 */
export const AllTokens: Story = {
  render: () => ({
    setup: () => ({ groups: groupByCategory(), themes: THEMES }),
    template: `
      <div style="font-family: var(--font-family-base); padding:16px;">
        <div v-for="(entries, cat) in groups" :key="cat" style="margin-bottom:24px;">
          <h3 style="margin:0 0 8px; font-size:14px; color:#888;">{{ cat }}</h3>
          <div v-for="t in entries" :key="t.name"
               style="display:grid; grid-template-columns: 220px repeat(3, 1fr); gap:8px; align-items:center; margin-bottom:6px;">
            <code style="font-size:12px;">{{ t.name }}</code>
            <div v-for="theme in themes" :key="theme" :data-theme="theme"
                 style="border:1px solid #ccc; border-radius:6px; padding:6px; background: var(--bg-base);">
              <div :style="{ height:'28px', borderRadius:'4px', border:'1px solid rgba(128,128,128,0.3)', background: 'var(' + t.name + ')' }"></div>
              <div style="font-size:10px; color: var(--text-form-guide); margin-top:2px; text-transform:capitalize;">{{ theme }}</div>
            </div>
          </div>
        </div>
      </div>`,
  }),
};
```

- [ ] **Step 2: Verify storybook build**

```powershell
npm run build-storybook
```
Expected: success; `Colors.stories` compiled.

- [ ] **Step 3: Commit**

```powershell
git add src/stories/ds/Colors.stories.ts
git commit -m "feat: add Foundation/Colors story (3 themes side by side)"
```

---

## Task 6: Foundation/Typography story

**Files:** Create `src/stories/ds/Typography.stories.ts`

- [ ] **Step 1: Create `src/stories/ds/Typography.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = { title: 'Design System/Foundation/Typography' };
export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => ({
    template: `
      <div style="font-family: var(--font-family-base); color: var(--text-body); background: var(--bg-base); padding:24px;">
        <p style="font-size: var(--font-size-title); line-height: var(--line-height-title); color: var(--text-heading); font-weight:700; margin:0 0 16px;">タイトル 23px / 1.4 — あいうえお Aa</p>
        <p style="font-size: var(--font-size-heading); line-height: var(--line-height-heading); color: var(--text-heading); font-weight:700; margin:0 0 16px;">見出し 20px / 1.5 — あいうえお Aa</p>
        <p style="font-size: var(--font-size-body); line-height: var(--line-height-body); margin:0 0 16px;">本文 16px / 1.6 — あいうえおかきくけこ The quick brown fox.</p>
        <p style="font-size: var(--font-size-caption); line-height: var(--line-height-caption); color: var(--text-form-guide); margin:0;">キャプション 14px / 1.5 — 補足テキスト</p>
      </div>`,
  }),
};
```

- [ ] **Step 2: Verify + commit**

```powershell
npm run build-storybook
git add src/stories/ds/Typography.stories.ts
git commit -m "feat: add Foundation/Typography story"
```

---

## Task 7: Foundation/Icons story (Material Symbols)

**Files:** Create `src/stories/ds/Icons.stories.ts`

- [ ] **Step 1: Create `src/stories/ds/Icons.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = { title: 'Design System/Foundation/Icons' };
export default meta;
type Story = StoryObj;

const ICONS = [
  'home', 'settings', 'search', 'person', 'favorite', 'star',
  'delete', 'edit', 'check_circle', 'warning', 'info', 'add',
  'close', 'menu', 'arrow_forward', 'download', 'share', 'visibility',
];

export const Gallery: Story = {
  render: () => ({
    setup: () => ({ icons: ICONS }),
    template: `
      <div style="font-family: var(--font-family-base); color: var(--text-body); background: var(--bg-base); padding:24px;">
        <p style="color: var(--text-form-guide); font-size:14px;">Material Symbols Outlined（weight 200, fill: currentColor）</p>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(96px,1fr)); gap:16px;">
          <div v-for="name in icons" :key="name" style="text-align:center;">
            <span class="material-symbols-outlined" style="font-size:32px;">{{ name }}</span>
            <div style="font-size:11px; color: var(--text-form-guide); margin-top:4px;">{{ name }}</div>
          </div>
        </div>
      </div>`,
  }),
};
```

- [ ] **Step 2: Verify + commit**

```powershell
npm run build-storybook
git add src/stories/ds/Icons.stories.ts
git commit -m "feat: add Foundation/Icons story (Material Symbols)"
```

---

# Phase 2 — Token overrides + editor

## Task 8: token-overrides.ts (TDD)

**Files:** Create `src/theme/token-overrides.ts`, Test `src/tests/token-overrides.spec.ts`

- [ ] **Step 1: Write failing test `src/tests/token-overrides.spec.ts`**

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import {
  getOverrides, setOverride, resetToken, resetAll, applyOverrides,
} from '../theme/token-overrides';

const root = () => document.documentElement;

describe('token-overrides', () => {
  beforeEach(() => {
    localStorage.clear();
    root().removeAttribute('style');
  });

  it('setOverride はインラインCSS変数を設定し保存する', () => {
    setOverride('dark', '--btn-primary1-bg-active', '#ff0000');
    expect(root().style.getPropertyValue('--btn-primary1-bg-active')).toBe('#ff0000');
    expect(getOverrides('dark')['--btn-primary1-bg-active']).toBe('#ff0000');
  });

  it('resetToken はインライン値と保存を削除する', () => {
    setOverride('dark', '--bg-base', '#000000');
    resetToken('dark', '--bg-base');
    expect(root().style.getPropertyValue('--bg-base')).toBe('');
    expect(getOverrides('dark')['--bg-base']).toBeUndefined();
  });

  it('resetAll は当該テーマの上書きを全消去する', () => {
    setOverride('light', '--bg-base', '#111111');
    setOverride('light', '--text-body', '#222222');
    resetAll('light');
    expect(getOverrides('light')).toEqual({});
    expect(root().style.getPropertyValue('--bg-base')).toBe('');
  });

  it('applyOverrides はテーマ切替時に当該テーマの上書きだけを適用する', () => {
    setOverride('light', '--bg-base', '#aaaaaa');
    setOverride('dark', '--bg-base', '#bbbbbb');
    applyOverrides('dark');
    expect(root().style.getPropertyValue('--bg-base')).toBe('#bbbbbb');
    applyOverrides('light');
    expect(root().style.getPropertyValue('--bg-base')).toBe('#aaaaaa');
  });
});
```

- [ ] **Step 2: Run test, expect FAIL**

```powershell
npm test
```
Expected: FAIL (module not found).

- [ ] **Step 3: Create `src/theme/token-overrides.ts`**

```ts
import { tokenRegistry } from './token-registry';

export type ThemeName = 'light' | 'dark' | 'practice';
type OverrideMap = Record<string, string>;

const KEY_PREFIX = 'ds-token-overrides:';
const ALL_TOKEN_NAMES = tokenRegistry.map((t) => t.name);

function load(theme: ThemeName): OverrideMap {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + theme);
    return raw ? (JSON.parse(raw) as OverrideMap) : {};
  } catch {
    return {};
  }
}

function save(theme: ThemeName, map: OverrideMap): void {
  try {
    localStorage.setItem(KEY_PREFIX + theme, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function getOverrides(theme: ThemeName): OverrideMap {
  return load(theme);
}

/** 既知トークンのインライン値を全クリア（テーマ切替前のリセット用） */
function clearInline(): void {
  const style = document.documentElement.style;
  for (const name of ALL_TOKEN_NAMES) style.removeProperty(name);
}

export function setOverride(theme: ThemeName, token: string, value: string): void {
  const map = load(theme);
  map[token] = value;
  save(theme, map);
  document.documentElement.style.setProperty(token, value);
}

export function resetToken(theme: ThemeName, token: string): void {
  const map = load(theme);
  delete map[token];
  save(theme, map);
  document.documentElement.style.removeProperty(token);
}

export function resetAll(theme: ThemeName): void {
  save(theme, {});
  clearInline();
}

/** data-theme 切替後に呼ぶ: 既知トークンを一旦クリア→当該テーマの保存分を再適用 */
export function applyOverrides(theme: ThemeName): void {
  clearInline();
  const map = load(theme);
  const style = document.documentElement.style;
  for (const [token, value] of Object.entries(map)) style.setProperty(token, value);
}
```

- [ ] **Step 4: Run test, expect PASS**

```powershell
npm test
```
Expected: PASS (4 new tests).

- [ ] **Step 5: Commit**

```powershell
git add src/theme/token-overrides.ts src/tests/token-overrides.spec.ts
git commit -m "feat: add per-theme runtime token overrides with tests"
```

---

## Task 9: preview decorator applies overrides on theme change

**Files:** Modify `.storybook/preview.ts`

- [ ] **Step 1: Edit `.storybook/preview.ts` decorator**

Add the import near the top:
```ts
import { applyOverrides, type ThemeName } from '../src/theme/token-overrides';
```
Then in the existing decorator that sets `data-theme`, after setting the attribute, apply overrides. The decorator becomes:
```ts
  decorators: [
    (story, context) => {
      const theme = context.globals.theme as ThemeName;
      document.documentElement.setAttribute('data-theme', theme);
      applyOverrides(theme);
      return { components: { story }, template: '<story />' };
    },
  ],
```

- [ ] **Step 2: Verify storybook build**

```powershell
npm run build-storybook
```
Expected: success.

- [ ] **Step 3: Commit**

```powershell
git add .storybook/preview.ts
git commit -m "feat: apply token overrides on Storybook theme change"
```

---

## Task 10: Token Editor story

**Files:** Create `src/stories/ds/TokenEditor.stories.ts`

- [ ] **Step 1: Create `src/stories/ds/TokenEditor.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { tokenRegistry } from '../../theme/token-registry';
import { getOverrides, setOverride, resetToken, resetAll, type ThemeName } from '../../theme/token-overrides';

const meta: Meta = { title: 'Design System/Foundation/Token Editor' };
export default meta;
type Story = StoryObj;

export const Editor: Story = {
  render: (_args, { globals }) => ({
    setup() {
      const theme = (globals.theme ?? 'light') as ThemeName;
      const tokens = tokenRegistry;
      const overrides = ref<Record<string, string>>({ ...getOverrides(theme) });

      function currentValue(name: string): string {
        if (overrides.value[name]) return overrides.value[name];
        const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        return v || '#000000';
      }
      function onInput(name: string, value: string) {
        setOverride(theme, name, value);
        overrides.value = { ...getOverrides(theme) };
      }
      function reset(name: string) {
        resetToken(theme, name);
        overrides.value = { ...getOverrides(theme) };
      }
      function resetEverything() {
        resetAll(theme);
        overrides.value = {};
      }
      return { theme, tokens, overrides, currentValue, onInput, reset, resetEverything };
    },
    template: `
      <div style="font-family: var(--font-family-base); color: var(--text-body); background: var(--bg-base); padding:16px;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
          <strong>編集中テーマ: {{ theme }}</strong>
          <button @click="resetEverything"
            style="padding:6px 12px; border-radius:6px; border:1px solid var(--table-border); background: var(--menu-color-1); color: var(--text-body); cursor:pointer;">
            すべてデフォルトに戻す
          </button>
          <span style="font-size:12px; color: var(--text-form-guide);">※ ツールバーのテーマを切り替えると編集対象も切り替わります</span>
        </div>
        <div v-for="t in tokens" :key="t.name"
             style="display:grid; grid-template-columns: 240px 1fr 120px 80px; gap:8px; align-items:center; margin-bottom:6px;">
          <code style="font-size:12px;">{{ t.name }}</code>
          <span style="font-size:12px; color: var(--text-form-guide);">{{ t.label }}</span>
          <template v-if="t.kind === 'color'">
            <input type="color" :value="currentValue(t.name)" @input="onInput(t.name, $event.target.value)"
                   style="width:100%; height:28px; border:1px solid var(--table-border); border-radius:4px;" />
          </template>
          <template v-else>
            <input type="text" :value="overrides[t.name] ?? ''" :placeholder="t.kind"
                   @change="onInput(t.name, $event.target.value)"
                   style="width:100%; height:28px; border:1px solid var(--table-border); border-radius:4px; background: var(--dropdown-bg); color: var(--text-body);" />
          </template>
          <button @click="reset(t.name)"
                  style="padding:4px 8px; border-radius:6px; border:1px solid var(--table-border); background:transparent; color: var(--link-primary); cursor:pointer; font-size:12px;">
            ↺ 既定
          </button>
        </div>
      </div>`,
  }),
};
```

> Note: `input[type=color]` requires a 7-char hex; if a token default is not hex (e.g. rgba/gradient — those are `kind: 'raw'/'size'` so they use the text input branch instead). Color tokens in the registry all resolve to hex defaults.

- [ ] **Step 2: Verify storybook build**

```powershell
npm run build-storybook
```
Expected: success; `TokenEditor.stories` compiled.

- [ ] **Step 3: Commit**

```powershell
git add src/stories/ds/TokenEditor.stories.ts
git commit -m "feat: add Token Editor story (runtime override + reset)"
```

---

# Phase 3 — Components

> Each DS component is a plain Vue SFC under `src/components/ds/`, styled only with tokens. Each story imports it and uses Controls.

## Task 11: DsButton + story

**Files:** Create `src/components/ds/DsButton.vue`, `src/stories/ds/Button.stories.ts`

- [ ] **Step 1: Create `src/components/ds/DsButton.vue`**

```vue
<template>
  <button class="ds-btn" :class="`ds-btn--${variant}`" :disabled="disabled" type="button">
    <span v-if="icon" class="material-symbols-outlined ds-btn__icon">{{ icon }}</span>
    <slot>ボタン</slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary1' | 'primary2' | 'secondary';
  disabled?: boolean;
  icon?: string;
}>(), { variant: 'primary1', disabled: false });
</script>

<style scoped>
.ds-btn {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-4);
  cursor: pointer;
  transition: background var(--transition-base), color var(--transition-base);
  display: inline-flex;
  align-items: center;
  gap: var(--btn-secondary-icon-gap);
}
.ds-btn:disabled { cursor: not-allowed; }
.ds-btn:focus-visible { outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: 2px; }
.ds-btn__icon { font-size: 18px; }
.ds-btn--primary1 { background: var(--btn-primary1-bg-active); color: var(--btn-primary1-text-active); }
.ds-btn--primary1:disabled { background: var(--btn-primary1-bg-disabled); color: var(--btn-primary1-text-disabled); }
.ds-btn--primary2 { background: var(--btn-primary2-bg-active); color: var(--btn-primary2-text-active); }
.ds-btn--primary2:disabled { background: var(--btn-primary2-bg-disabled); color: var(--btn-primary2-text-disabled); }
.ds-btn--secondary {
  background: var(--btn-secondary-bg-active);
  color: var(--btn-secondary-text-active);
  border: var(--btn-secondary-border-width) solid var(--btn-secondary-border-active);
}
.ds-btn--secondary:disabled {
  background: var(--btn-secondary-bg-disabled);
  color: var(--btn-secondary-text-disabled);
  border-color: var(--btn-secondary-border-disabled);
}
</style>
```

- [ ] **Step 2: Create `src/stories/ds/Button.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsButton from '../../components/ds/DsButton.vue';

const meta: Meta<typeof DsButton> = {
  title: 'Design System/Components/Button',
  component: DsButton,
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary1', 'primary2', 'secondary'], description: 'バリエーション' },
    disabled: { control: 'boolean', description: '非活性' },
    icon: { control: 'text', description: 'Material Symbols 名（任意）' },
  },
  args: { variant: 'primary1', disabled: false, icon: '' },
};
export default meta;
type Story = StoryObj<typeof DsButton>;

export const Playground: Story = {
  render: (args) => ({
    components: { DsButton },
    setup: () => ({ args }),
    template: '<ds-button v-bind="args">ボタン</ds-button>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { DsButton },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; padding:16px; background: var(--bg-base);">
        <div style="display:flex; gap:12px; align-items:center;">
          <ds-button variant="primary1">Primary① 活性</ds-button>
          <ds-button variant="primary1" :disabled="true">Primary① 非活性</ds-button>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <ds-button variant="primary2">Primary② 活性</ds-button>
          <ds-button variant="primary2" :disabled="true">Primary② 非活性</ds-button>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <ds-button variant="secondary" icon="settings">Secondary 活性</ds-button>
          <ds-button variant="secondary" icon="settings" :disabled="true">Secondary 非活性</ds-button>
        </div>
      </div>`,
  }),
};
```

- [ ] **Step 3: Verify + commit**

```powershell
npm run build && npm run build-storybook
git add src/components/ds/DsButton.vue src/stories/ds/Button.stories.ts
git commit -m "feat: add DsButton (primary1/2, secondary) with stories"
```

---

## Task 12: DsTable + story

**Files:** Create `src/components/ds/DsTable.vue`, `src/stories/ds/Table.stories.ts`

- [ ] **Step 1: Create `src/components/ds/DsTable.vue`**

```vue
<template>
  <table class="ds-table">
    <thead>
      <tr><th v-for="h in headers" :key="h">{{ h }}</th></tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="i">
        <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{ headers: string[]; rows: (string | number)[][] }>();
</script>

<style scoped>
.ds-table {
  border-collapse: collapse;
  width: 100%;
  font-family: var(--font-family-base);
  font-size: var(--font-size-body);
  color: var(--text-body);
}
.ds-table th, .ds-table td {
  border: var(--table-border-width) solid var(--table-border);
  padding: var(--spacing-2) var(--spacing-3);
  text-align: left;
}
.ds-table th { background: var(--table-header-bg); color: var(--text-heading); font-weight: 700; }
.ds-table tbody tr:nth-child(odd) td { background: var(--table-cell-bg-1); }
.ds-table tbody tr:nth-child(even) td { background: var(--table-cell-bg-2); }
</style>
```

- [ ] **Step 2: Create `src/stories/ds/Table.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsTable from '../../components/ds/DsTable.vue';

const meta: Meta<typeof DsTable> = {
  title: 'Design System/Components/Table',
  component: DsTable,
};
export default meta;
type Story = StoryObj<typeof DsTable>;

export const Default: Story = {
  render: () => ({
    components: { DsTable },
    setup: () => ({
      headers: ['ID', '名前', 'ステータス'],
      rows: [
        [1, '田中', '有効'],
        [2, '鈴木', '無効'],
        [3, '佐藤', '有効'],
        [4, '高橋', '保留'],
      ],
    }),
    template: '<div style="padding:16px; background: var(--bg-base);"><ds-table :headers="headers" :rows="rows" /></div>',
  }),
};
```

- [ ] **Step 3: Verify + commit**

```powershell
npm run build && npm run build-storybook
git add src/components/ds/DsTable.vue src/stories/ds/Table.stories.ts
git commit -m "feat: add DsTable with story"
```

---

## Task 13: DsDropdown + story

**Files:** Create `src/components/ds/DsDropdown.vue`, `src/stories/ds/Dropdown.stories.ts`

- [ ] **Step 1: Create `src/components/ds/DsDropdown.vue`**

```vue
<template>
  <ul class="ds-dropdown" role="listbox">
    <li v-for="opt in options" :key="opt"
        class="ds-dropdown__item" :class="{ 'is-selected': opt === modelValue }"
        role="option" :aria-selected="opt === modelValue"
        @click="$emit('update:modelValue', opt)">
      {{ opt }}
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ options: string[]; modelValue?: string }>();
defineEmits<{ (e: 'update:modelValue', v: string): void }>();
</script>

<style scoped>
.ds-dropdown {
  list-style: none; margin: 0; padding: var(--spacing-1);
  background: var(--dropdown-bg);
  border: 1px solid var(--table-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  font-family: var(--font-family-base); font-size: var(--font-size-body);
  color: var(--text-body); width: 220px;
}
.ds-dropdown__item { padding: var(--spacing-2) var(--spacing-3); border-radius: var(--radius-sm); cursor: pointer; }
.ds-dropdown__item:hover { background: var(--menu-color-2); }
.ds-dropdown__item.is-selected { background: var(--dropdown-bg-selected); }
</style>
```

- [ ] **Step 2: Create `src/stories/ds/Dropdown.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import DsDropdown from '../../components/ds/DsDropdown.vue';

const meta: Meta<typeof DsDropdown> = {
  title: 'Design System/Components/Dropdown',
  component: DsDropdown,
};
export default meta;
type Story = StoryObj<typeof DsDropdown>;

export const Default: Story = {
  render: () => ({
    components: { DsDropdown },
    setup: () => ({ options: ['りんご', 'みかん', 'ぶどう', 'もも'], selected: ref('みかん') }),
    template: '<div style="padding:16px; background: var(--bg-base);"><ds-dropdown :options="options" v-model="selected" /></div>',
  }),
};
```

- [ ] **Step 3: Verify + commit**

```powershell
npm run build && npm run build-storybook
git add src/components/ds/DsDropdown.vue src/stories/ds/Dropdown.stories.ts
git commit -m "feat: add DsDropdown with story"
```

---

## Task 14: DsDialog + story

**Files:** Create `src/components/ds/DsDialog.vue`, `src/stories/ds/Dialog.stories.ts`

- [ ] **Step 1: Create `src/components/ds/DsDialog.vue`**

```vue
<template>
  <div class="ds-dialog-overlay">
    <div class="ds-dialog" role="dialog">
      <h2 class="ds-dialog__title">{{ title }}</h2>
      <ul class="ds-dialog__list">
        <li v-for="item in items" :key="item"
            class="ds-dialog__item" :class="{ 'is-selected': item === selected }"
            @click="$emit('select', item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; items: string[]; selected?: string }>();
defineEmits<{ (e: 'select', v: string): void }>();
</script>

<style scoped>
.ds-dialog-overlay {
  position: relative; display: grid; place-items: center;
  min-height: 320px; padding: 24px;
  background: var(--dialog-overlay);
}
.ds-dialog {
  background: var(--bg-base); color: var(--text-body);
  font-family: var(--font-family-base);
  border-radius: var(--radius-md); box-shadow: var(--shadow-md);
  padding: var(--spacing-4); width: 320px;
}
.ds-dialog__title { font-size: var(--font-size-heading); color: var(--text-heading); margin: 0 0 var(--spacing-3); }
.ds-dialog__list { list-style: none; margin: 0; padding: 0; }
.ds-dialog__item { padding: var(--spacing-2) var(--spacing-3); border-radius: var(--radius-sm); cursor: pointer; background: var(--dialog-list-item-bg-unselected); margin-bottom: var(--spacing-1); }
.ds-dialog__item.is-selected { background: var(--dialog-list-item-bg-selected); }
</style>
```

- [ ] **Step 2: Create `src/stories/ds/Dialog.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import DsDialog from '../../components/ds/DsDialog.vue';

const meta: Meta<typeof DsDialog> = {
  title: 'Design System/Components/Dialog',
  component: DsDialog,
};
export default meta;
type Story = StoryObj<typeof DsDialog>;

export const Default: Story = {
  render: () => ({
    components: { DsDialog },
    setup: () => {
      const selected = ref('項目B');
      return { selected, items: ['項目A', '項目B', '項目C', '項目D'] };
    },
    template: '<ds-dialog title="項目を選択" :items="items" :selected="selected" @select="(v) => selected = v" />',
  }),
};
```

- [ ] **Step 3: Verify + commit**

```powershell
npm run build && npm run build-storybook
git add src/components/ds/DsDialog.vue src/stories/ds/Dialog.stories.ts
git commit -m "feat: add DsDialog with story"
```

---

## Task 15: DsStepper + story

**Files:** Create `src/components/ds/DsStepper.vue`, `src/stories/ds/Stepper.stories.ts`

- [ ] **Step 1: Create `src/components/ds/DsStepper.vue`**

```vue
<template>
  <ol class="ds-stepper">
    <li v-for="(step, i) in steps" :key="i" class="ds-stepper__step" :class="`is-${step.state}`">
      <span class="ds-stepper__dot">{{ i + 1 }}</span>
      <span class="ds-stepper__label">{{ step.label }}</span>
    </li>
  </ol>
</template>

<script setup lang="ts">
export type StepState = 'done' | 'current' | 'todo' | 'error';
defineProps<{ steps: { label: string; state: StepState }[] }>();
</script>

<style scoped>
.ds-stepper { list-style: none; display: flex; gap: var(--spacing-4); margin: 0; padding: 0; font-family: var(--font-family-base); }
.ds-stepper__step { display: flex; align-items: center; gap: var(--spacing-2); color: var(--text-body); font-size: var(--font-size-body); }
.ds-stepper__dot {
  width: 28px; height: 28px; border-radius: 50%;
  display: grid; place-items: center; color: #fff; font-size: 14px;
}
.is-done .ds-stepper__dot { background: var(--stepper-color-1); }
.is-current .ds-stepper__dot { background: var(--stepper-color-2); }
.is-todo .ds-stepper__dot { background: var(--stepper-color-3); color: var(--text-body); }
.is-error .ds-stepper__dot { background: var(--stepper-color-4); }
</style>
```

- [ ] **Step 2: Create `src/stories/ds/Stepper.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsStepper from '../../components/ds/DsStepper.vue';

const meta: Meta<typeof DsStepper> = {
  title: 'Design System/Components/Stepper',
  component: DsStepper,
};
export default meta;
type Story = StoryObj<typeof DsStepper>;

export const Default: Story = {
  render: () => ({
    components: { DsStepper },
    setup: () => ({
      steps: [
        { label: '完了', state: 'done' },
        { label: '現在', state: 'current' },
        { label: '未完了', state: 'todo' },
        { label: 'エラー', state: 'error' },
      ],
    }),
    template: '<div style="padding:24px; background: var(--bg-base);"><ds-stepper :steps="steps" /></div>',
  }),
};
```

- [ ] **Step 3: Verify + commit**

```powershell
npm run build && npm run build-storybook
git add src/components/ds/DsStepper.vue src/stories/ds/Stepper.stories.ts
git commit -m "feat: add DsStepper with story"
```

---

## Task 16: DsAlert + story

**Files:** Create `src/components/ds/DsAlert.vue`, `src/stories/ds/Alert.stories.ts`

- [ ] **Step 1: Create `src/components/ds/DsAlert.vue`**

```vue
<template>
  <div class="ds-alert" :class="`ds-alert--${type}`" role="alert">
    <span class="material-symbols-outlined ds-alert__icon">{{ icon }}</span>
    <span class="ds-alert__msg"><slot>メッセージ</slot></span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(defineProps<{ type?: 'ng' | 'warning' | 'ok' }>(), { type: 'ok' });
const icon = computed(() => ({ ng: 'error', warning: 'warning', ok: 'check_circle' }[props.type]));
</script>

<style scoped>
.ds-alert {
  display: inline-flex; align-items: center; gap: var(--spacing-2);
  font-family: var(--font-family-base); font-size: var(--font-size-body);
  padding: var(--spacing-2) var(--spacing-3); border-radius: var(--radius-sm);
  border: 1px solid currentColor;
}
.ds-alert__icon { font-size: 20px; }
.ds-alert--ng { color: var(--alert-ng); }
.ds-alert--warning { color: var(--alert-warning); }
.ds-alert--ok { color: var(--alert-ok); }
</style>
```

- [ ] **Step 2: Create `src/stories/ds/Alert.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsAlert from '../../components/ds/DsAlert.vue';

const meta: Meta<typeof DsAlert> = {
  title: 'Design System/Components/Alert',
  component: DsAlert,
  argTypes: {
    type: { control: 'inline-radio', options: ['ng', 'warning', 'ok'], description: '種類' },
  },
  args: { type: 'ok' },
};
export default meta;
type Story = StoryObj<typeof DsAlert>;

export const Playground: Story = {
  render: (args) => ({
    components: { DsAlert },
    setup: () => ({ args }),
    template: '<ds-alert v-bind="args">処理が完了しました</ds-alert>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { DsAlert },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start; padding:16px; background: var(--bg-base);">
        <ds-alert type="ng">エラーが発生しました</ds-alert>
        <ds-alert type="warning">警告：未保存の変更があります</ds-alert>
        <ds-alert type="ok">処理が完了しました</ds-alert>
      </div>`,
  }),
};
```

- [ ] **Step 3: Verify + commit**

```powershell
npm run build && npm run build-storybook
git add src/components/ds/DsAlert.vue src/stories/ds/Alert.stories.ts
git commit -m "feat: add DsAlert (ng/warning/ok) with stories"
```

---

## Task 17: DsLink + story

**Files:** Create `src/components/ds/DsLink.vue`, `src/stories/ds/Link.stories.ts`

- [ ] **Step 1: Create `src/components/ds/DsLink.vue`**

```vue
<template>
  <a class="ds-link" :class="`ds-link--${variant}`" :href="href"><slot>リンク</slot></a>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'primary' | 'sub' | 'visited'; href?: string }>(), {
  variant: 'primary', href: '#',
});
</script>

<style scoped>
.ds-link { font-family: var(--font-family-base); font-size: var(--font-size-body); text-decoration: underline; cursor: pointer; }
.ds-link--primary { color: var(--link-primary); }
.ds-link--sub { color: var(--link-sub); }
.ds-link--visited { color: var(--link-visited); }
.ds-link:focus-visible { outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: 2px; }
</style>
```

- [ ] **Step 2: Create `src/stories/ds/Link.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsLink from '../../components/ds/DsLink.vue';

const meta: Meta<typeof DsLink> = {
  title: 'Design System/Components/Link',
  component: DsLink,
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'sub', 'visited'], description: '種類' },
  },
  args: { variant: 'primary' },
};
export default meta;
type Story = StoryObj<typeof DsLink>;

export const Playground: Story = {
  render: (args) => ({
    components: { DsLink },
    setup: () => ({ args }),
    template: '<div style="padding:16px; background: var(--bg-base);"><ds-link v-bind="args">リンクテキスト</ds-link></div>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { DsLink },
    template: `
      <div style="display:flex; gap:16px; padding:16px; background: var(--bg-base);">
        <ds-link variant="primary">基本リンク</ds-link>
        <ds-link variant="sub">サブリンク</ds-link>
        <ds-link variant="visited">既読リンク</ds-link>
      </div>`,
  }),
};
```

- [ ] **Step 3: Verify + commit**

```powershell
npm run build && npm run build-storybook
git add src/components/ds/DsLink.vue src/stories/ds/Link.stories.ts
git commit -m "feat: add DsLink with stories"
```

---

# Phase 4 — Layout

## Task 18: DsMenu + story

**Files:** Create `src/components/ds/DsMenu.vue`, `src/stories/ds/Menu.stories.ts`

- [ ] **Step 1: Create `src/components/ds/DsMenu.vue`**

```vue
<template>
  <nav class="ds-menu">
    <button v-for="item in items" :key="item.label"
            class="ds-menu__item" :class="{ 'is-selected': item.label === selected, 'is-disabled': item.disabled }"
            :disabled="item.disabled"
            @click="$emit('select', item.label)">
      <span class="material-symbols-outlined" v-if="item.icon">{{ item.icon }}</span>
      <span class="ds-menu__label">{{ item.label }}</span>
      <span v-if="item.badge" class="ds-menu__badge">{{ item.badge }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
export interface MenuItem { label: string; icon?: string; badge?: number; disabled?: boolean }
defineProps<{ items: MenuItem[]; selected?: string }>();
defineEmits<{ (e: 'select', v: string): void }>();
</script>

<style scoped>
.ds-menu { display: flex; flex-direction: column; width: 220px; background: var(--menu-color-1); font-family: var(--font-family-base); border-radius: var(--radius-md); overflow: hidden; }
.ds-menu__item {
  display: flex; align-items: center; gap: var(--spacing-2);
  padding: var(--spacing-3); border: none; background: transparent;
  color: var(--text-body); font-size: var(--font-size-body); cursor: pointer; text-align: left;
  border-bottom: 1px solid var(--menu-color-4);
}
.ds-menu__item:hover:not(.is-disabled) { background: var(--menu-color-2); }
.ds-menu__item.is-selected { background: var(--menu-color-3); }
.ds-menu__item.is-disabled { color: var(--menu-color-4); cursor: not-allowed; }
.ds-menu__label { flex: 1; }
.ds-menu__badge { background: var(--menu-badge); color: #fff; border-radius: 10px; padding: 0 var(--spacing-2); font-size: var(--font-size-caption); }
</style>
```

- [ ] **Step 2: Create `src/stories/ds/Menu.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import DsMenu from '../../components/ds/DsMenu.vue';

const meta: Meta<typeof DsMenu> = {
  title: 'Design System/Layout/Menu',
  component: DsMenu,
};
export default meta;
type Story = StoryObj<typeof DsMenu>;

export const Default: Story = {
  render: () => ({
    components: { DsMenu },
    setup: () => ({
      selected: ref('ホーム'),
      items: [
        { label: 'ホーム', icon: 'home' },
        { label: '受信箱', icon: 'inbox', badge: 12 },
        { label: '設定', icon: 'settings' },
        { label: '無効項目', icon: 'block', disabled: true },
      ],
    }),
    template: '<div style="padding:16px; background: var(--bg-base);"><ds-menu :items="items" :selected="selected" @select="(v) => selected = v" /></div>',
  }),
};
```

- [ ] **Step 3: Verify + commit**

```powershell
npm run build && npm run build-storybook
git add src/components/ds/DsMenu.vue src/stories/ds/Menu.stories.ts
git commit -m "feat: add DsMenu with story"
```

---

## Task 19: DsScrollbar + story

**Files:** Create `src/components/ds/DsScrollbar.vue`, `src/stories/ds/Scrollbar.stories.ts`

- [ ] **Step 1: Create `src/components/ds/DsScrollbar.vue`**

```vue
<template>
  <div class="ds-scrollarea">
    <div class="ds-scrollarea__content"><slot /></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.ds-scrollarea {
  height: 200px; width: 280px; overflow: auto;
  border: 1px solid var(--table-border); border-radius: var(--radius-md);
  background: var(--bg-base); color: var(--text-body);
  font-family: var(--font-family-base); padding: var(--spacing-3);
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}
.ds-scrollarea::-webkit-scrollbar { width: 12px; height: 12px; }
.ds-scrollarea::-webkit-scrollbar-track { background: var(--scrollbar-track); }
.ds-scrollarea::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 6px; }
.ds-scrollarea::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }
.ds-scrollarea__content { width: 480px; }
</style>
```

- [ ] **Step 2: Create `src/stories/ds/Scrollbar.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsScrollbar from '../../components/ds/DsScrollbar.vue';

const meta: Meta<typeof DsScrollbar> = {
  title: 'Design System/Layout/Scrollbar',
  component: DsScrollbar,
};
export default meta;
type Story = StoryObj<typeof DsScrollbar>;

export const Default: Story = {
  render: () => ({
    components: { DsScrollbar },
    template: `
      <div style="padding:16px; background: var(--bg-base);">
        <ds-scrollbar>
          <p v-for="n in 12" :key="n">スクロール行 {{ n }} — 横にも縦にもスクロールできます。カスタムスクロールバーの色はトークンに追従します。</p>
        </ds-scrollbar>
      </div>`,
  }),
};
```

- [ ] **Step 3: Verify all gates + commit**

```powershell
npm run build && npm test && npm run lint && npm run build-storybook
git add src/components/ds/DsScrollbar.vue src/stories/ds/Scrollbar.stories.ts
git commit -m "feat: add DsScrollbar with story"
```

---

## Final verification (after all tasks)

```powershell
npm run build          # vue-tsc + vite, exit 0
npm test               # Vitest, all pass (existing 10 + token-registry 3 + token-overrides 4 = 17)
npm run lint           # ESLint, exit 0
npm run build-storybook # success; Design System tree present
```

---

## Self-Review (plan author)

**1. Spec coverage:**
- 方式A 並列共存（既存無改修）→ Task 2/4 (new files; main.ts/preview.ts import-only). ✓
- `[data-theme]` 属性セレクタ（3モード横並び）→ Task 2 + Task 5 Colors. ✓
- 全トークン定義（色＋タイポ＋追加最小限）→ Task 2. ✓
- token-registry 単一ソース → Task 3 (used by Colors Task 5 + Editor Task 10). ✓
- ランタイム上書き＋テーマ別＋リセット → Task 8 (token-overrides) + Task 9 (decorator) + Task 10 (editor). ✓
- Foundation: Colors/Typography/Icons → Task 5/6/7. ✓
- Components: Button/Table/Dropdown/Dialog/Stepper/Alert/Link → Task 11–17. ✓
- Layout: Menu/Scrollbar → Task 18/19. ✓
- フォント Noto Sans JP・Material Symbols Outlined weight200 currentColor → Task 1/4. ✓
- Storybook 別ツリー `Design System/*` → 全ストーリーの title. ✓
- 既存テーマ基盤再利用（新アドオン不要）→ Task 9 は既存デコレータ拡張のみ. ✓
- テスト（registry/overrides）→ Task 3/8. ✓

**2. Placeholder scan:** 色の「仮値」は意図的な実値（HEX）で記載済み、PLAN上の TODO/TBD は無し。各コード手順に完全コードあり。✓

**3. Type consistency:** `TokenEntry{name,label,category,kind}` (Task 3) は Task 5/10 で使用一致。`ThemeName` は token-overrides(Task 8) と preview(Task 9)・editor(Task 10) で一致。`applyOverrides/setOverride/resetToken/resetAll/getOverrides` のシグネチャは Task 8 定義と Task 9/10 使用が一致。DS components の props 名はストーリーの bind と一致。✓

**4. Scope:** 単一のデザインシステムレイヤー。4フェーズで段階実装可能。分割不要。✓
