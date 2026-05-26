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
