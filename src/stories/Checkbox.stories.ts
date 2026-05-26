import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonCheckbox } from '@ionic/vue';

const meta: Meta = { title: 'Components/Checkbox' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonCheckbox },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item><ion-checkbox :checked="true">同意する</ion-checkbox></ion-item>
          <ion-item><ion-checkbox>ニュースを受け取る</ion-checkbox></ion-item>
          <ion-item><ion-checkbox :disabled="true">無効</ion-checkbox></ion-item>
        </ion-list>
      </div>`,
  }),
};
