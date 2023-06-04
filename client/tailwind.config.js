/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  //  darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors:{
        'purple':'rgba(131, 98, 242, 0.5)',
        'purpleSecondary': '#8362F2'
      }
     },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }