/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Amethyst Night (Modo Noche Sereno & Relajante)
        obsidian: {
          950: '#0A0614',
          900: '#0F0A1C', // Fondo principal noche
          850: '#150F26',
          800: '#1A132E', // Superficie de tarjetas noche
          750: '#221A3D',
          700: '#2A204B', // Superficie hover noche
          600: '#392C63',
          500: '#52408A',
          400: '#7E6CB0',
          300: '#ADA0D4',
          200: '#D6CEF0',
          100: '#F5F3FF', // Texto luminoso
        },
        neon: {
          lime: '#A78BFA',    // Amatista luminosa para contraste noche
          emerald: '#7C3AED', // Violeta Amatista noble
          glow: 'rgba(124, 58, 237, 0.35)',
        },

        // Zen Lavanda & Bruma Suave
        sage: {
          50: '#FAF8FC',
          100: '#F3EAFD',
          200: '#EDE9FE',
          300: '#DDD6FE',
          400: '#C4B5FD',
          500: '#A78BFA',
          600: '#8B5CF6',
          700: '#7C3AED',
          800: '#5B21B6',
          900: '#3B1238',
        },
        // Ciruela Noble & Profundidad
        forest: {
          50: '#FAF5FA',
          100: '#F3E8F3',
          200: '#E6CFE6',
          300: '#CCA3CC',
          400: '#9E5B9E',
          500: '#7C3AED',
          600: '#6B2165',
          700: '#53194F',
          800: '#3B1238', // Ciruela Noble Principal
          900: '#270925', // Ciruela oscuro
          950: '#1A0818',
        },
        warm: {
          50: '#FDFBF9',
          100: '#FAF8F5',
          200: '#F4EFE6',
          300: '#EBE3D5',
          400: '#DCD1BE',
          500: '#C7B79E',
          600: '#AFA087',
          700: '#8E8069',
          800: '#6C6250',
          900: '#4A4337',
        },
        gold: {
          50: '#FBF9F0',
          100: '#F6F1DC',
          200: '#EDE0B5',
          300: '#E1CA8B',
          400: '#D4AF37',
          500: '#C5A880',
          600: '#AA884E',
          700: '#856736',
          800: '#644D29',
          900: '#47361D',
        },
        // Zen Lavanda & Ciruela Noble Palette: M&H Bienestar Integral
        mh: {
          plum: '#3B1238',       // Ciruela Noble Profundo (Fuerza, calma y distinción)
          plumDark: '#270925',   // Ciruela noche ultra profundo
          plumMedium: '#53194F', // Ciruela medio elegante
          violet: '#7C3AED',     // Violeta Amatista (Botones de acción, llamadas a reserva)
          violetDark: '#6D28D9', // Hover violeta
          violetLight: '#8B5CF6',// Lavanda luminosa para noche
          lavender: '#EDE9FE',   // Lavanda suave para chips y badges
          lavenderLight: '#F5F3FF', // Fondo bruma lavanda ultra-ligero
          gold: '#D97706',       // Oro cálido (Premios, estrellas, club)
          night: '#0F0A1C',      // Noche Amatista Profunda (Modo noche relajante, no verde)
          cardNight: '#1A132E',  // Superficie de tarjetas modo noche
          borderNight: 'rgba(237, 233, 254, 0.1)',
          pure: '#FFFFFF',
          pearl: '#F8F6FA',      // Blanco perla lavanda
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(28, 47, 35, 0.05)',
        'soft-md': '0 6px 20px -4px rgba(28, 47, 35, 0.08)',
        'soft-lg': '0 12px 32px -6px rgba(28, 47, 35, 0.12)',
        'soft-xl': '0 20px 48px -8px rgba(28, 47, 35, 0.16)',
        'neon-lime': '0 0 25px -4px rgba(200, 255, 62, 0.4)',
        'neon-lime-lg': '0 0 45px -6px rgba(200, 255, 62, 0.55)',
      }
    },
  },
  plugins: [],
};
