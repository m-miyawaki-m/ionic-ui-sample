import { describe, it, expect, beforeEach } from 'vitest';
import { setTheme, isThemeName, useTheme, initTheme } from '../composables/useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    setTheme('light');
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

  it('initTheme は保存済みの有効なテーマを復元する', async () => {
    localStorage.setItem('app-theme', 'dark');
    await initTheme();
    const { theme } = useTheme();
    expect(theme.value).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('initTheme は無効な保存値を light にフォールバックする', async () => {
    localStorage.setItem('app-theme', 'neon');
    await initTheme();
    const { theme } = useTheme();
    expect(theme.value).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
