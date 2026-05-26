# Ionic + Vue UIサンプル＆テーマ切替アプリ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ionic 8 + Vue 3 + Capacitor(Android) のUIサンプル一覧アプリを作り、ライト/ダーク/練習の3テーマを2層CSSトークンで切替可能にし、Storybookでもカタログ化する。

**Architecture:** Ionic公式 Vue スターターを土台に、`src/theme/tokens.css`（人間が編集する `--app-*` トークン）→ `src/theme/ionic-bridge.css`（`--ion-*` への接続）の2層でテーマを構成。`<html data-theme>` 属性と `useTheme` コンポーザブルで切替・永続化する。`src/data/catalog.ts` の登録簿が一覧画面とルートを駆動する。

**Tech Stack:** Ionic 8, Vue 3, Vite, TypeScript, Vue Router, Capacitor (Android), @capacitor/preferences, Storybook 8 (@storybook/vue3-vite), Vitest + @vue/test-utils + jsdom。

**設計書:** `docs/superpowers/specs/2026-05-26-ionic-vue-ui-sample-design.md`

---

## 前提・環境メモ

- 作業ディレクトリ: `C:\Oracle\3df002\ionic-ui-sample`（既に git 初期化済み・`docs/` と `.gitignore` をコミット済み・GitHub `m-miyawaki-m/ionic-ui-sample` に push 済み）。
- シェルは PowerShell。Ionic CLI 7.2.1 / Node v24 / npm 11 / Java 17。
- `ionic start` は対象名のサブフォルダを新規作成するため、**一時フォルダにscaffoldしてから現リポジトリへマージ**する（既存の `docs/`・`.git` を保持するため）。
- 対話プロンプト回避のため `ionic start` 実行時は `$env:CI = "true"` を設定する（アカウント連携などの質問を既定値で進める）。

---

## ファイル構成（このプランで作成/変更するもの）

```
src/
├── main.ts                         （scaffold生成を編集）IonicVue・router・CSS import・initTheme
├── App.vue                         （scaffold生成）ルート
├── theme/
│   ├── tokens.css            ★ 新規: --app-* トークン 3テーマ
│   ├── ionic-bridge.css        新規: --ion-* → --app-*
│   └── variables.css           （scaffold生成）最小限に整理
├── theme/storage.ts                新規: テーマ永続化（Preferences/localStorage）
├── composables/useTheme.ts         新規: テーマ状態・切替
├── data/catalog.ts                 新規: サンプル登録簿
├── router/index.ts                 （scaffold生成を置換）ルート定義
├── views/
│   ├── HomePage.vue                新規: カタログ入口
│   ├── ComponentsListPage.vue      新規: コンポーネント一覧
│   ├── PagesListPage.vue           新規: ページサンプル一覧
│   ├── SettingsPage.vue            新規: テーマ切替
│   ├── components/
│   │   ├── DemoLayout.vue          新規: デモ画面共通レイアウト
│   │   ├── registry.ts             新規: id→デモ遅延import の対応表
│   │   └── *Demo.vue               新規: 各コンポーネントのデモ
│   └── pages/
│       ├── LoginPage.vue           新規: ログイン/サインアップ
│       ├── ListPage.vue            新規: リスト
│       ├── DetailPage.vue          新規: 詳細
│       └── tabs/{TabsPage,Tab1,Tab2,Tab3}.vue  新規: タブレイアウト
├── tests/
│   ├── useTheme.spec.ts            新規
│   └── catalog.spec.ts             新規
.storybook/{main.ts, preview.ts}    新規/編集: テーマツールバー
src/stories/*.stories.ts            新規: ストーリー
capacitor.config.ts                 （scaffold生成を編集）appId/webDir
vitest.config.ts                    新規: jsdom 環境
```

---

## Phase 1: プロジェクト scaffold とネイティブ設定

### Task 1: Ionic Vue プロジェクトを scaffold してリポジトリへマージ

**Files:**
- Create: 多数（Ionicスターター一式: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/**`, `public/**` など）

- [ ] **Step 1: 一時フォルダに Ionic Vue + Capacitor を scaffold**

PowerShell:
```powershell
$env:CI = "true"
Set-Location C:\Oracle\3df002
ionic start _scaffold_tmp blank --type=vue --capacitor --no-git
```
Expected: `C:\Oracle\3df002\_scaffold_tmp` に Ionic Vue プロジェクトが生成される（`src/`, `package.json`, `vite.config.ts` 等）。`--capacitor` で Capacitor 依存も含まれる。

- [ ] **Step 2: scaffold 内容を現リポジトリへコピー（node_modules と .git を除外）**

PowerShell（robocopy。終了コード 0–7 は正常）:
```powershell
robocopy C:\Oracle\3df002\_scaffold_tmp C:\Oracle\3df002\ionic-ui-sample /E /XD node_modules .git /XF .gitignore
if ($LASTEXITCODE -le 7) { "OK ($LASTEXITCODE)" } else { "FAILED ($LASTEXITCODE)" }
Remove-Item -Recurse -Force C:\Oracle\3df002\_scaffold_tmp
```
Expected: `ionic-ui-sample` に `package.json`・`vite.config.ts`・`src/` 等が入る。既存 `.gitignore`/`docs/`/`.git` は保持（`/XF .gitignore` で既存を上書きしない）。

- [ ] **Step 3: 依存をインストールしてビルド確認**

PowerShell:
```powershell
Set-Location C:\Oracle\3df002\ionic-ui-sample
npm install
npm run build
```
Expected: `npm run build` が成功し `dist/` が生成される。

- [ ] **Step 4: 開発サーバ起動を確認（任意・短時間）**

PowerShell:
```powershell
npm run dev
```
Expected: Vite が `http://localhost:5173` 等で起動。確認後 Ctrl+C で停止。

- [ ] **Step 5: コミット**

```powershell
git add -A
git commit -m "chore: scaffold Ionic Vue + Capacitor project"
```

---

### Task 2: Capacitor 設定と Android プラットフォーム追加

**Files:**
- Modify: `capacitor.config.ts`
- Create: `android/`（`cap add android` で生成）

- [ ] **Step 1: `capacitor.config.ts` を設定**

`capacitor.config.ts` の内容を以下にする:
```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.ionicuisample',
  appName: 'ionic-ui-sample',
  webDir: 'dist',
};

export default config;
```

- [ ] **Step 2: Preferences プラグインと Android プラットフォームを追加**

PowerShell:
```powershell
npm install @capacitor/preferences
npm install @capacitor/android
npm run build
npx cap add android
```
Expected: `android/` ディレクトリが生成され、`npx cap add android` が成功する。

- [ ] **Step 3: Web資産を同期**

PowerShell:
```powershell
npx cap sync android
```
Expected: `✔ Sync finished`。

- [ ] **Step 4: コミット**

```powershell
git add -A
git commit -m "feat: configure Capacitor and add Android platform"
```

---

## Phase 2: テーマシステム

### Task 3: テーマトークン `tokens.css`（3テーマ）

**Files:**
- Create: `src/theme/tokens.css`

- [ ] **Step 1: `src/theme/tokens.css` を作成**

```css
/* =====================================================================
   アプリ配色トークン — 色を変えたいときはこのファイルだけを編集します。
   各テーマで同じ項目を定義してください。
   ===================================================================== */

