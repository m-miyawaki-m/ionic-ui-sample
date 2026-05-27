import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsButton from '../../components/ds/DsButton.vue';

const meta: Meta<typeof DsButton> = {
  title: 'Design System/Components/Button',
  component: DsButton,
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary1', 'primary2', 'secondary'], description: 'バリエーション' },
    disabled: { control: 'boolean', description: '非活性' },
    icon: { control: 'text', description: 'Material Symbols 名（任意）' },
  },
  args: { variant: 'primary1', disabled: false, icon: '' },
};
export default meta;
type Story = StoryObj<typeof DsButton>;

export const Playground: Story = {
  render: (args) => ({
    components: { DsButton },
    setup: () => ({ args }),
    template: '<ds-button v-bind="args">ボタン</ds-button>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { DsButton },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; padding:16px; background: var(--bg-base);">
        <div style="display:flex; gap:12px; align-items:center;">
          <ds-button variant="primary1">Primary① 活性</ds-button>
          <ds-button variant="primary1" :disabled="true">Primary① 非活性</ds-button>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <ds-button variant="primary2">Primary② 活性</ds-button>
          <ds-button variant="primary2" :disabled="true">Primary② 非活性</ds-button>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <ds-button variant="secondary" icon="settings">Secondary 活性</ds-button>
          <ds-button variant="secondary" icon="settings" :disabled="true">Secondary 非活性</ds-button>
        </div>
      </div>`,
  }),
};
