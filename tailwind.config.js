/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './_site/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#050a1a',
          900: '#0a1730',
          800: '#11264a',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 20px 60px rgba(56, 189, 248, 0.16)',
      },
    },
  },
  plugins: [],
};
