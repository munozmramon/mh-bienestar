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
        // Modern Dark Palette (Inspired by ugcviralstudio.com)
        obsidian: {
          950: '#08090B',
          900: '#0E0F12', // Main background
          850: '#121418',
          800: '#16171C', // Card surface
          700: '#1E2027', // Hover surfaces
          600: '#2A2D36',
          500: '#3D414D',
          400: '#646A7A',
          300: '#949BA8',
          200: '#CBD0D9',
          100: '#F5F7F2', // Crisp light text
        },
        neon: {
          lime: '#C8FF3E',    // High-impact cyber lime
          emerald: '#3DDC84', // Minty energetic emerald
          glow: 'rgba(200, 255, 62, 0.35)',
        },

        // Organic Day Palette (Centro Parasanitario M&H)
        sage: {
          50: '#F4F6F4',
          100: '#E6EBE6',
          200: '#CED8CD',
          300: '#B2C2B0',
          400: '#8A9A86',
          500: '#72856E',
          600: '#5A6C56',
          700: '#465443',
          800: '#343F32',
          900: '#242C23',
        },
        forest: {
          50: '#F0F4F1',
          100: '#DCE5DE',
          200: '#B9CBC0',
          300: '#8FAC99',
          400: '#578366',
          500: '#3D684C',
          600: '#2E4E3B',
          700: '#233D2D',
          800: '#1C2F23',
          900: '#142219',
          950: '#0B130E',
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
        // Mockup Exact Palette: M&H Bienestar Integral
        mh: {
          salud: '#2E5D4A',      // Verde Salud #2E5D4A
          natural: '#A7B89F',    // Verde Natural #A7B89F
          dorado: '#D4AF7C',     // Dorado Bienestar #D4AF7C
          crema: '#F8F7F2',      // Crema Equilibrio #F8F7F2
          fondo: '#FBFBF9',
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
