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
