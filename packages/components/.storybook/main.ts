import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  framework: '@storybook/react-vite',
  addons: ['@storybook/addon-essentials', '@storybook/addon-storysource'],
  previewHead: (head) => `${head}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
    <style>
      html,
      body {
        font-family: 'Geist', sans-serif;
      }
    </style>
  `,
};

export default config;