/* ============ ライトテーマ（既定） ============ */
:root,
html[data-theme="light"] {
  /* 背景・面 */
  --app-bg:             #ffffff;  /* 画面全体の背景 */
  --app-surface:        #f7f7f9;  /* カード・リスト面 */
  --app-surface-2:      #eeeef2;  /* ヘッダ等の一段濃い面 */
  /* 文字 */
  --app-text:           #1a1a1a;  /* 通常の文字色 */
  --app-text-muted:     #6b7280;  /* 補助・キャプション */
  --app-text-on-primary:#ffffff;  /* 主色の上に乗る文字 */
  /* 罫線 */
  --app-border:         #d8d8de;  /* 枠線・区切り線 */
  /* アクセント */
  --app-primary:        #3b82f6;
  --app-primary-rgb:    59, 130, 246;
  --app-success:        #16a34a;
  --app-success-rgb:    22, 163, 74;
  --app-warning:        #d97706;
  --app-warning-rgb:    217, 119, 6;
  --app-danger:         #dc2626;
  --app-danger-rgb:     220, 38, 38;
}

/* ============ ダークテーマ ============ */
html[data-theme="dark"] {
  --app-bg:             #121316;
  --app-surface:        #1c1d22;
  --app-surface-2:      #26272e;
  --app-text:           #f2f2f5;
  --app-text-muted:     #9aa0aa;
  --app-text-on-primary:#ffffff;
  --app-border:         #3a3b42;
  --app-primary:        #60a5fa;
  --app-primary-rgb:    96, 165, 250;
  --app-success:        #4ade80;
  --app-success-rgb:    74, 222, 128;
  --app-warning:        #fbbf24;
  --app-warning-rgb:    251, 191, 36;
  --app-danger:         #f87171;
  --app-danger-rgb:     248, 113, 113;
}

/* ============ 練習テーマ ============ */
html[data-theme="practice"] {
  --app-bg:             #fffaf0;
  --app-surface:        #fff3da;
  --app-surface-2:      #ffe8bf;
  --app-text:           #3a2f1b;
  --app-text-muted:     #8a7a5c;
  --app-text-on-primary:#ffffff;
  --app-border:         #e0c79a;
  --app-primary:        #c2410c;
  --app-primary-rgb:    194, 65, 12;
  --app-success:        #15803d;
  --app-success-rgb:    21, 128, 61;
  --app-warning:        #b45309;
  --app-warning-rgb:    180, 83, 9;
  --app-danger:         #b91c1c;
  --app-danger-rgb:     185, 28, 28;
}
```

- [ ] **Step 2: コミット**

```powershell
git add src/theme/tokens.css
git commit -m "feat: add app color tokens for light/dark/practice themes"
```

---

### Task 4: Ionicブリッジ `ionic-bridge.css`

**Files:**
- Create: `src/theme/ionic-bridge.css`

- [ ] **Step 1: `src/theme/ionic-bridge.css` を作成**

```css
/* =====================================================================
   Ionic標準変数を --app-* トークンへ接続する層。
   原則このファイルは編集しません（色は tokens.css 側で変更）。
   ===================================================================== */
:root {
  /* 基本 */
  --ion-background-color:      var(--app-bg);
  --ion-background-color-rgb:  255, 255, 255; /* 半透明計算用フォールバック */
  --ion-text-color:            var(--app-text);
  --ion-border-color:          var(--app-border);

  /* 面 */
  --ion-toolbar-background:    var(--app-surface-2);
  --ion-item-background:       var(--app-surface);
  --ion-card-background:       var(--app-surface);
  --ion-tab-bar-background:    var(--app-surface-2);

  /* 補助文字 */
  --ion-color-step-500:        var(--app-text-muted);

  /* primary */
  --ion-color-primary:          var(--app-primary);
  --ion-color-primary-rgb:      var(--app-primary-rgb);
  --ion-color-primary-contrast: var(--app-text-on-primary);
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade:    var(--app-primary);
  --ion-color-primary-tint:     var(--app-primary);

  /* success */
  --ion-color-success:          var(--app-success);
  --ion-color-success-rgb:      var(--app-success-rgb);
  --ion-color-success-contrast: #ffffff;
  --ion-color-success-contrast-rgb: 255, 255, 255;
  --ion-color-success-shade:    var(--app-success);
  --ion-color-success-tint:     var(--app-success);

  /* warning */
  --ion-color-warning:          var(--app-warning);
  --ion-color-warning-rgb:      var(--app-warning-rgb);
  --ion-color-warning-contrast: #ffffff;
  --ion-color-warning-contrast-rgb: 255, 255, 255;
  --ion-color-warning-shade:    var(--app-warning);
  --ion-color-warning-tint:     var(--app-warning);

  /* danger */
  --ion-color-danger:           var(--app-danger);
  --ion-color-danger-rgb:       var(--app-danger-rgb);
  --ion-color-danger-contrast:  #ffffff;
  --ion-color-danger-contrast-rgb: 255, 255, 255;
  --ion-color-danger-shade:     var(--app-danger);
  --ion-color-danger-tint:      var(--app-danger);
}

/* ダーク時は半透明計算用の背景RGBも暗色へ */
html[data-theme="dark"] {
  --ion-background-color-rgb: 18, 19, 22;
}
```

- [ ] **Step 2: コミット**

```powershell
git add src/theme/ionic-bridge.css
git commit -m "feat: bridge Ionic CSS variables to app tokens"
```

---

### Task 5: 永続化モジュール `storage.ts`

**Files:**
- Create: `src/theme/storage.ts`

- [ ] **Step 1: `src/theme/storage.ts` を作成**

```ts
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

const KEY = 'app-theme';

/** 保存済みテーマ名を取得（未保存・失敗時は null）。 */
export async function loadThemeName(): Promise<string | null> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Preferences.get({ key: KEY });
      return value;
    }
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/** テーマ名を保存（失敗は無視）。 */
export async function saveThemeName(name: string): Promise<void> {
  try {
    if (Capacitor.isNativePlatform()) {
      await Preferences.set({ key: KEY, value: name });
    } else {
      localStorage.setItem(KEY, name);
    }
  } catch {
    /* 保存失敗は無視（メモリ上の状態は維持） */
  }
}
```

- [ ] **Step 2: コミット**

```powershell
git add src/theme/storage.ts
git commit -m "feat: add theme persistence (Capacitor Preferences + localStorage)"
```

---

### Task 6: `useTheme` コンポーザブル（TDD）

**Files:**
- Create: `src/composables/useTheme.ts`
- Create: `vitest.config.ts`
- Test: `src/tests/useTheme.spec.ts`

- [ ] **Step 1: Vitest 環境を用意**

`vitest.config.ts` を作成:
```ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

PowerShell（テスト依存を追加）:
```powershell
npm install -D vitest jsdom @vue/test-utils
```

`package.json` の `scripts` に追加:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: 失敗するテストを書く**

`src/tests/useTheme.spec.ts`:
```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { setTheme, isThemeName, useTheme } from '../composables/useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('isThemeName は有効なテーマ名だけ true', () => {
    expect(isThemeName('light')).toBe(true);
    expect(isThemeName('dark')).toBe(true);
    expect(isThemeName('practice')).toBe(true);
    expect(isThemeName('neon')).toBe(false);
    expect(isThemeName(123)).toBe(false);
  });

  it('setTheme は data-theme 属性を設定し localStorage に保存する', () => {
    setTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('app-theme')).toBe('dark');
  });

  it('useTheme は現在のテーマと themes 一覧を返す', () => {
    setTheme('practice');
    const { theme, themes } = useTheme();
    expect(theme.value).toBe('practice');
    expect(themes).toEqual(['light', 'dark', 'practice']);
  });
});
```

- [ ] **Step 3: テストが失敗することを確認**

```powershell
npm test
```
Expected: FAIL（`useTheme` 未実装でモジュール解決エラー）。

- [ ] **Step 4: `src/composables/useTheme.ts` を実装**

