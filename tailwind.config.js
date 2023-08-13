/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'primary': {
            100: '#e1f3e4',
            200: '#F8FFF9',
            300: '#75e3a3',
            400: '#2fb063',
            500: '#2c9857',
        },
        "secondary":{
            100:'#f3b69c',
            200:'#f39a74',
            300:'#f37c48',
            400:'#F55F1D',
            500:'#da5115'
        }
      }
    },
  },
  plugins: [
      require("daisyui"),
  ],
}
