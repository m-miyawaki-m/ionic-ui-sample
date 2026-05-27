import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonButton } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Button',
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'テーマカラー',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'primary' } },
    },
    fill: {
      control: 'select',
      options: ['solid', 'outline', 'clear', 'default'],
      description: '塗りのスタイル',
      table: { type: { summary: "'solid' | 'outline' | 'clear' | 'default'" }, defaultValue: { summary: 'solid' } },
    },
    expand: { control: 'select', options: [undefined, 'block', 'full'], description: '横幅の広げ方', table: { type: { summary: "'block' | 'full'" } } },
    size: { control: 'select', options: [undefined, 'small', 'default', 'large'], description: 'サイズ', table: { type: { summary: "'small' | 'default' | 'large'" } } },
    shape: { control: 'select', options: [undefined, 'round'], description: '角丸', table: { type: { summary: "'round'" } } },
    strong: { control: 'boolean', description: '太字強調', table: { type: { summary: 'boolean' } } },
    disabled: { control: 'boolean', description: '無効化', table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } } },
  },
  args: { color: 'primary', fill: 'solid', disabled: false },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonButton },
    setup: () => ({ args }),
    template: '<ion-button v-bind="args">Button</ion-button>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonButton },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start; padding:16px; max-width:480px;">
        <ion-button>Default</ion-button>
        <ion-button color="primary">Primary</ion-button>
        <ion-button color="success">Success</ion-button>
        <ion-button color="warning">Warning</ion-button>
        <ion-button color="danger">Danger</ion-button>
        <ion-button fill="outline">Outline</ion-button>
        <ion-button fill="clear">Clear</ion-button>
        <ion-button :disabled="true">Disabled</ion-button>
        <ion-button expand="block" style="width:100%">Block</ion-button>
      </div>`,
  }),
};
