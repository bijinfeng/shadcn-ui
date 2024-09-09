import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { loadConfigFromFile, mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    const viteConfig = await loadConfigFromFile(
      { command: 'serve', mode: 'development' },
      path.resolve(__dirname, './vite.config.ts'),
    );

    return mergeConfig(config, {
      ...viteConfig?.config,
      plugins: [],
    });
  },
};
export default config;
