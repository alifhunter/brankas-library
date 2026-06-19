import type { Preview } from '@storybook/react-vite';
import '@brankas/tokens/tokens.css';
// Component CSS uses --color-*/--space-*/--font-sans aliases defined here.
// Loaded globally so per-component stories that deep-import their .tsx still get the tokens.
import '../../../packages/react/src/desktop/_tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Get Started',
          'Contribute',
          'Foundations',
          'Desktop UI',
          'Mobile UI',
          '*',
          'Deprecated',
        ],
      },
    },
  },
};

export default preview;
