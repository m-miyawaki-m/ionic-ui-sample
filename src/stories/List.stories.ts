import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonLabel, IonIcon, IonItemDivider } from '@ionic/vue';
import { folderOutline } from 'ionicons/icons';

const meta: Meta = { title: 'Components/List' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonLabel, IonIcon, IonItemDivider },
    setup: () => ({ folderOutline }),
    template: `
      <div style="padding:16px; max-width:480px; display:flex; flex-direction:column; gap:16px;">
        <ion-list>
          <ion-item v-for="n in 4" :key="n" button detail>
            <ion-icon slot="start" :icon="folderOutline" />
            <ion-label>
              <h2>項目 {{ n }}</h2>
              <p>区切り線と文字色がテーマ追従します</p>
            </ion-label>
          </ion-item>
        </ion-list>
        <ion-list :inset="true">
          <ion-item-divider>区切り見出し</ion-item-divider>
          <ion-item><ion-label>インセットリスト</ion-label></ion-item>
        </ion-list>
      </div>`,
  }),
};
