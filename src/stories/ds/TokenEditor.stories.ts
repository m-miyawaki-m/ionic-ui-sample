import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { tokenRegistry } from '../../theme/token-registry';
import { getOverrides, setOverride, resetToken, resetAll, type ThemeName } from '../../theme/token-overrides';

const meta: Meta = { title: 'Design System/Foundation/Token Editor' };
export default meta;
type Story = StoryObj;

export const Editor: Story = {
  render: (_args, { globals }) => ({
    setup() {
      const theme = (globals.theme ?? 'light') as ThemeName;
      const tokens = tokenRegistry;
      const overrides = ref<Record<string, string>>({ ...getOverrides(theme) });

      function currentValue(name: string): string {
        if (overrides.value[name]) return overrides.value[name];
        const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        return v || '#000000';
      }
      function onInput(name: string, value: string) {
        setOverride(theme, name, value);
        overrides.value = { ...getOverrides(theme) };
      }
      function reset(name: string) {
        resetToken(theme, name);
        overrides.value = { ...getOverrides(theme) };
      }
      function resetEverything() {
        resetAll(theme);
        overrides.value = {};
      }
      return { theme, tokens, overrides, currentValue, onInput, reset, resetEverything };
    },
    template: `
      <div style="font-family: var(--font-family-base); color: var(--text-body); background: var(--bg-base); padding:16px;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
          <strong>編集中テーマ: {{ theme }}</strong>
          <button @click="resetEverything"
            style="padding:6px 12px; border-radius:6px; border:1px solid var(--table-border); background: var(--menu-color-1); color: var(--text-body); cursor:pointer;">
            すべてデフォルトに戻す
          </button>
          <span style="font-size:12px; color: var(--text-form-guide);">※ ツールバーのテーマを切り替えると編集対象も切り替わります</span>
        </div>
        <div v-for="t in tokens" :key="t.name"
             style="display:grid; grid-template-columns: 240px 1fr 120px 80px; gap:8px; align-items:center; margin-bottom:6px;">
          <code style="font-size:12px;">{{ t.name }}</code>
          <span style="font-size:12px; color: var(--text-form-guide);">{{ t.label }}</span>
          <template v-if="t.kind === 'color'">
            <input type="color" :value="currentValue(t.name)" @input="onInput(t.name, $event.target.value)"
                   style="width:100%; height:28px; border:1px solid var(--table-border); border-radius:4px;" />
          </template>
          <template v-else>
            <input type="text" :value="overrides[t.name] ?? ''" :placeholder="t.kind"
                   @change="onInput(t.name, $event.target.value)"
                   style="width:100%; height:28px; border:1px solid var(--table-border); border-radius:4px; background: var(--dropdown-bg); color: var(--text-body);" />
          </template>
          <button @click="reset(t.name)"
                  style="padding:4px 8px; border-radius:6px; border:1px solid var(--table-border); background:transparent; color: var(--link-primary); cursor:pointer; font-size:12px;">
            ↺ 既定
          </button>
        </div>
      </div>`,
  }),
};
