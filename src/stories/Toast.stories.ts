import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonButton, toastController } from '@ionic/vue';

interface ToastArgs {
  message: string;
  duration: number;
  position: 'top' | 'middle' | 'bottom';
  color?: string;
}

const meta: Meta<ToastArgs> = {
  title: 'Components/Toast',
  argTypes: {
    message: { control: 'text', description: 'メッセージ' },
    duration: { control: 'number', description: '表示時間(ms)', table: { type: { summary: 'number' }, defaultValue: { summary: '1500' } } },
    position: { control: 'inline-radio', options: ['top', 'middle', 'bottom'], description: '位置' },
    color: { control: 'select', options: [undefined, 'primary', 'success', 'warning', 'danger'], description: '色' },
  },
  args: { message: '保存しました', duration: 1500, position: 'bottom', color: undefined },
};
export default meta;

type Story = StoryObj<ToastArgs>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonButton },
    setup() {
      async function open() {
        const toast = await toastController.create({
          message: args.message,
          duration: args.duration,
          position: args.position,
          color: args.color || undefined,
        });
        await toast.present();
      }
      return { open };
    },
    template: '<div style="padding:16px; background: var(--app-bg);"><ion-button @click="open">Toast を表示</ion-button></div>',
  }),
};
