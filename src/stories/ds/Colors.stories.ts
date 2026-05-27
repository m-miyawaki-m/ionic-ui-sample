import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { groupByCategory } from '../../theme/token-registry';

const meta: Meta = { title: 'Design System/Foundation/Colors' };
export default meta;
type Story = StoryObj;

const THEMES = ['light', 'dark', 'practice'] as const;

/** 全カラートークンを 3モード横並びで表示 */
export const AllTokens: Story = {
  render: () => ({
    setup: () => ({ groups: groupByCategory(), themes: THEMES }),
    template: `
      <div style="font-family: var(--font-family-base); padding:16px;">
        <div v-for="(entries, cat) in groups" :key="cat" style="margin-bottom:24px;">
          <h3 style="margin:0 0 8px; font-size:14px; color:#888;">{{ cat }}</h3>
          <div v-for="t in entries" :key="t.name"
               style="display:grid; grid-template-columns: 220px repeat(3, 1fr); gap:8px; align-items:center; margin-bottom:6px;">
            <code style="font-size:12px;">{{ t.name }}</code>
            <div v-for="theme in themes" :key="theme" :data-theme="theme"
                 style="border:1px solid #ccc; border-radius:6px; padding:6px; background: var(--bg-base);">
              <div :style="{ height:'28px', borderRadius:'4px', border:'1px solid rgba(128,128,128,0.3)', background: 'var(' + t.name + ')' }"></div>
              <div style="font-size:10px; color: var(--text-form-guide); margin-top:2px; text-transform:capitalize;">{{ theme }}</div>
            </div>
          </div>
        </div>
      </div>`,
  }),
};
