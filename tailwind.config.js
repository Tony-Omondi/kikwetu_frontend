/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandRed: '#ef4444',
        brandBlack: '#000000',
        brandTurquoise: '#00CED1',
        brandWhite: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