```ts
import { ref, readonly } from 'vue';
import { loadThemeName, saveThemeName } from '../theme/storage';

export type ThemeName = 'light' | 'dark' | 'practice';

const THEMES: ThemeName[] = ['light', 'dark', 'practice'];
const DEFAULT_THEME: ThemeName = 'light';

const current = ref<ThemeName>(DEFAULT_THEME);

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === 'string' && (THEMES as string[]).includes(value);
}

function applyToDocument(name: ThemeName): void {
  document.documentElement.setAttribute('data-theme', name);
}

/** アプリ起動時に保存値を復元（無効値は既定へフォールバック）。 */
export async function initTheme(): Promise<void> {
  const stored = await loadThemeName();
  current.value = isThemeName(stored) ? stored : DEFAULT_THEME;
  applyToDocument(current.value);
}

/** テーマを切り替えて永続化する。 */
export function setTheme(name: ThemeName): void {
  current.value = name;
  applyToDocument(name);
  void saveThemeName(name);
}

export function useTheme() {
  return {
    theme: readonly(current),
    themes: THEMES,
    setTheme,
  };
}
```

- [ ] **Step 5: テストが通ることを確認**

```powershell
npm test
```
Expected: PASS（3件）。

- [ ] **Step 6: コミット**

```powershell
git add src/composables/useTheme.ts src/tests/useTheme.spec.ts vitest.config.ts package.json package-lock.json
git commit -m "feat: add useTheme composable with tests"
```

---

### Task 7: CSS import と起動時テーマ適用

**Files:**
- Modify: `src/main.ts`
- Modify: `src/theme/variables.css`（不要な既定上書きを最小化）

- [ ] **Step 1: `src/main.ts` を編集してテーマCSSを読み込み initTheme を呼ぶ**

scaffold生成の `main.ts` を以下に置き換える（Ionicコアの import 行はスターターの既存記述を踏襲。`./theme/variables.css` の後にトークンとブリッジを読み込むこと）:
```ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme: tokens → bridge（順序重要） */
import './theme/variables.css';
import './theme/tokens.css';
import './theme/ionic-bridge.css';

import { initTheme } from './composables/useTheme';

const app = createApp(App).use(IonicVue).use(router);

router.isReady().then(async () => {
  await initTheme();
  app.mount('#app');
});
```

- [ ] **Step 2: `src/theme/variables.css` を最小化**

`src/theme/variables.css` の中身を以下だけにする（スターターの既定パレットは `ionic-bridge.css` が上書きするため、競合を避け最小限に）:
```css
/* 既定パレットは tokens.css + ionic-bridge.css で定義します。
   このファイルはスターター互換のため残していますが、原則空です。 */
```

- [ ] **Step 3: ビルド確認**

```powershell
npm run build
```
Expected: 成功。

- [ ] **Step 4: コミット**

```powershell
git add src/main.ts src/theme/variables.css
git commit -m "feat: wire theme CSS and initialize theme on startup"
```

---

## Phase 3: 登録簿・ルーティング・骨格画面

### Task 8: サンプル登録簿 `catalog.ts`（TDD）

**Files:**
- Create: `src/data/catalog.ts`
- Test: `src/tests/catalog.spec.ts`

- [ ] **Step 1: 失敗するテストを書く**

`src/tests/catalog.spec.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { componentSamples, pageSamples, allSamples } from '../data/catalog';

describe('catalog', () => {
  it('全エントリの id は一意', () => {
    const ids = allSamples.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('全エントリが route と title を持つ', () => {
    for (const s of allSamples) {
      expect(s.route.length).toBeGreaterThan(0);
      expect(s.title.length).toBeGreaterThan(0);
    }
  });

  it('コンポーネントは18件以上、ページは4件', () => {
    expect(componentSamples.length).toBeGreaterThanOrEqual(18);
    expect(pageSamples.length).toBe(4);
  });

  it('component の route は /components/ 配下', () => {
    for (const s of componentSamples) {
      expect(s.route.startsWith('/components/')).toBe(true);
    }
  });
});
```

- [ ] **Step 2: テストが失敗することを確認**

```powershell
npm test
```
Expected: FAIL（`catalog` 未実装）。

- [ ] **Step 3: `src/data/catalog.ts` を実装**

```ts
export type SampleCategory = 'component' | 'page';

export interface SampleEntry {
  id: string;
  title: string;
  route: string;
  category: SampleCategory;
  description?: string;
}

export const componentSamples: SampleEntry[] = [
  { id: 'button',    title: 'Button',              route: '/components/button',    category: 'component', description: 'ボタンの各種バリエーション' },
  { id: 'icon',      title: 'Icon',                route: '/components/icon',      category: 'component', description: 'アイコン表示' },
  { id: 'input',     title: 'Input',               route: '/components/input',     category: 'component', description: 'テキスト入力' },
  { id: 'textarea',  title: 'Textarea',            route: '/components/textarea',  category: 'component', description: '複数行入力' },
  { id: 'select',    title: 'Select',              route: '/components/select',    category: 'component', description: '選択リスト' },
  { id: 'checkbox',  title: 'Checkbox',            route: '/components/checkbox',  category: 'component', description: 'チェックボックス' },
  { id: 'toggle',    title: 'Toggle',              route: '/components/toggle',    category: 'component', description: 'トグルスイッチ' },
  { id: 'radio',     title: 'Radio',               route: '/components/radio',     category: 'component', description: 'ラジオボタン' },
  { id: 'range',     title: 'Range',               route: '/components/range',     category: 'component', description: 'スライダー' },
  { id: 'searchbar', title: 'Searchbar',           route: '/components/searchbar', category: 'component', description: '検索バー' },
  { id: 'segment',   title: 'Segment',             route: '/components/segment',   category: 'component', description: 'セグメント切替' },
  { id: 'card',      title: 'Card',                route: '/components/card',      category: 'component', description: 'カード' },
  { id: 'list',      title: 'List & Item',         route: '/components/list',      category: 'component', description: 'リストと項目' },
  { id: 'badge',     title: 'Badge & Chip',        route: '/components/badge',     category: 'component', description: 'バッジとチップ' },
  { id: 'avatar',    title: 'Avatar & Thumbnail',  route: '/components/avatar',    category: 'component', description: 'アバターとサムネイル' },
  { id: 'accordion', title: 'Accordion',           route: '/components/accordion', category: 'component', description: 'アコーディオン' },
  { id: 'fab',       title: 'FAB',                 route: '/components/fab',        category: 'component', description: 'フローティングボタン' },
  { id: 'overlays',  title: 'Overlays',            route: '/components/overlays',  category: 'component', description: 'Modal/Alert/ActionSheet/Toast' },
  { id: 'indicators',title: 'Indicators',          route: '/components/indicators',category: 'component', description: 'Loading/Spinner/Progress' },
];

export const pageSamples: SampleEntry[] = [
  { id: 'login', title: 'ログイン / サインアップ', route: '/pages/login', category: 'page', description: '認証画面の雛形' },
  { id: 'list',  title: 'リスト + 詳細',           route: '/pages/list',  category: 'page', description: 'マスター詳細型遷移' },
  { id: 'tabs',  title: 'タブレイアウト',          route: '/pages/tabs',  category: 'page', description: '下部タブナビ' },
  { id: 'settings', title: '設定ページ',           route: '/settings',    category: 'page', description: 'テーマ切替を含む設定' },
];

export const allSamples: SampleEntry[] = [...componentSamples, ...pageSamples];
```

- [ ] **Step 4: テストが通ることを確認**

```powershell
npm test
```
Expected: PASS。

- [ ] **Step 5: コミット**

```powershell
git add src/data/catalog.ts src/tests/catalog.spec.ts
git commit -m "feat: add sample catalog registry with tests"
```

---

### Task 9: デモ共通レイアウトと登録レジストリ

**Files:**
- Create: `src/views/components/DemoLayout.vue`
- Create: `src/views/components/registry.ts`

