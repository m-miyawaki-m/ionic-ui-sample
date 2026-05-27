import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = { title: 'Design System/Foundation/Typography' };
export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => ({
    template: `
      <div style="font-family: var(--font-family-base); color: var(--text-body); background: var(--bg-base); padding:24px;">
        <p style="font-size: var(--font-size-title); line-height: var(--line-height-title); color: var(--text-heading); font-weight:700; margin:0 0 16px;">タイトル 23px / 1.4 — あいうえお Aa</p>
        <p style="font-size: var(--font-size-heading); line-height: var(--line-height-heading); color: var(--text-heading); font-weight:700; margin:0 0 16px;">見出し 20px / 1.5 — あいうえお Aa</p>
        <p style="font-size: var(--font-size-body); line-height: var(--line-height-body); margin:0 0 16px;">本文 16px / 1.6 — あいうえおかきくけこ The quick brown fox.</p>
        <p style="font-size: var(--font-size-caption); line-height: var(--line-height-caption); color: var(--text-form-guide); margin:0;">キャプション 14px / 1.5 — 補足テキスト</p>
      </div>`,
  }),
};
