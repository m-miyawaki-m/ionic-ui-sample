import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed } from 'vue';
import { IonGrid, IonRow, IonCol, IonButton, IonItem, IonInput } from '@ionic/vue';

interface GridArgs {
  perRow: number;
  count: number;
  item: 'button' | 'input';
}

const meta: Meta<GridArgs> = {
  title: 'Components/Grid',
  argTypes: {
    perRow: { control: { type: 'number', min: 1, max: 6, step: 1 }, description: '1行あたりの数（列幅 = 12 / perRow）' },
    count: { control: { type: 'number', min: 1, max: 12, step: 1 }, description: '要素数' },
    item: { control: 'inline-radio', options: ['button', 'input'], description: '並べる要素' },
  },
  args: { perRow: 3, count: 6, item: 'button' },
};
export default meta;

type Story = StoryObj<GridArgs>;

/** perRow / count / item を Controls で変えてレイアウトを試す */
export const Playground: Story = {
  render: (args) => ({
    components: { IonGrid, IonRow, IonCol, IonButton, IonItem, IonInput },
    setup() {
      const colSize = computed(() => String(Math.max(1, Math.floor(12 / args.perRow))));
      const items = computed(() => Array.from({ length: args.count }, (_, i) => i + 1));
      return { args, colSize, items };
    },
    template: `
      <div style="padding:16px; background: var(--app-bg);">
        <ion-grid>
          <ion-row>
            <ion-col v-for="n in items" :key="n" :size="colSize">
              <ion-button v-if="args.item === 'button'" expand="block">ボタン {{ n }}</ion-button>
              <ion-item v-else><ion-input :label="'入力 ' + n" label-placement="floating" /></ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>`,
  }),
};

/** 代表的なレイアウト例 */
export const Showcase: Story = {
  render: () => ({
    components: { IonGrid, IonRow, IonCol, IonButton, IonItem, IonInput },
    template: `
      <div style="padding:16px; background: var(--app-bg); color: var(--app-text); font-family: var(--font-family-base);">
        <h3>ボタンを横並び（3列）</h3>
        <ion-grid>
          <ion-row>
            <ion-col size="4"><ion-button expand="block">A</ion-button></ion-col>
            <ion-col size="4"><ion-button expand="block" color="success">B</ion-button></ion-col>
            <ion-col size="4"><ion-button expand="block" color="danger">C</ion-button></ion-col>
          </ion-row>
        </ion-grid>

        <h3>入力を3行（縦に積む）</h3>
        <ion-grid>
          <ion-row v-for="n in 3" :key="n">
            <ion-col size="12"><ion-item><ion-input :label="'項目 ' + n" label-placement="floating" /></ion-item></ion-col>
          </ion-row>
        </ion-grid>

        <h3>レスポンシブ列幅（size-md）とオフセット</h3>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="6"><ion-button expand="block">12 / md6</ion-button></ion-col>
            <ion-col size="12" size-md="6"><ion-button expand="block" fill="outline">12 / md6</ion-button></ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="6" offset="3"><ion-button expand="block" color="warning">size6 / offset3</ion-button></ion-col>
          </ion-row>
        </ion-grid>
      </div>`,
  }),
};