- [ ] **Step 1: `src/views/components/DemoLayout.vue` を作成**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/components" />
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <slot />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
} from '@ionic/vue';

defineProps<{ title: string }>();
</script>
```

- [ ] **Step 2: `src/views/components/registry.ts` を作成（id→遅延import）**

```ts
import type { Component } from 'vue';

/** catalog の component id と各デモ画面の対応表。ルート生成に使う。 */
export const componentDemoRegistry: Record<string, () => Promise<{ default: Component }>> = {
  button:     () => import('./ButtonDemo.vue'),
  icon:       () => import('./IconDemo.vue'),
  input:      () => import('./InputDemo.vue'),
  textarea:   () => import('./TextareaDemo.vue'),
  select:     () => import('./SelectDemo.vue'),
  checkbox:   () => import('./CheckboxDemo.vue'),
  toggle:     () => import('./ToggleDemo.vue'),
  radio:      () => import('./RadioDemo.vue'),
  range:      () => import('./RangeDemo.vue'),
  searchbar:  () => import('./SearchbarDemo.vue'),
  segment:    () => import('./SegmentDemo.vue'),
  card:       () => import('./CardDemo.vue'),
  list:       () => import('./ListDemo.vue'),
  badge:      () => import('./BadgeDemo.vue'),
  avatar:     () => import('./AvatarDemo.vue'),
  accordion:  () => import('./AccordionDemo.vue'),
  fab:        () => import('./FabDemo.vue'),
  overlays:   () => import('./OverlaysDemo.vue'),
  indicators: () => import('./IndicatorsDemo.vue'),
};
```

- [ ] **Step 3: コミット**

```powershell
git add src/views/components/DemoLayout.vue src/views/components/registry.ts
git commit -m "feat: add demo layout and component demo registry"
```

---

### Task 10: ルーター定義

**Files:**
- Modify: `src/router/index.ts`（scaffold生成を置換）

- [ ] **Step 1: `src/router/index.ts` を以下に置き換え**

```ts
import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { componentDemoRegistry } from '../views/components/registry';

const componentRoutes: RouteRecordRaw[] = Object.entries(componentDemoRegistry).map(
  ([id, loader]) => ({
    path: `/components/${id}`,
    component: loader,
  }),
);

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('../views/HomePage.vue') },
  { path: '/components', component: () => import('../views/ComponentsListPage.vue') },
  ...componentRoutes,
  { path: '/pages', component: () => import('../views/PagesListPage.vue') },
  { path: '/pages/login', component: () => import('../views/pages/LoginPage.vue') },
  { path: '/pages/list', component: () => import('../views/pages/ListPage.vue') },
  { path: '/pages/list/:id', component: () => import('../views/pages/DetailPage.vue') },
  {
    path: '/pages/tabs',
    component: () => import('../views/pages/tabs/TabsPage.vue'),
    children: [
      { path: '', redirect: '/pages/tabs/tab1' },
      { path: 'tab1', component: () => import('../views/pages/tabs/Tab1.vue') },
      { path: 'tab2', component: () => import('../views/pages/tabs/Tab2.vue') },
      { path: 'tab3', component: () => import('../views/pages/tabs/Tab3.vue') },
    ],
  },
  { path: '/settings', component: () => import('../views/SettingsPage.vue') },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
```

- [ ] **Step 2: `src/App.vue` が `ion-router-outlet` を持つことを確認**

`src/App.vue` がスターター既定（`<ion-app><ion-router-outlet /></ion-app>`）であることを確認。異なる場合は次にする:
```vue
<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
```

- [ ] **Step 3: コミット**

```powershell
git add src/router/index.ts src/App.vue
git commit -m "feat: define app routes from catalog and demo registry"
```

---

### Task 11: ホーム・一覧画面

**Files:**
- Create: `src/views/HomePage.vue`
- Create: `src/views/ComponentsListPage.vue`
- Create: `src/views/PagesListPage.vue`

- [ ] **Step 1: `src/views/HomePage.vue` を作成**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>UIサンプル</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/settings" aria-label="設定">
            <ion-icon slot="icon-only" :icon="settingsOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list :inset="true">
        <ion-item button router-link="/components" detail>
          <ion-icon slot="start" :icon="cubeOutline" />
          <ion-label>
            <h2>コンポーネント</h2>
            <p>{{ componentSamples.length }} 件のUI部品</p>
          </ion-label>
        </ion-item>
        <ion-item button router-link="/pages" detail>
          <ion-icon slot="start" :icon="documentsOutline" />
          <ion-label>
            <h2>ページサンプル</h2>
            <p>{{ pageSamples.length }} 件の画面雛形</p>
          </ion-label>
        </ion-item>
        <ion-item button router-link="/settings" detail>
          <ion-icon slot="start" :icon="settingsOutline" />
          <ion-label>
            <h2>設定</h2>
            <p>テーマ切替（ライト/ダーク/練習）</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon, IonButtons, IonButton,
} from '@ionic/vue';
import { settingsOutline, cubeOutline, documentsOutline } from 'ionicons/icons';
import { componentSamples, pageSamples } from '../data/catalog';
</script>
```

- [ ] **Step 2: `src/views/ComponentsListPage.vue` を作成**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/home" /></ion-buttons>
        <ion-title>コンポーネント</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="s in componentSamples" :key="s.id" button :router-link="s.route" detail>
          <ion-label>
            <h2>{{ s.title }}</h2>
            <p>{{ s.description }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButtons, IonBackButton,
} from '@ionic/vue';
import { componentSamples } from '../data/catalog';
</script>
```

- [ ] **Step 3: `src/views/PagesListPage.vue` を作成**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/home" /></ion-buttons>
        <ion-title>ページサンプル</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="s in pageSamples" :key="s.id" button :router-link="s.route" detail>
          <ion-label>
            <h2>{{ s.title }}</h2>
            <p>{{ s.description }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButtons, IonBackButton,
} from '@ionic/vue';
import { pageSamples } from '../data/catalog';
</script>
```

- [ ] **Step 4: ビルド確認とコミット**

```powershell
npm run build
git add src/views/HomePage.vue src/views/ComponentsListPage.vue src/views/PagesListPage.vue
git commit -m "feat: add home and list pages"
```

---

## Phase 4: コンポーネントデモ（各 *Demo.vue）

> 各デモは `DemoLayout` を使い、Ionic部品を並べるだけの小さな `.vue`。`import DemoLayout from './DemoLayout.vue';` のパスはすべて同ディレクトリ前提。

### Task 12: デモ バッチ1（Button / Icon / Input / Textarea / Select）

**Files:**
- Create: `src/views/components/ButtonDemo.vue`, `IconDemo.vue`, `InputDemo.vue`, `TextareaDemo.vue`, `SelectDemo.vue`

- [ ] **Step 1: `ButtonDemo.vue`**

```vue
<template>
  <demo-layout title="Button">
    <div class="stack">
      <ion-button>Default</ion-button>
      <ion-button color="primary">Primary</ion-button>
      <ion-button color="success">Success</ion-button>
      <ion-button color="warning">Warning</ion-button>
      <ion-button color="danger">Danger</ion-button>
      <ion-button fill="outline">Outline</ion-button>
      <ion-button fill="clear">Clear</ion-button>
      <ion-button :disabled="true">Disabled</ion-button>
      <ion-button expand="block">Block</ion-button>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.stack ion-button { width: 100%; }
</style>
```

- [ ] **Step 2: `IconDemo.vue`**

