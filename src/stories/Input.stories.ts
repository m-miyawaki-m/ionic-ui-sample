import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonInput, IonItem, IonList } from '@ionic/vue';

const meta: Meta<typeof IonInput> = {
  title: 'Components/Input',
  component: IonInput,
  argTypes: {
    label: { control: 'text' },
    labelPlacement: { control: 'select', options: ['floating', 'stacked', 'fixed', 'start', 'end'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    placeholder: { control: 'text' },
    clearInput: { control: 'boolean' },
  },
  args: { label: '名前', labelPlacement: 'floating', type: 'text', placeholder: '入力してください', clearInput: true },
};
export default meta;

type Story = StoryObj<typeof IonInput>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonInput, IonItem, IonList },
    setup: () => ({ args }),
    template: '<ion-list><ion-item><ion-input v-bind="args" /></ion-item></ion-list>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonInput, IonItem, IonList },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item>
            <ion-input label="名前" label-placement="floating" placeholder="山田太郎" />
          </ion-item>
          <ion-item>
            <ion-input label="メール" type="email" label-placement="stacked" placeholder="a@example.com" />
          </ion-item>
          <ion-item>
            <ion-input label="パスワード" type="password" label-placement="floating" />
          </ion-item>
          <ion-item>
            <ion-input label="クリア可" :clear-input="true" value="編集してください" />
          </ion-item>
        </ion-list>
      </div>`,
  }),
};
