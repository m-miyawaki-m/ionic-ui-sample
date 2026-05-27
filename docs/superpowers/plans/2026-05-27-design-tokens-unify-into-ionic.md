# Unify Design Tokens into Ionic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the design-token layer so a single token source flows into Ionic components (via one bridge + one editor), removing the custom `Ds*` components and Material Symbols, and demonstrating color patterns on existing Ionic sample stories.

**Architecture:** Merge `tokens.css` (`--app-*` base palette) and `design-tokens.css` (`--<part>-*`) into ONE file. `ionic-bridge.css` maps Ionic `--ion-*` (incl. `--ion-font-family`) from the base palette and provides component-pattern utility classes (`.btn-primary1` etc.) that set Ionic part variables from component tokens. The single Token Editor edits the unified token set; existing Ionic samples + the new Button color-pattern examples follow automatically. Icons stay ionicons (Material Symbols removed).

**Tech Stack:** Vue 3, Storybook 10 (@storybook/vue3-vite), Vitest, @fontsource/noto-sans-jp. (Removing: material-symbols.)

**Spec:** `docs/superpowers/specs/2026-05-27-design-tokens-unify-into-ionic-design.md`

---

## Current state (read before starting)

- `src/theme/tokens.css` — `--app-*` base palette, 3 themes under `:root, html[data-theme="..."]` (+ `html[data-theme="dark"|"practice"]`). Includes `--app-text-on-primary/success/warning/danger` and `*-rgb` companions.
- `src/theme/design-tokens.css` — `--<part>-*` component tokens + typography/extras, 3 themes under `:root, [data-theme="light"]` / `[data-theme="dark"]` / `[data-theme="practice"]`.
- `src/theme/ionic-bridge.css` — maps `--ion-*` ← `--app-*` (global).
- `src/theme/ds-icons.css` — Material Symbols (`@import 'material-symbols/outlined.css'`).
- `src/theme/token-registry.ts` — lists the `--<part>-*` tokens (52 entries). `colorTokens`, `groupByCategory`.
- `src/theme/token-overrides.ts` — per-theme overrides; `clearInline()` iterates `tokenRegistry` names.
- `src/components/ds/*.vue` — 9 custom components (DsButton, DsTable, DsDropdown, DsDialog, DsStepper, DsAlert, DsLink, DsMenu, DsScrollbar).
- `src/stories/ds/*.stories.ts` — Colors, Typography, Icons, TokenEditor (Foundation) + Button, Table, Dropdown, Dialog, Stepper, Alert, Link, Menu, Scrollbar (Ds*-based).
- `src/main.ts` / `.storybook/preview.ts` — import Ionic CSS, `@fontsource/noto-sans-jp/400.css`+`/700.css`, `tokens.css`, `ionic-bridge.css`, `design-tokens.css`, `ds-icons.css`.
- Existing Ionic sample stories: `src/stories/*.stories.ts` (Button, Input, Card, …). `src/stories/Button.stories.ts` is `Components/Button` (uses `IonButton`).

---

## Task 1: Consolidate tokens into a single `design-tokens.css`

**Files:**
- Modify: `src/theme/design-tokens.css` (add base palette)
- Delete: `src/theme/tokens.css`
- Modify: `src/main.ts`, `.storybook/preview.ts` (imports/order)

- [ ] **Step 1: Move the `--app-*` base palette into `design-tokens.css`**

`design-tokens.css` already has three theme blocks: `:root, [data-theme="light"]`, `[data-theme="dark"]`, `[data-theme="practice"]`. For EACH theme, copy that theme's `--app-*` declarations (all `--app-*` including the `*-rgb` companions) from `tokens.css` into the SAME-theme block in `design-tokens.css`, preserving the exact values. Add them under a clear comment header, e.g.:

```css
  /* === 土台パレット（--ion-* の駆動元 / tokens.css から統合） === */
  /* ...the --app-* lines copied verbatim from tokens.css for THIS theme... */
```

