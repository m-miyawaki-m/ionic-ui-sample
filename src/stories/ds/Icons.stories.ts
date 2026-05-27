import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = { title: 'Design System/Foundation/Icons' };
export default meta;
type Story = StoryObj;

const ICONS = [
  'home', 'settings', 'search', 'person', 'favorite', 'star',
  'delete', 'edit', 'check_circle', 'warning', 'info', 'add',
  'close', 'menu', 'arrow_forward', 'download', 'share', 'visibility',
];

export const Gallery: Story = {
  render: () => ({
    setup: () => ({ icons: ICONS }),
    template: `
      <div style="font-family: var(--font-family-base); color: var(--text-body); background: var(--bg-base); padding:24px;">
        <p style="color: var(--text-form-guide); font-size:14px;">Material Symbols Outlined（weight 200, fill: currentColor）</p>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(96px,1fr)); gap:16px;">
          <div v-for="name in icons" :key="name" style="text-align:center;">
            <span class="material-symbols-outlined" style="font-size:32px;">{{ name }}</span>
            <div style="font-size:11px; color: var(--text-form-guide); margin-top:4px;">{{ name }}</div>
          </div>
        </div>
      </div>`,
  }),
};
