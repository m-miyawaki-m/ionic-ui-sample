import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';

const meta: Meta = { title: 'Components/Select' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonSelect, IonSelectOption },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item>
            <ion-select label="果物" placeholder="選択">
              <ion-select-option value="apple">りんご</ion-select-option>
              <ion-select-option value="orange">みかん</ion-select-option>
              <ion-select-option value="grape">ぶどう</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-select label="複数選択" :multiple="true" placeholder="選択">
              <ion-select-option value="a">A</ion-select-option>
              <ion-select-option value="b">B</ion-select-option>
              <ion-select-option value="c">C</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>`,
  }),
};