Map the source blocks by theme: `tokens.css` `:root, html[data-theme="light"]` → `design-tokens.css` `:root, [data-theme="light"]`; `html[data-theme="dark"]` → `[data-theme="dark"]`; `html[data-theme="practice"]` → `[data-theme="practice"]`. Do not change any values.

- [ ] **Step 2: Delete `tokens.css`**

```powershell
Remove-Item src\theme\tokens.css
```

- [ ] **Step 3: Fix imports in `src/main.ts`**

Remove the `import './theme/tokens.css';` line. Ensure the order is: `./theme/variables.css` → `./theme/design-tokens.css` → `./theme/ionic-bridge.css` (design-tokens BEFORE the bridge, since the bridge reads `--app-*`). Keep the `@fontsource/noto-sans-jp/*` and `./theme/ds-icons.css` imports as they are for now (ds-icons removed in Task 4). The theme-CSS import section should read:
```ts
import './theme/variables.css';
import './theme/design-tokens.css';
import './theme/ionic-bridge.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/700.css';
import './theme/ds-icons.css';
```

- [ ] **Step 4: Fix imports in `.storybook/preview.ts`**

Remove the `import '../src/theme/tokens.css';` line. Order: `../src/theme/design-tokens.css` BEFORE `../src/theme/ionic-bridge.css`. The theme-CSS import section should read:
```ts
import '../src/theme/design-tokens.css';
import '../src/theme/ionic-bridge.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/700.css';
import '../src/theme/ds-icons.css';
```

- [ ] **Step 5: Verify Ionic is still themed (no regression)**

```powershell
npm run build
npm run build-storybook
npm test
```
Expected: all succeed (the existing Ionic samples must still pick up `--ion-*` ← `--app-*`, now defined in `design-tokens.css`). 17 tests pass.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "refactor: merge tokens.css into single design-tokens.css source"
```

---

## Task 2: Extend `ionic-bridge.css` — font flow + button color-pattern classes

**Files:**
- Modify: `src/theme/ionic-bridge.css`

- [ ] **Step 1: Add Ionic font-family flow**

Inside the existing `:root { ... }` block in `ionic-bridge.css`, add:
```css
  /* フォントを Ionic に流し込む */
  --ion-font-family: var(--font-family-base);
```

- [ ] **Step 2: Add component-pattern utility classes (append at end of file)**

```css
/* =====================================================================
   部品パターン用クラス: Ionic 部品の CSS 変数をトークンから当てる。
   Ionic タグに class を付けて「部品の色パターン例」を表現する。
   ===================================================================== */

