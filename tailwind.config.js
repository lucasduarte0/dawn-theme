module.exports = {
  future: {
    mode: 'jit'
  },
  purge: [
    './**/*.liquid'
  ],
  corePlugins: {
    container: false,
  },
  darkMode: false,
  theme: {
    fontFamily: {
      body: ['GT Super Super Text Book', 'sans-serif'],
      heading: ['GT Super Display Light', 'serif'],
      italic: ['GT Super Display Light Italic', 'serif'],
      matter: ['Matter Regular', 'sans-serif'],
      matterlight: ['Matter Light', 'sans-serif']
    },
    colors: {
      'transparent': 'transparent',
      'black': '#000000',
      'white': '#ffffff',
      'cream': '#FBF1DC',
      'beige': '#F2E4C7',
      'beige-50': 'rgba(234,217,180,.5)',
      'brown': '#A67C52',
      'orange': '#DD9B00'
    },
    fontSize: {
      12: '12px',
      13: '13px',
      15: '15px',
      16: '16px',
      17: '17px',
      18: '18px',
      20: '20px',
      24: '24px',
      30: '30px',
      38: '38px',
      75: '75px'
    },
    screens: {
      '2xl': { max: '1440px'},
      '2xl_min': '1441px',
      'xl': { max: '1199px'},
      'xl_min': '1200px', 
      'lg': { max: '991px'},
      'lg_min': '992px', 
      'md': { max: '767px'},
      'md_min': '768px',  
      'sm': { max: '479px'},
      'sm_min': '480px'
    },
    extend: {
      zIndex: {
        '-1': '-1'
      },
      letterSpacing: {
        wider: '.063em'
      }
    }  
  }
}