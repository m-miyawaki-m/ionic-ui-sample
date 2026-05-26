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