/* Button: Primary① / Primary② / Secondary（アウトライン） */
ion-button.btn-primary1 {
  --background: var(--btn-primary1-bg-active);
  --color: var(--btn-primary1-text-active);
  --background-activated: var(--btn-primary1-bg-active);
  --background-focused: var(--btn-primary1-bg-active);
}
ion-button.btn-primary1.button-disabled {
  --background: var(--btn-primary1-bg-disabled);
  --color: var(--btn-primary1-text-disabled);
}
ion-button.btn-primary2 {
  --background: var(--btn-primary2-bg-active);
  --color: var(--btn-primary2-text-active);
  --background-activated: var(--btn-primary2-bg-active);
  --background-focused: var(--btn-primary2-bg-active);
}
ion-button.btn-primary2.button-disabled {
  --background: var(--btn-primary2-bg-disabled);
  --color: var(--btn-primary2-text-disabled);
}
ion-button.btn-secondary {
  --background: var(--btn-secondary-bg-active);
  --color: var(--btn-secondary-text-active);
  --border-width: var(--btn-secondary-border-width);
  --border-style: solid;
  --border-color: var(--btn-secondary-border-active);
}
ion-button.btn-secondary.button-disabled {
  --background: var(--btn-secondary-bg-disabled);
  --color: var(--btn-secondary-text-disabled);
  --border-color: var(--btn-secondary-border-disabled);
}
```

> Note: Ionic adds the class `button-disabled` to a disabled `ion-button`, so the disabled patterns above target `.btn-primaryX.button-disabled`. `ion-button` exposes `--background`, `--color`, `--border-width/style/color` as CSS variables (use `fill="outline"` in markup for the secondary border to render).

- [ ] **Step 3: Verify**

```powershell
npm run build
npm run build-storybook
```
Expected: both succeed.

- [ ] **Step 4: Commit**

```powershell
git add src/theme/ionic-bridge.css
git commit -m "feat: flow font into Ionic and add button color-pattern classes"
```

---

## Task 3: Add base palette to the token registry (TDD)

**Files:**
- Modify: `src/theme/token-registry.ts`
- Modify: `src/tests/token-registry.spec.ts`

- [ ] **Step 1: Add a failing test**

Append this test inside the `describe('token-registry', ...)` block in `src/tests/token-registry.spec.ts`:
```ts
  it('土台パレット(--app-*)も編集対象として含む', () => {
    const names = tokenRegistry.map((t) => t.name);
    for (const n of ['--app-bg', '--app-text', '--app-border', '--app-primary', '--app-danger']) {
      expect(names).toContain(n);
    }
    const base = tokenRegistry.filter((t) => t.category === 'Base');
    expect(base.length).toBe(14);
    expect(base.every((t) => t.kind === 'color')).toBe(true);
  });
```

- [ ] **Step 2: Run test, expect FAIL**

```powershell
npm test
```
Expected: FAIL (no `Base` category entries yet).

- [ ] **Step 3: Add the base palette entries at the TOP of `tokenRegistry`**

In `src/theme/token-registry.ts`, insert these 14 entries as the FIRST items of the `tokenRegistry` array (before the `--bg-base` entry):
```ts
  // Base palette（--ion-* の駆動元）
  { name: '--app-bg', label: '基本背景', category: 'Base', kind: 'color' },
  { name: '--app-surface', label: '面（カード/リスト）', category: 'Base', kind: 'color' },
  { name: '--app-surface-2', label: '面（ヘッダ等）', category: 'Base', kind: 'color' },
  { name: '--app-text', label: '本文文字', category: 'Base', kind: 'color' },
  { name: '--app-text-muted', label: '補助文字', category: 'Base', kind: 'color' },
  { name: '--app-text-on-primary', label: '主色上の文字', category: 'Base', kind: 'color' },
  { name: '--app-text-on-success', label: '成功色上の文字', category: 'Base', kind: 'color' },
  { name: '--app-text-on-warning', label: '警告色上の文字', category: 'Base', kind: 'color' },
  { name: '--app-text-on-danger', label: '危険色上の文字', category: 'Base', kind: 'color' },
  { name: '--app-border', label: '罫線', category: 'Base', kind: 'color' },
  { name: '--app-primary', label: '主色', category: 'Base', kind: 'color' },
  { name: '--app-success', label: '成功', category: 'Base', kind: 'color' },
  { name: '--app-warning', label: '警告', category: 'Base', kind: 'color' },
  { name: '--app-danger', label: '危険', category: 'Base', kind: 'color' },
