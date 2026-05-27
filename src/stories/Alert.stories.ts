import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonButton, alertController } from '@ionic/vue';

type AlertBtn = string | { text: string; role: 'destructive' | 'cancel' };

interface AlertArgs {
  header: string;
  subHeader: string;
  message: string;
  buttons: string;
}

const meta: Meta<AlertArgs> = {
  title: 'Components/Alert',
  argTypes: {
    header: { control: 'text', description: 'ヘッダ' },
    subHeader: { control: 'text', description: 'サブヘッダ' },
    message: { control: 'text', description: 'メッセージ' },
    buttons: { control: 'select', options: ['OK', 'OK / キャンセル', '3ボタン'], description: 'ボタン構成' },
  },
  args: { header: '確認', subHeader: '', message: '実行しますか？', buttons: 'OK / キャンセル' },
};
export default meta;

type Story = StoryObj<AlertArgs>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonButton },
    setup() {
      const sets: Record<string, AlertBtn[]> = {
        'OK': ['OK'],
        'OK / キャンセル': ['キャンセル', 'OK'],
        '3ボタン': ['キャンセル', { text: '保存しない', role: 'destructive' }, 'OK'],
      };
      async function open() {
        const alert = await alertController.create({
          header: args.header || undefined,
          subHeader: args.subHeader || undefined,
          message: args.message || undefined,
          buttons: sets[args.buttons] ?? ['OK'],
        });
        await alert.present();
      }
      return { open };
    },
    template: '<div style="padding:16px; background: var(--app-bg);"><ion-button @click="open">Alert を開く</ion-button></div>',
  }),
};
