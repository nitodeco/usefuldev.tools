import { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignoreDependencies: ['@vitest/coverage-v8', 'posthog-node'],
  rules: {
    devDependencies: 'off',
  },
  workspaces: {
    '.': {
      entry: ['./src/**/*.{ts,tsx,js,jsx}'],
      project: ['./src/**/*.{ts,tsx,js,jsx}', './*.{ts,tsx,js,jsx,mjs}'],
    },
  },
};

export default config;
