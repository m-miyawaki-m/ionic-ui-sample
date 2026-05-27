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
