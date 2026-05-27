import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from '@ionic/vue';

interface ModalArgs {
  backdropDismiss: boolean;
  showBackdrop: boolean;
  title: string;
  content: string;
}

const meta: Meta<ModalArgs> = {
  title: 'Components/Modal',
  argTypes: {
    backdropDismiss: { control: 'boolean', description: '背景タップで閉じる', table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } } },
    showBackdrop: { control: 'boolean', description: '背景の暗幕を表示', table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } } },
    title: { control: 'text', description: 'ヘッダのタイトル' },
    content: { control: 'text', description: '本文テキスト' },
  },
  args: {
    backdropDismiss: true,
    showBackdrop: true,
    title: 'モーダル',
    content: 'モーダルの内容です。backdropDismiss / showBackdrop / タイトル / 本文を Controls で切り替えられます。',
  },
};
export default meta;

type Story = StoryObj<ModalArgs>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons },
    setup() {
      const isOpen = ref(false);
      return { isOpen, args };
    },
    template: `
      <div style="padding:16px; background: var(--app-bg);">
        <ion-button @click="isOpen = true">モーダルを開く</ion-button>
        <ion-modal :is-open="isOpen" :backdrop-dismiss="args.backdropDismiss" :show-backdrop="args.showBackdrop" @did-dismiss="isOpen = false">
          <ion-header>
            <ion-toolbar>
              <ion-title>{{ args.title }}</ion-title>
              <ion-buttons slot="end"><ion-button @click="isOpen = false">閉じる</ion-button></ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">{{ args.content }}</ion-content>
        </ion-modal>
      </div>`,
  }),
};

interface SheetModalArgs {
  initialBreakpoint: number;
}

// 下から引き出すボトムシート型モーダル
export const SheetModal: StoryObj<SheetModalArgs> = {
  name: 'Sheet Modal (ボトムシート)',
  argTypes: {
    initialBreakpoint: { control: 'select', options: [0.25, 0.5, 0.75, 0.9], description: '開いたときの高さ（breakpoint）' },
  },
  args: { initialBreakpoint: 0.5 },
  render: (args) => ({
    components: { IonButton, IonModal, IonContent },
    setup() {
      const isOpen = ref(false);
      const breakpoints = [0, 0.25, 0.5, 0.75, 0.9];
      return { isOpen, args, breakpoints };
    },
    template: `
      <div style="padding:16px; background: var(--app-bg);">
        <ion-button @click="isOpen = true">ボトムシートを開く</ion-button>
        <ion-modal
          :is-open="isOpen"
          :breakpoints="breakpoints"
          :initial-breakpoint="args.initialBreakpoint"
          @did-dismiss="isOpen = false"
        >
          <ion-content class="ion-padding">
            <h2>ボトムシート</h2>
            <p>下から引き出すシート型モーダル。ハンドルをドラッグするか、initialBreakpoint で開く高さを変更できます。</p>
            <ion-button expand="block" @click="isOpen = false">閉じる</ion-button>
          </ion-content>
        </ion-modal>
      </div>`,
  }),
};