```vue
<template>
  <demo-layout title="Icon">
    <div class="grid">
      <ion-icon :icon="heart" />
      <ion-icon :icon="star" color="warning" />
      <ion-icon :icon="home" color="primary" />
      <ion-icon :icon="settings" />
      <ion-icon :icon="trash" color="danger" />
      <ion-icon :icon="checkmarkCircle" color="success" />
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { heart, star, home, settings, trash, checkmarkCircle } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
</script>

<style scoped>
.grid { display: flex; gap: 20px; font-size: 32px; flex-wrap: wrap; }
</style>
```

- [ ] **Step 3: `InputDemo.vue`**

```vue
<template>
  <demo-layout title="Input">
    <ion-list>
      <ion-item>
        <ion-input label="名前" label-placement="floating" placeholder="山田太郎" />
      </ion-item>
      <ion-item>
        <ion-input label="メール" type="email" label-placement="stacked" placeholder="a@example.com" />
      </ion-item>
      <ion-item>
        <ion-input label="パスワード" type="password" label-placement="floating" />
      </ion-item>
      <ion-item>
        <ion-input label="クリア可" :clear-input="true" value="編集してください" />
      </ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonInput } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 4: `TextareaDemo.vue`**

```vue
<template>
  <demo-layout title="Textarea">
    <ion-list>
      <ion-item>
        <ion-textarea label="コメント" label-placement="floating" :rows="4" placeholder="自由記述" />
      </ion-item>
      <ion-item>
        <ion-textarea label="自動拡張" :auto-grow="true" label-placement="stacked" />
      </ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonTextarea } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 5: `SelectDemo.vue`**

```vue
<template>
  <demo-layout title="Select">
    <ion-list>
      <ion-item>
        <ion-select label="果物" placeholder="選択">
          <ion-select-option value="apple">りんご</ion-select-option>
          <ion-select-option value="orange">みかん</ion-select-option>
          <ion-select-option value="grape">ぶどう</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-select label="複数選択" :multiple="true" placeholder="選択">
          <ion-select-option value="a">A</ion-select-option>
          <ion-select-option value="b">B</ion-select-option>
          <ion-select-option value="c">C</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 6: ビルド確認とコミット**

```powershell
npm run build
git add src/views/components/ButtonDemo.vue src/views/components/IconDemo.vue src/views/components/InputDemo.vue src/views/components/TextareaDemo.vue src/views/components/SelectDemo.vue
git commit -m "feat: add component demos batch 1 (button/icon/input/textarea/select)"
```

---

### Task 13: デモ バッチ2（Checkbox / Toggle / Radio / Range / Searchbar / Segment）

**Files:**
- Create: `CheckboxDemo.vue`, `ToggleDemo.vue`, `RadioDemo.vue`, `RangeDemo.vue`, `SearchbarDemo.vue`, `SegmentDemo.vue`（すべて `src/views/components/`）

- [ ] **Step 1: `CheckboxDemo.vue`**

```vue
<template>
  <demo-layout title="Checkbox">
    <ion-list>
      <ion-item><ion-checkbox :checked="true">同意する</ion-checkbox></ion-item>
      <ion-item><ion-checkbox>ニュースを受け取る</ion-checkbox></ion-item>
      <ion-item><ion-checkbox :disabled="true">無効</ion-checkbox></ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonCheckbox } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 2: `ToggleDemo.vue`**

```vue
<template>
  <demo-layout title="Toggle">
    <ion-list>
      <ion-item><ion-toggle :checked="true">通知</ion-toggle></ion-item>
      <ion-item><ion-toggle color="success">ダークモード</ion-toggle></ion-item>
      <ion-item><ion-toggle :disabled="true">無効</ion-toggle></ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonToggle } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 3: `RadioDemo.vue`**

```vue
<template>
  <demo-layout title="Radio">
    <ion-list>
      <ion-radio-group value="b">
        <ion-item><ion-radio value="a">選択肢 A</ion-radio></ion-item>
        <ion-item><ion-radio value="b">選択肢 B</ion-radio></ion-item>
        <ion-item><ion-radio value="c">選択肢 C</ion-radio></ion-item>
      </ion-radio-group>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonRadioGroup, IonRadio } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 4: `RangeDemo.vue`**

```vue
<template>
  <demo-layout title="Range">
    <ion-list>
      <ion-item>
        <ion-range :value="40" aria-label="音量"><ion-icon slot="start" :icon="volumeLow" /><ion-icon slot="end" :icon="volumeHigh" /></ion-range>
      </ion-item>
      <ion-item>
        <ion-range :dual-knobs="true" :value="{ lower: 20, upper: 80 }" aria-label="範囲" :pin="true" />
      </ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonRange, IonIcon } from '@ionic/vue';
import { volumeLow, volumeHigh } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 5: `SearchbarDemo.vue`**

```vue
<template>
  <demo-layout title="Searchbar">
    <ion-searchbar placeholder="検索" />
    <ion-searchbar :animated="true" placeholder="アニメーション" show-clear-button="focus" />
    <ion-searchbar color="light" placeholder="色付き" />
  </demo-layout>
</template>

<script setup lang="ts">
import { IonSearchbar } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 6: `SegmentDemo.vue`**

```vue
<template>
  <demo-layout title="Segment">
    <ion-segment value="all">
      <ion-segment-button value="all"><ion-label>すべて</ion-label></ion-segment-button>
      <ion-segment-button value="fav"><ion-label>お気に入り</ion-label></ion-segment-button>
      <ion-segment-button value="archive"><ion-label>アーカイブ</ion-label></ion-segment-button>
    </ion-segment>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 7: ビルド確認とコミット**

```powershell
npm run build
git add src/views/components/CheckboxDemo.vue src/views/components/ToggleDemo.vue src/views/components/RadioDemo.vue src/views/components/RangeDemo.vue src/views/components/SearchbarDemo.vue src/views/components/SegmentDemo.vue
git commit -m "feat: add component demos batch 2 (checkbox/toggle/radio/range/searchbar/segment)"
```

---

### Task 14: デモ バッチ3（Card / List & Item / Badge & Chip / Avatar & Thumbnail）

**Files:**
- Create: `CardDemo.vue`, `ListDemo.vue`, `BadgeDemo.vue`, `AvatarDemo.vue`（すべて `src/views/components/`）

- [ ] **Step 1: `CardDemo.vue`**

```vue
<template>
  <demo-layout title="Card">
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>サブタイトル</ion-card-subtitle>
        <ion-card-title>カードタイトル</ion-card-title>
      </ion-card-header>
      <ion-card-content>カードの本文テキストです。背景・文字色はテーマに追従します。</ion-card-content>
    </ion-card>
    <ion-card color="primary">
      <ion-card-header><ion-card-title>主色カード</ion-card-title></ion-card-header>
      <ion-card-content>color="primary" を指定した例。</ion-card-content>
    </ion-card>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 2: `ListDemo.vue`**

```vue
<template>
  <demo-layout title="List & Item">
    <ion-list>
      <ion-item v-for="n in 4" :key="n" button detail>
        <ion-icon slot="start" :icon="folderOutline" />
        <ion-label>
          <h2>項目 {{ n }}</h2>
          <p>区切り線と文字色がテーマ追従します</p>
        </ion-label>
      </ion-item>
    </ion-list>
    <ion-list :inset="true">
      <ion-item-divider>区切り見出し</ion-item-divider>
      <ion-item><ion-label>インセットリスト</ion-label></ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonIcon, IonItemDivider } from '@ionic/vue';
import { folderOutline } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 3: `BadgeDemo.vue`**

```vue
<template>
  <demo-layout title="Badge & Chip">
    <ion-list>
      <ion-item><ion-label>受信箱</ion-label><ion-badge slot="end" color="primary">12</ion-badge></ion-item>
      <ion-item><ion-label>警告</ion-label><ion-badge slot="end" color="warning">3</ion-badge></ion-item>
    </ion-list>
    <div class="chips">
      <ion-chip>標準</ion-chip>
      <ion-chip color="primary">Primary</ion-chip>
      <ion-chip color="success"><ion-icon :icon="checkmarkCircle" /><ion-label>完了</ion-label></ion-chip>
      <ion-chip :outline="true">アウトライン</ion-chip>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonBadge, IonChip, IonIcon } from '@ionic/vue';
