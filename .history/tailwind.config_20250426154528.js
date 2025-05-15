module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', 
      
    }),
    require('tailwind-scrollbar')({ 
      nocompatible: true,
    }),
  ],
}