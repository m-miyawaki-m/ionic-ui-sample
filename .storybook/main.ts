import type { StorybookConfig } from '@storybook/vue3-vite';
import type { InlineConfig } from 'vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/vue3-vite",
  async viteFinal(config: InlineConfig) {
    // Remove the @vitejs/plugin-legacy plugin and all sub-plugins it creates.
    // The legacy plugin targets old browsers (es2015/safari12) which don't
    // support BigInt literals, breaking the Storybook esbuild-transpile step.
    function isLegacyPlugin(p: any): boolean {
      if (!p) return false;
      const name: string = (p as any).name ?? '';
      return (
        name === 'vite:legacy-config' ||
        name === 'vite:legacy-generate-polyfill-chunk' ||
        name === 'vite:legacy-post' ||
        name.startsWith('vite:legacy')
      );
    }

    function flatFilter(plugins: any[]): any[] {
      return plugins
        .flat(Infinity)
        .filter((p: any) => p && !isLegacyPlugin(p));
    }

    if (config.plugins) {
      config.plugins = flatFilter(config.plugins as any[]);
    }
    return config;
  },
};
export default config;
