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
        "pink": "#FFF5F4",
        "darkPink": "#ffc7c1",
        "hotPink": "#FF69B4",
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
      }
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
