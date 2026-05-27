import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from '@ionic/vue';

interface ModalArgs {
  backdropDismiss: boolean;
  showBackdrop: boolean;
}

const meta: Meta<ModalArgs> = {
  title: 'Components/Modal',
  argTypes: {
    backdropDismiss: { control: 'boolean', description: '背景タップで閉じる', table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } } },
    showBackdrop: { control: 'boolean', description: '背景の暗幕を表示', table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } } },
  },
  args: { backdropDismiss: true, showBackdrop: true },
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
              <ion-title>モーダル</ion-title>
              <ion-buttons slot="end"><ion-button @click="isOpen = false">閉じる</ion-button></ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">モーダルの内容です。backdropDismiss / showBackdrop を Controls で切り替えられます。</ion-content>
        </ion-modal>
      </div>`,
  }),
};
