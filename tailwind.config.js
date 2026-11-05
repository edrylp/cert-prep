/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      colors: {
        notion: {
          bg: '#FFFFFF',
          darkBg: '#191919',
          sidebar: '#F7F6F3',
          darkSidebar: '#202020',
          hover: '#EFEFED',
          darkHover: '#2A2A2A',
          border: '#E8E8E6',
          darkBorder: '#303030',
          text: '#37352F',
          darkText: '#E6E6E6',
          muted: '#787774',
          darkMuted: '#9B9B9B',
        },
        aws: {
          orange: '#FF9900',
          dark: '#232F3E',
          squid: '#1A242F',
          blue: '#0073BB',
          lightBlue: '#E7F2FA',
          lightOrange: '#FFF7EB',
        }
      },
      boxShadow: {
        'notion': 'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}

