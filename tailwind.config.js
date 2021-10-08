module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'productsbg': "url('/slide2-lingerie.jpeg')",
        'smiley': "url('/fantasy.jpeg')",
        'vector': "url('/de7b6d87acf851682d084b9e9bf6ba1e.jpeg')",
        'shave': "url('/artem-labunsky-2egHYB-m7wE-unsplash.jpeg')",
        'razor1': "url('/dainis-graveris-IE-neXode_Y-unsplash.jpeg')",
        'products': "url('/slide1-lingerie.jpeg')",
        'trimmer': "url('/logan-weaver-DFOqZDsIaUA-unsplash.jpeg')",
        'razor': "url('/mathilde-langevin-MPbVLbwQzaU-unsplash.jpeg')",
        'productsbg': "url('/8-1.jpeg')",

      }),
    } ,width: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '59.666667%',
      '1/4': '25%',
      '1/7':'16.6%',
      '2/4': '50%',
      '3/4': '70%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/0':'22%',
      '1/6': '16.666667%',
      '2/6': '30.333333%',
      '3/0':'30%',
      '6/0':'60%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '295px',
      '11/12': '91.666667%',
      '11/13': '91.8%',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content',
    }),
    maxHeight: {
      '31': '435px',
     }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
