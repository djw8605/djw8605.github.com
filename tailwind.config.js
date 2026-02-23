/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './_site/**/*.html',
  ],
  // Safelist classes used dynamically by Liquid templates or JS
  // so they are not purged by Tailwind's built-in content analysis.
  safelist: [
    'dark',
    'hidden',
    // Classes toggled by JS theme system
    { pattern: /^(bg|text|border)-(slate|sky|cyan|night)-/ },
    // Picture tag responsive image wrappers
    'picture-responsive',
    'picture-hero',
    'picture-avatar',
    'picture-teaser',
    'picture-content',
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
