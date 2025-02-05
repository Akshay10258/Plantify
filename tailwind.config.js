/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        smooch: ['Smooch Sans', 'sans-serif'],
      },
        
      colors: {
        'spotify-green': '#1DB954',
        'spotify-black': '#191414',
      },
    },
  },
  plugins: [],
}
