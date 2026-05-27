export type TokenKind = 'color' | 'size' | 'raw';

export interface TokenEntry {
  name: string;        // CSS変数名（-- 始まり）
  label: string;       // 表示名
  category: string;    // グループ
  kind: TokenKind;     // color=色, size=寸法, raw=その他(gradient/rgba/shadow)
}

export const tokenRegistry: TokenEntry[] = [
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
  { name: '--bg-base', label: '背景（基本）', category: 'Background', kind: 'color' },
  { name: '--bg-pattern', label: '背景（パターン）', category: 'Background', kind: 'raw' },
  { name: '--menu-color-1', label: 'メニュー 通常', category: 'Menu', kind: 'color' },
  { name: '--menu-color-2', label: 'メニュー ホバー', category: 'Menu', kind: 'color' },
  { name: '--menu-color-3', label: 'メニュー 選択', category: 'Menu', kind: 'color' },
  { name: '--menu-color-4', label: 'メニュー 無効/区切り', category: 'Menu', kind: 'color' },
  { name: '--menu-badge', label: 'メニュー バッジ', category: 'Menu', kind: 'color' },
  { name: '--menu-open', label: 'メニュー 展開', category: 'Menu', kind: 'color' },
  { name: '--text-body', label: '本文', category: 'Text', kind: 'color' },
  { name: '--text-heading', label: '見出し', category: 'Text', kind: 'color' },
  { name: '--text-input-filled', label: '入力済み', category: 'Text', kind: 'color' },
  { name: '--text-form-guide', label: 'フォーム案内', category: 'Text', kind: 'color' },
  { name: '--table-header-bg', label: '見出し行 背景', category: 'Table', kind: 'color' },
  { name: '--table-cell-bg-1', label: 'セル背景 ①', category: 'Table', kind: 'color' },
  { name: '--table-cell-bg-2', label: 'セル背景 ②', category: 'Table', kind: 'color' },
  { name: '--table-border', label: '罫線色', category: 'Table', kind: 'color' },
  { name: '--table-border-width', label: '罫線太さ', category: 'Table', kind: 'size' },
  { name: '--dropdown-bg', label: 'プルダウン 背景', category: 'Dropdown', kind: 'color' },
  { name: '--dropdown-bg-selected', label: 'プルダウン 選択', category: 'Dropdown', kind: 'color' },
  { name: '--dialog-list-item-bg', label: '項目 背景', category: 'Dialog', kind: 'color' },
  { name: '--dialog-list-item-bg-selected', label: '項目 選択', category: 'Dialog', kind: 'color' },
  { name: '--dialog-list-item-bg-unselected', label: '項目 未選択', category: 'Dialog', kind: 'color' },
  { name: '--dialog-overlay', label: 'オーバーレイ', category: 'Dialog', kind: 'raw' },
  { name: '--stepper-color-1', label: 'ステップ 完了', category: 'Stepper', kind: 'color' },
  { name: '--stepper-color-2', label: 'ステップ 現在', category: 'Stepper', kind: 'color' },
  { name: '--stepper-color-3', label: 'ステップ 未完了', category: 'Stepper', kind: 'color' },
  { name: '--stepper-color-4', label: 'ステップ エラー', category: 'Stepper', kind: 'color' },
  { name: '--link-primary', label: 'リンク 基本', category: 'Link', kind: 'color' },
  { name: '--link-sub', label: 'リンク サブ', category: 'Link', kind: 'color' },
  { name: '--link-visited', label: 'リンク 既読', category: 'Link', kind: 'color' },
  { name: '--btn-primary1-bg-active', label: 'P① 活性 背景', category: 'Button/Primary1', kind: 'color' },
  { name: '--btn-primary1-text-active', label: 'P① 活性 文字', category: 'Button/Primary1', kind: 'color' },
  { name: '--btn-primary1-bg-disabled', label: 'P① 非活性 背景', category: 'Button/Primary1', kind: 'color' },
  { name: '--btn-primary1-text-disabled', label: 'P① 非活性 文字', category: 'Button/Primary1', kind: 'color' },
  { name: '--btn-primary2-bg-active', label: 'P② 活性 背景', category: 'Button/Primary2', kind: 'color' },
  { name: '--btn-primary2-text-active', label: 'P② 活性 文字', category: 'Button/Primary2', kind: 'color' },
  { name: '--btn-primary2-bg-disabled', label: 'P② 非活性 背景', category: 'Button/Primary2', kind: 'color' },
  { name: '--btn-primary2-text-disabled', label: 'P② 非活性 文字', category: 'Button/Primary2', kind: 'color' },
  { name: '--btn-secondary-border-active', label: 'Sec 活性 枠線', category: 'Button/Secondary', kind: 'color' },
  { name: '--btn-secondary-text-active', label: 'Sec 活性 文字', category: 'Button/Secondary', kind: 'color' },
  { name: '--btn-secondary-bg-active', label: 'Sec 活性 背景', category: 'Button/Secondary', kind: 'raw' },
  { name: '--btn-secondary-border-disabled', label: 'Sec 非活性 枠線', category: 'Button/Secondary', kind: 'color' },
  { name: '--btn-secondary-text-disabled', label: 'Sec 非活性 文字', category: 'Button/Secondary', kind: 'color' },
  { name: '--btn-secondary-bg-disabled', label: 'Sec 非活性 背景', category: 'Button/Secondary', kind: 'raw' },
  { name: '--btn-secondary-border-width', label: 'Sec 枠線太さ', category: 'Button/Secondary', kind: 'size' },
  { name: '--btn-secondary-icon-gap', label: 'Sec アイコン間隔', category: 'Button/Secondary', kind: 'size' },
  { name: '--alert-ng', label: 'NG/エラー', category: 'Alert', kind: 'color' },
  { name: '--alert-warning', label: '警告', category: 'Alert', kind: 'color' },
  { name: '--alert-ok', label: 'OK/成功', category: 'Alert', kind: 'color' },
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
