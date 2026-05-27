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

  it('コンポーネントは18件以上、ページは4件以上', () => {
    expect(componentSamples.length).toBeGreaterThanOrEqual(18);
    expect(pageSamples.length).toBeGreaterThanOrEqual(4);
  });

  it('component の route は /components/ 配下', () => {
    for (const s of componentSamples) {
      expect(s.route.startsWith('/components/')).toBe(true);
    }
  });
});
