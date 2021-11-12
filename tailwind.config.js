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
      colors: {
        "red": "#B54750",
        "mustard": "#DCB74F",
        "blue": "#358DB5",
        "green": "#478D4F",
        "pink": "#FFF5F4",
        "hotPink": "#FF69B4",
        "black": "#28282A",
        "white": "#FFFFFF"
      },
      fontSize: {
        "logo-3xl": ["7vw", "7vw"],
        "brand-3xl": ["2vw", "4vw"]
      },
      screens: {
        "3xl": "2560px"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
