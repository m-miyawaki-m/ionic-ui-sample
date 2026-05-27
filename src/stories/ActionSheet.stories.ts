import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonButton, actionSheetController } from '@ionic/vue';
import { shareOutline, copyOutline, trashOutline } from 'ionicons/icons';

type SheetBtn = { text: string; role?: 'destructive' | 'cancel'; icon?: string };

interface SheetArgs {
  header: string;
  subHeader: string;
  buttons: string;
  withIcons: boolean;
  destructive: boolean;
  cancel: boolean;
}

const meta: Meta<SheetArgs> = {
  title: 'Components/ActionSheet',
  argTypes: {
    header: { control: 'text', description: 'ヘッダ' },
    subHeader: { control: 'text', description: 'サブヘッダ' },
    buttons: { control: 'text', description: '中段ボタン。1行＝1ボタン（「ラベル」または「ラベル|role」）。' },
    withIcons: { control: 'boolean', description: 'ボタンにアイコンを付ける' },
    destructive: { control: 'boolean', description: '削除（destructive）ボタンを含む' },
    cancel: { control: 'boolean', description: 'キャンセルボタンを含む' },
  },
  args: { header: '操作を選択', subHeader: '実行する操作を選んでください', buttons: '共有\nお気に入り', withIcons: false, destructive: true, cancel: true },
};
export default meta;

type Story = StoryObj<SheetArgs>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonButton },
    setup() {
      async function open() {
        const mid: SheetBtn[] = String(args.buttons || '')
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .map((l) => {
            const [text, role] = l.split('|').map((s) => s.trim());
            return role === 'destructive' || role === 'cancel' ? { text, role } : { text };
          });
        const buttons: SheetBtn[] = [
          ...(args.destructive ? [{ text: '削除', role: 'destructive' as const, icon: args.withIcons ? trashOutline : undefined }] : []),
          ...mid.map((b) => (args.withIcons ? { ...b, icon: copyOutline } : b)),
          ...(args.cancel ? [{ text: 'キャンセル', role: 'cancel' as const }] : []),
        ];
        const sheet = await actionSheetController.create({
          header: args.header || undefined,
          subHeader: args.subHeader || undefined,
          buttons,
        });
        await sheet.present();
      }
      return { open };
    },
    template: '<div style="padding:16px; background: var(--app-bg);"><ion-button @click="open">Action Sheet を開く</ion-button></div>',
  }),
};

// アイコン付きの実用例
export const WithIcons: StoryObj = {
  name: 'With Icons (アイコン付き)',
  render: () => ({
    components: { IonButton },
    setup() {
      async function open() {
        const sheet = await actionSheetController.create({
          header: 'ファイル操作',
          buttons: [
            { text: '共有', icon: shareOutline },
            { text: '複製', icon: copyOutline },
            { text: '削除', role: 'destructive', icon: trashOutline },
            { text: 'キャンセル', role: 'cancel' },
          ],
        });
        await sheet.present();
      }
      return { open };
    },
    template: '<div style="padding:16px; background: var(--app-bg);"><ion-button @click="open">アイコン付きシートを開く</ion-button></div>',
  }),
};