import { checkmarkCircle } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
</script>

<style scoped>
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
</style>
```

- [ ] **Step 4: `AvatarDemo.vue`**

```vue
<template>
  <demo-layout title="Avatar & Thumbnail">
    <ion-list>
      <ion-item>
        <ion-avatar slot="start"><img alt="avatar" src="https://i.pravatar.cc/80?img=1" /></ion-avatar>
        <ion-label>アバター付き項目</ion-label>
      </ion-item>
      <ion-item>
        <ion-thumbnail slot="start"><img alt="thumb" src="https://picsum.photos/120" /></ion-thumbnail>
        <ion-label>サムネイル付き項目</ion-label>
      </ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonAvatar, IonThumbnail } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 5: ビルド確認とコミット**

```powershell
npm run build
git add src/views/components/CardDemo.vue src/views/components/ListDemo.vue src/views/components/BadgeDemo.vue src/views/components/AvatarDemo.vue
git commit -m "feat: add component demos batch 3 (card/list/badge/avatar)"
```

---

### Task 15: デモ バッチ4（Accordion / FAB / Overlays / Indicators）

**Files:**
- Create: `AccordionDemo.vue`, `FabDemo.vue`, `OverlaysDemo.vue`, `IndicatorsDemo.vue`（すべて `src/views/components/`）

- [ ] **Step 1: `AccordionDemo.vue`**

```vue
<template>
  <demo-layout title="Accordion">
    <ion-accordion-group>
      <ion-accordion value="first">
        <ion-item slot="header"><ion-label>セクション1</ion-label></ion-item>
        <div class="ion-padding" slot="content">セクション1の内容。</div>
      </ion-accordion>
      <ion-accordion value="second">
        <ion-item slot="header"><ion-label>セクション2</ion-label></ion-item>
        <div class="ion-padding" slot="content">セクション2の内容。</div>
      </ion-accordion>
    </ion-accordion-group>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 2: `FabDemo.vue`**

```vue
<template>
  <demo-layout title="FAB">
    <p>右下のフローティングボタンを確認してください。</p>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button><ion-icon :icon="add" /></ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button><ion-icon :icon="share" /></ion-fab-button>
        <ion-fab-button><ion-icon :icon="heart" /></ion-fab-button>
      </ion-fab-list>
    </ion-fab>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/vue';
import { add, share, heart } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
</script>
```

- [ ] **Step 3: `OverlaysDemo.vue`**

```vue
<template>
  <demo-layout title="Overlays">
    <div class="stack">
      <ion-button @click="isModalOpen = true">Modal を開く</ion-button>
      <ion-button @click="presentAlert">Alert</ion-button>
      <ion-button @click="presentActionSheet">Action Sheet</ion-button>
      <ion-button @click="presentToast">Toast</ion-button>
    </div>

    <ion-modal :is-open="isModalOpen" @did-dismiss="isModalOpen = false">
      <ion-header>
        <ion-toolbar>
          <ion-title>モーダル</ion-title>
          <ion-buttons slot="end"><ion-button @click="isModalOpen = false">閉じる</ion-button></ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">モーダルの内容です。</ion-content>
    </ion-modal>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  alertController, actionSheetController, toastController,
} from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';

const isModalOpen = ref(false);

async function presentAlert() {
  const alert = await alertController.create({
    header: '確認', message: '実行しますか？',
    buttons: ['キャンセル', 'OK'],
  });
  await alert.present();
}

async function presentActionSheet() {
  const sheet = await actionSheetController.create({
    header: '操作を選択',
    buttons: [
      { text: '削除', role: 'destructive' },
      { text: '共有' },
      { text: 'キャンセル', role: 'cancel' },
    ],
  });
  await sheet.present();
}

async function presentToast() {
  const toast = await toastController.create({ message: '保存しました', duration: 1500, position: 'bottom' });
  await toast.present();
}
</script>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 12px; }
</style>
```

- [ ] **Step 4: `IndicatorsDemo.vue`**

```vue
<template>
  <demo-layout title="Indicators">
    <h3>Spinner</h3>
    <div class="row">
      <ion-spinner name="lines" />
      <ion-spinner name="crescent" />
      <ion-spinner name="dots" />
      <ion-spinner name="circular" />
    </div>
    <h3>Progress</h3>
    <ion-progress-bar :value="0.5" />
    <ion-progress-bar type="indeterminate" />
    <div class="stack">
      <ion-button @click="showLoading">Loading を表示</ion-button>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonSpinner, IonProgressBar, IonButton, loadingController } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';

async function showLoading() {
  const loading = await loadingController.create({ message: '読み込み中…', duration: 1500 });
  await loading.present();
}
</script>

<style scoped>
.row { display: flex; gap: 24px; font-size: 28px; margin-bottom: 12px; }
.stack { margin-top: 16px; }
</style>
```

- [ ] **Step 5: ビルド確認とコミット**

```powershell
npm run build
git add src/views/components/AccordionDemo.vue src/views/components/FabDemo.vue src/views/components/OverlaysDemo.vue src/views/components/IndicatorsDemo.vue
git commit -m "feat: add component demos batch 4 (accordion/fab/overlays/indicators)"
```

---

## Phase 5: ページサンプルと設定

### Task 16: 設定ページ（テーマ切替）

**Files:**
- Create: `src/views/SettingsPage.vue`

- [ ] **Step 1: `src/views/SettingsPage.vue` を作成**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/home" /></ion-buttons>
        <ion-title>設定</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list :inset="true">
        <ion-radio-group :value="theme" @ionChange="onChange">
          <ion-item v-for="t in themeOptions" :key="t.value">
            <ion-radio :value="t.value">{{ t.label }}</ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>
      <p class="hint">現在のテーマ: <strong>{{ theme }}</strong></p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonRadioGroup, IonRadio, IonButtons, IonBackButton,
  type RadioGroupCustomEvent,
} from '@ionic/vue';
import { useTheme, type ThemeName } from '../composables/useTheme';

const { theme, setTheme } = useTheme();

const themeOptions: { value: ThemeName; label: string }[] = [
  { value: 'light', label: 'ライト' },
  { value: 'dark', label: 'ダーク' },
  { value: 'practice', label: '練習' },
];

function onChange(ev: RadioGroupCustomEvent) {
  setTheme(ev.detail.value as ThemeName);
}
</script>

<style scoped>
.hint { color: var(--app-text-muted); margin-top: 16px; }
</style>
```

- [ ] **Step 2: ビルド確認とコミット**

```powershell
npm run build
git add src/views/SettingsPage.vue
git commit -m "feat: add settings page with theme switcher"
```

---

### Task 17: ログイン / サインアップ ページ

**Files:**
- Create: `src/views/pages/LoginPage.vue`

- [ ] **Step 1: `src/views/pages/LoginPage.vue` を作成**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages" /></ion-buttons>
        <ion-title>{{ mode === 'login' ? 'ログイン' : 'サインアップ' }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-segment v-model="mode">
        <ion-segment-button value="login"><ion-label>ログイン</ion-label></ion-segment-button>
        <ion-segment-button value="signup"><ion-label>サインアップ</ion-label></ion-segment-button>
      </ion-segment>

      <ion-list class="ion-margin-top">
        <ion-item>
          <ion-input v-model="email" label="メール" type="email" label-placement="floating" />
        </ion-item>
        <ion-item>
          <ion-input v-model="password" label="パスワード" type="password" label-placement="floating" />
        </ion-item>
        <ion-item v-if="mode === 'signup'">
          <ion-input v-model="confirm" label="パスワード（確認）" type="password" label-placement="floating" />
        </ion-item>
      </ion-list>

      <ion-button expand="block" class="ion-margin-top" @click="submit">
        {{ mode === 'login' ? 'ログイン' : '登録' }}
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonInput, IonButton,
  toastController,
} from '@ionic/vue';

