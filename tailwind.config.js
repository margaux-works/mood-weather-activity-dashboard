module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // Ensure Tailwind scans your files

  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        gris: '#202733',
        green: '#53ffaa',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