```

> Note: the `--app-*-rgb` companions are NOT added to the registry (they are derived values used by the bridge for translucency). Known limitation: editing e.g. `--app-primary` in the Token Editor does not update `--app-primary-rgb`; the base color changes everywhere except a few Ionic translucency calculations. Acceptable for this sample.

- [ ] **Step 4: Run tests, expect PASS**

```powershell
npm test
```
Expected: PASS (token-registry: 4 tests; token-overrides still 4; total 18).

- [ ] **Step 5: Commit**

```powershell
git add src/theme/token-registry.ts src/tests/token-registry.spec.ts
git commit -m "feat: include base palette tokens in the editable registry"
```

---

## Task 4: Remove Material Symbols

**Files:**
- Modify: `package.json`, `package-lock.json`
- Delete: `src/theme/ds-icons.css`, `src/stories/ds/Icons.stories.ts`
- Modify: `src/main.ts`, `.storybook/preview.ts`

- [ ] **Step 1: Uninstall the package**

```powershell
npm uninstall material-symbols
```

- [ ] **Step 2: Delete the Material CSS and the Material Icons story**

```powershell
Remove-Item src\theme\ds-icons.css
Remove-Item src\stories\ds\Icons.stories.ts
```

- [ ] **Step 3: Remove `ds-icons.css` imports**

In `src/main.ts` remove `import './theme/ds-icons.css';`.
In `.storybook/preview.ts` remove `import '../src/theme/ds-icons.css';`.
(Keep the `@fontsource/noto-sans-jp/*` imports — Noto Sans JP stays.)

- [ ] **Step 4: Verify no dangling Material references**

```powershell
npm run build
npm run build-storybook
```
Expected: both succeed. (The `Ds*` components still reference the `material-symbols-outlined` CSS class in templates — harmless strings; they are deleted in Task 5. No JS import of material-symbols exists.)

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "chore: remove Material Symbols (icons stay ionicons)"
```

---

## Task 5: Remove the custom `Ds*` components and their stories

**Files:**
- Delete: `src/components/ds/*.vue` (9 files)
- Delete: `src/stories/ds/{Button,Table,Dropdown,Dialog,Stepper,Alert,Link,Menu,Scrollbar}.stories.ts` (9 files)
- Keep: `src/stories/ds/{Colors,Typography,TokenEditor}.stories.ts`

- [ ] **Step 1: Delete the Ds* components**

```powershell
Remove-Item src\components\ds\DsButton.vue, src\components\ds\DsTable.vue, src\components\ds\DsDropdown.vue, src\components\ds\DsDialog.vue, src\components\ds\DsStepper.vue, src\components\ds\DsAlert.vue, src\components\ds\DsLink.vue, src\components\ds\DsMenu.vue, src\components\ds\DsScrollbar.vue
```

- [ ] **Step 2: Delete the Ds*-based stories**

```powershell
Remove-Item src\stories\ds\Button.stories.ts, src\stories\ds\Table.stories.ts, src\stories\ds\Dropdown.stories.ts, src\stories\ds\Dialog.stories.ts, src\stories\ds\Stepper.stories.ts, src\stories\ds\Alert.stories.ts, src\stories\ds\Link.stories.ts, src\stories\ds\Menu.stories.ts, src\stories\ds\Scrollbar.stories.ts
```

- [ ] **Step 3: Confirm nothing else references them**

```powershell
Get-ChildItem -Recurse -File src -Include *.ts,*.vue | Select-String -Pattern "components/ds/Ds" -List
```
Expected: no matches (the only referrers were the deleted stories). If any match appears, report it.

- [ ] **Step 4: Verify**

```powershell
npm run build
npm run build-storybook
npm test
npm run lint
```
Expected: all pass. `src/stories/ds/` now contains only `Colors.stories.ts`, `Typography.stories.ts`, `TokenEditor.stories.ts`. `src/components/ds/` is empty.

- [ ] **Step 5: Remove the now-empty `src/components/ds` directory and commit**

```powershell
if ((Get-ChildItem src\components\ds -Force -ErrorAction SilentlyContinue | Measure-Object).Count -eq 0) { Remove-Item src\components\ds -Force }
git add -A
git commit -m "refactor: remove custom Ds* components and their stories"
```

---

## Task 6: Add a Button color-pattern story to the existing Ionic Button story

**Files:**
- Modify: `src/stories/Button.stories.ts` (the existing `Components/Button`)

- [ ] **Step 1: Append a `ColorPatterns` story**

Add this named export at the END of `src/stories/Button.stories.ts` (keep the existing `Playground` and `Showcase` exports and the existing imports; `IonButton` is already imported):
```ts
export const ColorPatterns: Story = {
  name: 'Color Patterns (tokens)',
  render: () => ({
    components: { IonButton },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; padding:16px; background: var(--app-bg);">
        <p style="font-family: var(--font-family-base); color: var(--app-text-muted); margin:0;">
          design-token を Ionic ボタンに当てた色パターン例（Token Editor で色が変わります）
        </p>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <ion-button class="btn-primary1">Primary① 活性</ion-button>
          <ion-button class="btn-primary1" :disabled="true">Primary① 非活性</ion-button>
        </div>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <ion-button class="btn-primary2">Primary② 活性</ion-button>
          <ion-button class="btn-primary2" :disabled="true">Primary② 非活性</ion-button>
        </div>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <ion-button fill="outline" class="btn-secondary">Secondary 活性</ion-button>
          <ion-button fill="outline" class="btn-secondary" :disabled="true">Secondary 非活性</ion-button>
        </div>
      </div>`,
  }),
};
```

- [ ] **Step 2: Verify**

```powershell
npm run build-storybook
npm run build
```
Expected: both succeed; `Components/Button` now has Playground / Showcase / Color Patterns (tokens).

- [ ] **Step 3: Commit**

```powershell
git add src/stories/Button.stories.ts
git commit -m "feat: add token-driven color-pattern examples to Ionic Button story"
```

---

## Task 7: Final verification

- [ ] **Step 1: Run all four gates**

```powershell
npm run build
npm test
npm run lint
npm run build-storybook
```
Expected: `build` exit 0; `test` all pass (18); `lint` exit 0; `build-storybook` success.

- [ ] **Step 2: Confirm the end state**

- `src/theme/`: `design-tokens.css` (single source: base palette + component tokens + typography), `ionic-bridge.css` (global `--ion-*` + `--ion-font-family` + button pattern classes), `token-registry.ts`, `token-overrides.ts`, `variables.css`. No `tokens.css`, no `ds-icons.css`.
- `src/components/ds/`: removed.
- `src/stories/ds/`: only `Colors`, `Typography`, `TokenEditor`.
- `src/stories/Button.stories.ts`: has the `Color Patterns (tokens)` story.
- `package.json`: no `material-symbols`; `@fontsource/noto-sans-jp` present.

No commit needed if Step 1 is clean (everything already committed in Tasks 1–6).

---

## Self-Review (plan author)

**1. Spec coverage:**
- 単一トークンソース（tokens.css＋design-tokens.css→1ファイル）→ Task 1. ✓
- 単一ブリッジ（グローバル `--ion-*`＋`--ion-font-family`＋部品クラス）→ Task 2. ✓
- 単一エディタ（統合トークン編集／base を registry に追加）→ Task 3（token-overrides 流用＝既存）. ✓
- Material Symbols 撤去（dep/ds-icons.css/Material Icons story/imports、Noto 残す）→ Task 4. ✓
- Ds* と Ds* 依存ストーリー削除（Foundation 残す）→ Task 5. ✓
- 既存 Ionic サンプル stories に色パターン追記（Button、新規ファイルなし）→ Task 6. ✓
- 既存 Ionic サンプル非回帰（--ion-* ← --app-*）→ Task 1 Step 5 で検証. ✓
- 対応ストーリーの無い部品トークンはデモ作らず温存（編集対象としては registry の component 部分に残存）→ 何も削らないことで担保. ✓

**2. Placeholder scan:** Task 1 はリポジトリ既存値の「移動」を指示（値の再記述による drift を避けるため）で、これは正確な refactor 指示でありプレースホルダではない。他の手順は完全コード。✓

**3. Type consistency:** `TokenEntry{name,label,category,kind}` は既存定義どおり。追加 Base 14件は同型。`btn-primary1/2/secondary` のクラス名は Task 2（CSS）と Task 6（story の class）で一致。`button-disabled`（Ionic 付与クラス）を使用。`IonButton` は既存 import を流用。✓

**4. Scope:** 単一の rework。分割不要。✓
