/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#06B6D4',
        alert: '#F59E0B',
        critical: '#DC2626',
        success: '#10B981',
        background: '#F3F4F6',
      },
    },
  },
  plugins: [],
}
