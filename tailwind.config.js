/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors : {
        'bg-black' : '#040612',
        'firstarticle' : '#212936cc',
        'secondarticle' : '#121826cc',
        'bgbutton' : '#3662E3',
        'nonselected' : '#4D5562',
        'borderarticle' : '#CDD5E0',
        'text' : '#F9FAFB',
      },
    },
  },
  plugins: [],
}