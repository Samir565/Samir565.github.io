/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070D18',
          900: '#0B1526',
          850: '#0E1D36',
          800: '#142544',
          700: '#1E3A66',
        },
        electric: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B9DDFF',
          300: '#7CC2FF',
          400: '#38A2FF',
          500: '#0A84FF',
          600: '#0066E0',
          700: '#0051B4',
        },
        surface: {
          base: '#FBFBFC',
          card: '#FFFFFF',
          subtle: '#F4F5F7',
          border: '#E2E6EC',
          borderSubtle: '#EDEFF2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.03)',
        'card': '0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 28px -6px rgba(15, 23, 42, 0.1), 0 6px 14px -3px rgba(15, 23, 42, 0.06)',
        'glow': '0 0 20px -3px rgba(10, 132, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
