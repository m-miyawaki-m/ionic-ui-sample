import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonTextarea } from '@ionic/vue';

const meta: Meta = { title: 'Components/Textarea' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonTextarea },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item>
            <ion-textarea label="コメント" label-placement="floating" :rows="4" placeholder="自由記述" />
          </ion-item>
          <ion-item>
            <ion-textarea label="自動拡張" :auto-grow="true" label-placement="stacked" />
          </ion-item>
        </ion-list>
      </div>`,
  }),
};
