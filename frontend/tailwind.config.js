/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#ec5b13",
        "accent-blue": "#3b82f6",
        "background-light": "#f8f6f6",
        "background-dark": "#0a0a0a",
        "surface-dark": "#171717",
        "border-dark": "#262626",
      },
      fontFamily: {
        "display": ["Public Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}
