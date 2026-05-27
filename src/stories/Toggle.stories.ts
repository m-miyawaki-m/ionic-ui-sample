import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonToggle, IonList, IonItem } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Toggle',
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    color: { control: 'select', options: [undefined, 'primary', 'success', 'warning', 'danger'] },
  },
  args: { checked: true, disabled: false, color: 'primary' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonToggle },
    setup: () => ({ args }),
    template: '<ion-toggle v-bind="args">ラベル</ion-toggle>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonToggle, IonList, IonItem },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item><ion-toggle :checked="true">通知</ion-toggle></ion-item>
          <ion-item><ion-toggle color="success">ダークモード</ion-toggle></ion-item>
          <ion-item><ion-toggle :disabled="true">無効</ion-toggle></ion-item>
        </ion-list>
      </div>`,
  }),
};
