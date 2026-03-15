import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f14',
        panel: '#15151d',
        muted: '#4a3f3a',
        accent: '#4ade80',
        cream: '#f5f1e8'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(74, 222, 128, 0.24), 0 8px 28px rgba(74, 222, 128, 0.16)'
      }
    }
  },
  plugins: []
};

export default config;
