import { describe, it, expect } from 'vitest';
import { tokenRegistry, colorTokens, type TokenEntry } from '../theme/token-registry';

describe('token-registry', () => {
  it('トークン名は一意', () => {
    const names = tokenRegistry.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('全エントリが name/label/category/kind を持つ', () => {
    for (const t of tokenRegistry) {
      expect(t.name.startsWith('--')).toBe(true);
      expect(t.label.length).toBeGreaterThan(0);
      expect(t.category.length).toBeGreaterThan(0);
      expect(['color', 'size', 'raw']).toContain(t.kind);
    }
  });

  it('colorTokens は kind=color のみ', () => {
    expect(colorTokens.every((t: TokenEntry) => t.kind === 'color')).toBe(true);
    expect(colorTokens.length).toBeGreaterThan(20);
  });

  it('土台パレット(--app-*)も編集対象として含む', () => {
    const names = tokenRegistry.map((t) => t.name);
    for (const n of ['--app-bg', '--app-text', '--app-border', '--app-primary', '--app-danger']) {
      expect(names).toContain(n);
    }
    const base = tokenRegistry.filter((t) => t.category === 'Base');
    expect(base.length).toBe(14);
    expect(base.every((t) => t.kind === 'color')).toBe(true);
  });
});
