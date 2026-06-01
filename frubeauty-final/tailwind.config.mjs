/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ===== DARK CANVAS =====
        inkDeep:  '#0F0B08',
        ink:      '#1A1410',
        inkSoft:  '#221C17',
        inkRise:  '#2B231D',

        // Text
        cream:    '#F5E8D3',
        creamSoft:'#E4D6C2',
        creamMute:'#A89685',
        creamDim: '#6F6358',

        // Gold accent
        gold:     '#B8884A',
        goldSoft: '#C9A36C',
        goldDeep: '#8E6730',
        goldGlow: '#D9B27D',  // NEW: for lamp light beam highlight

        // Legacy light
        linen:    '#F9F2E8',
        ivory:    '#FBF6EF',
        sand:     '#E8D9C5',
        success:  '#7A8F6D',
      },
      fontFamily: {
        display: ['Fraunces', 'Fraunces Fallback', 'ui-serif', 'Georgia', 'serif'],
        body: ['Geist', 'Geist Fallback', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderColor: {
        whisper:       'rgba(245, 232, 211, 0.08)',
        whisperStrong: 'rgba(245, 232, 211, 0.16)',
      },
      backgroundImage: {
        // Used by the Lamp component — conic gradient picks up Tailwind's
        // gradient color stops via --tw-gradient-stops.
        'gradient-conic': 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        'strong-out':    'cubic-bezier(0.23, 1, 0.32, 1)',
        'strong-in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'drawer':        'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      letterSpacing: {
        'tightest-': '-0.022em',
        'caps':      '0.18em',
      },
    },
  },
  plugins: [],
};
