/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#151514',
          light: '#242422',
          muted: '#686663',
          subtle: '#8C8A85',
        },
        paper: {
          DEFAULT: '#EBE9E5',
          pure: '#FFFFFF',
          subtle: '#E5E3DD',
          elevated: '#F5F3EF',
          card: '#FBF9F5',
          border: 'rgba(21, 21, 20, 0.08)',
        },
        chroma: {
          blue: '#1A73E8',
          cyan: '#0070F3',
        },
      },
      fontFamily: {
        sans: [
          '"Geist"',
          '"Plus Jakarta Sans"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        serif: [
          '"Instrument Serif"',
          'Georgia',
          'serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'monospace',
        ],
      },
      borderRadius: {
        '4xl': '36px',
        '5xl': '44px',
      },
      letterSpacing: {
        tightest: '-0.055em',
        tighter: '-0.04em',
        tight: '-0.025em',
      },
    },
  },
  plugins: [],
};