const mode = ref<'login' | 'signup'>('login');
const email = ref('');
const password = ref('');
const confirm = ref('');

async function submit() {
  // UI雛形のため認証は行わずトーストのみ
  const toast = await toastController.create({
    message: mode.value === 'login' ? 'ログイン送信（ダミー）' : '登録送信（ダミー）',
    duration: 1500,
  });
  await toast.present();
}
</script>
```

- [ ] **Step 2: ビルド確認とコミット**

```powershell
npm run build
git add src/views/pages/LoginPage.vue
git commit -m "feat: add login/signup page sample"
```

---

### Task 18: リスト + 詳細 ページ

**Files:**
- Create: `src/views/pages/ListPage.vue`
- Create: `src/views/pages/DetailPage.vue`
- Create: `src/views/pages/listData.ts`

- [ ] **Step 1: `src/views/pages/listData.ts` を作成（共有データ）**

```ts
export interface ListRecord {
  id: string;
  title: string;
  subtitle: string;
  body: string;
}

export const listRecords: ListRecord[] = [
  { id: '1', title: '会議メモ', subtitle: '2026-05-20', body: '次回スプリントのゴールを確認。' },
  { id: '2', title: '買い物リスト', subtitle: '2026-05-21', body: '牛乳・卵・パン・コーヒー豆。' },
  { id: '3', title: '読書記録', subtitle: '2026-05-22', body: 'リファクタリングの章を読了。' },
  { id: '4', title: '旅行計画', subtitle: '2026-05-23', body: '宿と移動手段を仮押さえ。' },
];

export function findRecord(id: string): ListRecord | undefined {
  return listRecords.find((r) => r.id === id);
}
```

- [ ] **Step 2: `src/views/pages/ListPage.vue` を作成**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages" /></ion-buttons>
        <ion-title>リスト + 詳細</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="r in listRecords" :key="r.id" button :router-link="`/pages/list/${r.id}`" detail>
          <ion-label>
            <h2>{{ r.title }}</h2>
            <p>{{ r.subtitle }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
} from '@ionic/vue';
import { listRecords } from './listData';
</script>
```

- [ ] **Step 3: `src/views/pages/DetailPage.vue` を作成**

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages/list" /></ion-buttons>
        <ion-title>{{ record?.title ?? '詳細' }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <template v-if="record">
        <h2>{{ record.title }}</h2>
        <p class="sub">{{ record.subtitle }}</p>
        <p>{{ record.body }}</p>
      </template>
      <p v-else>レコードが見つかりません。</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
} from '@ionic/vue';
import { findRecord } from './listData';

const route = useRoute();
const record = computed(() => findRecord(String(route.params.id)));
</script>

<style scoped>
.sub { color: var(--app-text-muted); }
</style>
```

- [ ] **Step 4: ビルド確認とコミット**

```powershell
npm run build
git add src/views/pages/listData.ts src/views/pages/ListPage.vue src/views/pages/DetailPage.vue
git commit -m "feat: add list + detail page sample"
```

---

### Task 19: タブレイアウト ページ

**Files:**
- Create: `src/views/pages/tabs/TabsPage.vue`, `Tab1.vue`, `Tab2.vue`, `Tab3.vue`

- [ ] **Step 1: `src/views/pages/tabs/TabsPage.vue` を作成**

```vue
<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/pages/tabs/tab1">
          <ion-icon :icon="homeOutline" /><ion-label>ホーム</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/pages/tabs/tab2">
          <ion-icon :icon="searchOutline" /><ion-label>検索</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/pages/tabs/tab3">
          <ion-icon :icon="personOutline" /><ion-label>プロフィール</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel,
} from '@ionic/vue';
import { homeOutline, searchOutline, personOutline } from 'ionicons/icons';
</script>
```

- [ ] **Step 2: `Tab1.vue` / `Tab2.vue` / `Tab3.vue` を作成（同形・タイトル差し替え）**

`src/views/pages/tabs/Tab1.vue`:
```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages" /></ion-buttons>
        <ion-title>ホーム</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding"><p>ホームタブの内容です。</p></ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
</script>
```

`src/views/pages/tabs/Tab2.vue`:
```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages" /></ion-buttons>
        <ion-title>検索</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-searchbar placeholder="検索" />
      <p>検索タブの内容です。</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonSearchbar } from '@ionic/vue';
</script>
```

`src/views/pages/tabs/Tab3.vue`:
```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages" /></ion-buttons>
        <ion-title>プロフィール</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-avatar slot="start"><img alt="avatar" src="https://i.pravatar.cc/80?img=5" /></ion-avatar>
          <ion-label><h2>山田太郎</h2><p>taro@example.com</p></ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/vue';
</script>
```

- [ ] **Step 3: ビルド確認とコミット**

```powershell
npm run build
git add src/views/pages/tabs/TabsPage.vue src/views/pages/tabs/Tab1.vue src/views/pages/tabs/Tab2.vue src/views/pages/tabs/Tab3.vue
git commit -m "feat: add tabs layout page sample"
```

- [ ] **Step 4: アプリ全体を実機/ブラウザで動作確認**

```powershell
npm run dev
```
Expected: ホーム → コンポーネント一覧 → 各デモ、ホーム → ページサンプル → 各ページ、設定でテーマ切替（ライト/ダーク/練習）が全画面に反映されること。確認後 Ctrl+C。

---

## Phase 6: Storybook

### Task 20: Storybook 導入とテーマツールバー

**Files:**
- Create: `.storybook/main.ts`, `.storybook/preview.ts`（`storybook init` 生成を編集）

- [ ] **Step 1: Storybook を初期化**

PowerShell:
```powershell
npx storybook@latest init --type vue3 --builder vite --yes
```
Expected: `.storybook/` と `src/stories/` が生成され、依存が追加される。

- [ ] **Step 2: 動作確認（初期状態）**

```powershell
npm run storybook
```
Expected: ブラウザで Storybook が開く。確認後 Ctrl+C。

- [ ] **Step 3: `.storybook/preview.ts` を編集して Ionic とテーマを組み込む**

`.storybook/preview.ts` を以下に置き換える:
```ts
import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { IonicVue } from '@ionic/vue';

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

import '../src/theme/tokens.css';
import '../src/theme/ionic-bridge.css';

setup((app) => {
  app.use(IonicVue);
});

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  globalTypes: {
    theme: {
      description: 'アプリのテーマ',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'ライト' },
          { value: 'dark', title: 'ダーク' },
          { value: 'practice', title: '練習' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      document.documentElement.setAttribute('data-theme', context.globals.theme);
      return { components: { story }, template: '<story />' };
    },
  ],
};

