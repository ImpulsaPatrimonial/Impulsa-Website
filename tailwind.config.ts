import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        md: '32px',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#16325B',
          deep: '#0E2342',
        },
        brand: '#005E9D',
        sky: '#8FB8E0',
        'gray-brand': '#6B7A83',
        ink: '#3A4552',
        // Token de marca (docs/02). DEFAULT = gris de texto; fondos shadcn usan bg-tint / bg-secondary.
        muted: {
          DEFAULT: '#5B6873',
          foreground: '#5B6873',
        },
        tint: {
          DEFAULT: '#F1F5F9',
          2: '#E6EDF5',
          3: '#C9DAEB',
        },
        line: '#DDE4EC',
        'on-dark': '#D5DEE9',
        'footer-ink': '#B9C6D6',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4 Variable"', 'Georgia', 'serif'],
        sans: ['"Montserrat Variable"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
      },
      maxWidth: {
        wrap: '1200px',
      },
      letterSpacing: {
        eyebrow: '.2em',
        label: '.16em',
        btn: '.04em',
      },
      opacity: {
        6: '.06',
        8: '.08',
        14: '.14',
        16: '.16',
        18: '.18',
        22: '.22',
        35: '.35',
        55: '.55',
        62: '.62',
        86: '.86',
        88: '.88',
      },
      transitionDuration: {
        180: '180ms',
        250: '250ms',
        600: '600ms',
        1100: '1100ms',
      },


      transitionTimingFunction: {
        grow: 'cubic-bezier(.22,1,.36,1)',
      },

      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        marquee: 'marquee 80s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config
