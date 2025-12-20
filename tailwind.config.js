/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cybersecurity theme colors
        cyber: {
          blue: '#1e40af',
          cyan: '#0ea5e9',
          dark: '#111827',
          gray: '#1f2937',
          green: '#10b981',
          red: '#ef4444',
          purple: '#8b5cf6',
          yellow: '#f59e0b',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, #1e40af 0%, #0ea5e9 50%, #22d3ee 100%)',
        'dark-gradient': 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}