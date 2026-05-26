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