export default preview;
```

- [ ] **Step 4: `.storybook/main.ts` の stories 範囲を確認**

`.storybook/main.ts` の `stories` が `['../src/**/*.stories.@(js|ts)']` を含むようにする（生成既定に `.mdx` 等が含まれていてもよい。`src/stories/` 配下を拾えればOK）。

- [ ] **Step 5: 生成された不要なサンプルストーリーを削除**

`storybook init` が作る `src/stories/` 内の雛形（`Button.stories.*`, `Page.stories.*`, `*.mdx`, `assets/` 等）のうち、次タスクで自前ストーリーを置くため Ionic と無関係なものは削除する:
```powershell
Remove-Item -Recurse -Force src\stories\* -Exclude *.keep -ErrorAction SilentlyContinue
```

- [ ] **Step 6: コミット**

```powershell
git add .storybook package.json package-lock.json
git add -A src/stories
git commit -m "feat: integrate Storybook with Ionic and theme toolbar"
```

---

### Task 21: コンポーネントのストーリー

**Files:**
- Create: `src/stories/Button.stories.ts`, `Input.stories.ts`, `Card.stories.ts`, `Toggle.stories.ts`, `Badge.stories.ts`

> Storybookの強み（args/コントロール）を示す代表ストーリー。追加コンポーネントも同じ `Meta`/`StoryObj` 構造に、対象コンポーネントの props を `argTypes` として並べるだけで増やせる。

- [ ] **Step 1: `src/stories/Button.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { IonButton } from '@ionic/vue';

const meta: Meta<typeof IonButton> = {
  title: 'Components/Button',
  component: IonButton,
  argTypes: {
    color: { control: 'select', options: ['primary', 'success', 'warning', 'danger'] },
    fill: { control: 'select', options: ['solid', 'outline', 'clear'] },
    expand: { control: 'select', options: [undefined, 'block', 'full'] },
    disabled: { control: 'boolean' },
  },
  args: { color: 'primary', fill: 'solid', disabled: false },
};
export default meta;

type Story = StoryObj<typeof IonButton>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonButton },
    setup: () => ({ args }),
    template: '<ion-button v-bind="args">Button</ion-button>',
  }),
};
```

- [ ] **Step 2: `src/stories/Input.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { IonInput, IonItem, IonList } from '@ionic/vue';

const meta: Meta<typeof IonInput> = {
  title: 'Components/Input',
  component: IonInput,
  argTypes: {
    label: { control: 'text' },
    labelPlacement: { control: 'select', options: ['floating', 'stacked', 'fixed', 'start', 'end'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    placeholder: { control: 'text' },
    clearInput: { control: 'boolean' },
  },
  args: { label: '名前', labelPlacement: 'floating', type: 'text', placeholder: '入力してください', clearInput: true },
};
export default meta;

type Story = StoryObj<typeof IonInput>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonInput, IonItem, IonList },
    setup: () => ({ args }),
    template: '<ion-list><ion-item><ion-input v-bind="args" /></ion-item></ion-list>',
  }),
};
```

- [ ] **Step 3: `src/stories/Card.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Card',
  argTypes: {
    color: { control: 'select', options: [undefined, 'primary', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    content: { control: 'text' },
  },
  args: { color: undefined, title: 'カードタイトル', subtitle: 'サブタイトル', content: '本文テキスト。' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent },
    setup: () => ({ args }),
    template: `
      <ion-card :color="args.color">
        <ion-card-header>
          <ion-card-subtitle>{{ args.subtitle }}</ion-card-subtitle>
          <ion-card-title>{{ args.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>{{ args.content }}</ion-card-content>
      </ion-card>`,
  }),
};
```

- [ ] **Step 4: `src/stories/Toggle.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { IonToggle } from '@ionic/vue';

const meta: Meta<typeof IonToggle> = {
  title: 'Components/Toggle',
  component: IonToggle,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    color: { control: 'select', options: [undefined, 'primary', 'success', 'warning', 'danger'] },
  },
  args: { checked: true, disabled: false, color: 'primary' },
};
export default meta;

type Story = StoryObj<typeof IonToggle>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonToggle },
    setup: () => ({ args }),
    template: '<ion-toggle v-bind="args">ラベル</ion-toggle>',
  }),
};
```

- [ ] **Step 5: `src/stories/Badge.stories.ts`**

```ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { IonBadge } from '@ionic/vue';

const meta: Meta<typeof IonBadge> = {
  title: 'Components/Badge',
  component: IonBadge,
  argTypes: {
    color: { control: 'select', options: ['primary', 'success', 'warning', 'danger'] },
    text: { control: 'text' },
  },
  args: { color: 'primary', text: '12' },
};
export default meta;

type Story = StoryObj<typeof IonBadge>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonBadge },
    setup: () => ({ args }),
    template: '<ion-badge :color="args.color">{{ args.text }}</ion-badge>',
  }),
};
```

- [ ] **Step 6: Storybook ビルドで検証**

```powershell
npm run build-storybook
```
Expected: `storybook-static/` が生成され、エラーなく完了。各ストーリーがツールバーのテーマ切替（ライト/ダーク/練習）で配色変化することを `npm run storybook` で目視確認。

- [ ] **Step 7: コミット**

```powershell
git add src/stories
git commit -m "feat: add Storybook stories for core components"
```

---

## Phase 7: Android 実機確認と仕上げ

### Task 22: Android ビルド確認

**Files:**
- Modify: なし（同期のみ）

- [ ] **Step 1: Web をビルドして Android に同期**

```powershell
npm run build
npx cap sync android
```
Expected: `✔ Sync finished`。

- [ ] **Step 2: Android Studio で開く**

```powershell
npx cap open android
```
Expected: Android Studio が `android/` プロジェクトを開く。Gradle 同期後、エミュレータ/実機で Run。アプリ起動 → ホーム表示 → 設定でテーマ切替が反映 → 再起動後もテーマが保持される（Preferences永続化）ことを確認。

- [ ] **Step 3: README を追加**

`README.md` を作成:
```markdown
# ionic-ui-sample

Ionic 8 + Vue 3 + Capacitor(Android) の UI / ページ サンプル集。
ライト / ダーク / 練習 の3テーマを切替でき、配色は `src/theme/tokens.css` の
`--app-*` 変数を編集するだけで変更できます。

## 開発
- `npm run dev` — Vite 開発サーバ
- `npm run storybook` — コンポーネントカタログ
- `npm test` — 単体テスト（Vitest）

## Android
- `npm run build && npx cap sync android && npx cap open android`

## 配色のカスタマイズ
`src/theme/tokens.css` の各テーマブロック（`html[data-theme="..."]`）にある
背景・面・文字・罫線・アクセントの変数を書き換えてください。
Ionic標準変数への接続は `src/theme/ionic-bridge.css` が担います（通常編集不要）。
```

- [ ] **Step 4: 最終コミットとプッシュ**

```powershell
git add -A
git commit -m "docs: add README and finalize Android sync"
git push
```

---

## Self-Review（プラン作成者による確認）

- **Spec coverage:**
  - 両方の用途（アプリ内＋Storybook）→ Phase 3–5（アプリ）＋ Phase 6（Storybook）。✓
  - 3テーマ（ライト/ダーク/練習）→ Task 3 tokens.css + Task 16 設定。✓
  - 全パーツ色をわかりやすい1か所で → Task 3 tokens.css（`--app-*` 命名・日本語コメント）。✓
  - Ionic部品の自動追従 → Task 4 ionic-bridge.css。✓
  - 厳選コンポーネント約18種 → Task 12–15（19デモ）＋ catalog（Task 8）。✓
  - ページ4種（ログイン/リスト+詳細/タブ/設定）→ Task 16–19。✓
  - Storybookでテーマ切替 → Task 20 preview.ts のツールバー。✓
  - Capacitor Android → Task 2, Task 22。✓
  - テスト（useTheme/catalog）→ Task 6, Task 8。✓
- **Placeholder scan:** 各コード手順に実コードを記載。Storyの「追加は同パターン」は対象propsの型構造を提示済みで、必須5本は完全コード。✓
- **Type consistency:** `ThemeName`（useTheme）/ `SampleEntry`（catalog）/ `componentDemoRegistry`（registry→router）/ `ListRecord`+`findRecord`（listData→DetailPage）が各タスク間で一致。✓
- **Scope:** 単一アプリの一貫プラン。サブシステム分割不要。✓
