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

// テキスト入力付きの alert（prompt）
export const Prompt: StoryObj = {
  name: 'Prompt (入力付き)',
  render: () => ({
    components: { IonButton },
    setup() {
      async function open() {
        const alert = await alertController.create({
          header: '名前を入力',
          inputs: [
            { name: 'name', type: 'text', placeholder: '山田 太郎' },
            { name: 'memo', type: 'textarea', placeholder: 'メモ（任意）' },
          ],
          buttons: ['キャンセル', 'OK'],
        });
        await alert.present();
      }
      return { open };
    },
    template: '<div style="padding:16px; background: var(--app-bg);"><ion-button @click="open">入力付き Alert を開く</ion-button></div>',
  }),
};

interface RadioAlertArgs {
  header: string;
  options: string;
}

// 単一選択（radio inputs）。選択肢を改行区切りで可変
export const RadioAlert: StoryObj<RadioAlertArgs> = {
  name: 'Radio (単一選択)',
  argTypes: {
    header: { control: 'text', description: 'ヘッダ' },
    options: { control: 'text', description: '選択肢。1行＝1項目。' },
  },
  args: { header: 'サイズを選択', options: 'S\nM\nL\nXL' },
  render: (args) => ({
    components: { IonButton },
    setup() {
      async function open() {
        const opts = String(args.options || '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
        const alert = await alertController.create({
          header: args.header || undefined,
          inputs: opts.map((label, i) => ({ type: 'radio' as const, label, value: label, checked: i === 0 })),
          buttons: ['キャンセル', 'OK'],
        });
        await alert.present();
      }
      return { open };
    },
    template: '<div style="padding:16px; background: var(--app-bg);"><ion-button @click="open">単一選択 Alert を開く</ion-button></div>',
  }),
};

interface CheckboxAlertArgs {
  header: string;
  options: string;
}

// 複数選択（checkbox inputs）。選択肢を改行区切りで可変
export const CheckboxAlert: StoryObj<CheckboxAlertArgs> = {
  name: 'Checkbox (複数選択)',
  argTypes: {
    header: { control: 'text', description: 'ヘッダ' },
    options: { control: 'text', description: '選択肢。1行＝1項目。' },
  },
  args: { header: 'トッピングを選択', options: 'チーズ\nベーコン\n卵\nアボカド' },
  render: (args) => ({
    components: { IonButton },
    setup() {
      async function open() {
        const opts = String(args.options || '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
        const alert = await alertController.create({
          header: args.header || undefined,
          inputs: opts.map((label) => ({ type: 'checkbox' as const, label, value: label })),
          buttons: ['キャンセル', 'OK'],
        });
        await alert.present();
      }
      return { open };
    },
    template: '<div style="padding:16px; background: var(--app-bg);"><ion-button @click="open">複数選択 Alert を開く</ion-button></div>',
  }),
};
