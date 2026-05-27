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
  { id: 'searchbar', title: 'Searchbar',           route: '/components/searchbar', category: 'component', description: '検索バー' },
  { id: 'segment',   title: 'Segment',             route: '/components/segment',   category: 'component', description: 'セグメント切替' },
  { id: 'card',      title: 'Card',                route: '/components/card',      category: 'component', description: 'カード' },
  { id: 'list',      title: 'List & Item',         route: '/components/list',      category: 'component', description: 'リストと項目' },
  { id: 'badge',     title: 'Badge & Chip',        route: '/components/badge',     category: 'component', description: 'バッジとチップ' },
  { id: 'accordion', title: 'Accordion',           route: '/components/accordion', category: 'component', description: 'アコーディオン' },
  { id: 'fab',       title: 'FAB',                 route: '/components/fab',        category: 'component', description: 'フローティングボタン' },
  { id: 'overlays',  title: 'Overlays',            route: '/components/overlays',  category: 'component', description: 'Modal/Alert/ActionSheet/Toast' },
  { id: 'indicators',title: 'Indicators',          route: '/components/indicators',category: 'component', description: 'Loading/Spinner/Progress' },
  { id: 'calendar',  title: 'Calendar',            route: '/components/calendar',  category: 'component', description: 'カレンダー（ion-datetime）' },
  { id: 'icon-button',title: 'IconButton',         route: '/components/icon-button',category: 'component', description: 'アイコン+ラベルの複合ボタン（自作部品）' },
];

export const pageSamples: SampleEntry[] = [
  { id: 'login', title: 'ログイン / サインアップ', route: '/pages/login', category: 'page', description: '認証画面の雛形' },
  { id: 'list-detail',  title: 'リスト + 詳細',      route: '/pages/list',  category: 'page', description: 'マスター詳細型遷移' },
  { id: 'tabs',  title: 'タブレイアウト',          route: '/pages/tabs',  category: 'page', description: '下部タブナビ' },
  { id: 'embedded', title: '埋め込み（サイズ制限）', route: '/pages/embedded', category: 'page', description: '部品をサイズ制限した枠に収める例' },
  { id: 'settings', title: '設定ページ',           route: '/settings',    category: 'page', description: 'テーマ切替を含む設定' },
];

export const allSamples: SampleEntry[] = [...componentSamples, ...pageSamples];
