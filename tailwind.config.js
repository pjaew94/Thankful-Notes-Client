module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      logo: ["Etelka Hairline Pro", "sans-serif"],
      light: ["Arkit Light", "sans-serif"],
      kor: ['Gothic A1', "sans-serif"],
      sans: ["Helvetica", 'sans-serif'],
      serif: ["Shapiro", "sans-serif"]
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
       '16': 'repeat(16, minmax(0, 1fr))'
      },
      colors: {
        "mustard": "#DCB74F",
        "blue": "#358DB5",
        "green": "#478D4F",
        "pink": "#FCFDE8",
        "darkPink": "#f6f9b9",
        "hotPink": "#f3f7a2",
        "black": "#111111",
        "white": "#FFFFFF",
        "yellow": "#FCFDE8",
        "lightPurple": "#F1F4FF",
        "mint": "#EBF7F7",
        "darkMint": "#b4e1e1"
      },
      fontSize: {
        "logo-3xl": ["7vw", "7vw"],
        "brand-3xl": ["2vw", "4vw"]
      },
      screens: {
        "3xl": "2560px"
      },
      zIndex: {
        '-10': '-10'
      },
      width: {
        '1/16': '6.25%',
        '2/16': '12.5%',
        '3/16': '18.75%',
        '4/16': '25%',
        '5/16': '31.25%',
        '6/16': '37.5%',
        '7/16': '43.75%',
        '8/16': '50%',
        '9/16': '56.25%',
        '10/16': '62.5%',
        '11/16': '68.75%',
        '12/16': '75%',
        '13/16': '81.25%',
        '14/16': '87.75%',
        '15/16': '93.75%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
