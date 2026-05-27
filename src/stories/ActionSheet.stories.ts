import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonButton, actionSheetController } from '@ionic/vue';

type SheetBtn = { text: string; role?: 'destructive' | 'cancel' };

interface SheetArgs {
  header: string;
  destructive: boolean;
  cancel: boolean;
}

const meta: Meta<SheetArgs> = {
  title: 'Components/ActionSheet',
  argTypes: {
    header: { control: 'text', description: 'ヘッダ' },
    destructive: { control: 'boolean', description: '削除（destructive）ボタンを含む' },
    cancel: { control: 'boolean', description: 'キャンセルボタンを含む' },
  },
  args: { header: '操作を選択', destructive: true, cancel: true },
};
export default meta;

type Story = StoryObj<SheetArgs>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonButton },
    setup() {
      async function open() {
        const buttons: SheetBtn[] = [
          ...(args.destructive ? [{ text: '削除', role: 'destructive' as const }] : []),
          { text: '共有' },
          { text: 'お気に入り' },
          ...(args.cancel ? [{ text: 'キャンセル', role: 'cancel' as const }] : []),
        ];
        const sheet = await actionSheetController.create({ header: args.header || undefined, buttons });
        await sheet.present();
      }
      return { open };
    },
    template: '<div style="padding:16px; background: var(--app-bg);"><ion-button @click="open">Action Sheet を開く</ion-button></div>',
  }),
};
