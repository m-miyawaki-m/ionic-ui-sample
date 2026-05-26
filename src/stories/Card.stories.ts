import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Card',
  argTypes: {
    color: { control: 'select', options: [undefined, 'primary', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    content: { control: 'text' },
  },
  args: { color: undefined, title: 'カードタイトル', subtitle: 'サブタイトル', content: '本文テキスト。' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent },
    setup: () => ({ args }),
    template: `
      <ion-card :color="args.color">
        <ion-card-header>
          <ion-card-subtitle>{{ args.subtitle }}</ion-card-subtitle>
          <ion-card-title>{{ args.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>{{ args.content }}</ion-card-content>
      </ion-card>`,
  }),
};
