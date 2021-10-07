module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'productsbg': "url('/slide2-lingerie.jpeg')",

      }),
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
