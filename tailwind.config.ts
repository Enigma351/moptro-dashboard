import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        muli: ["Muli", "sans-serif"],
      },
      colors: {
        bgPrimary: "#020515",
        bgSecondary: "#090D2E",
        bgCard: "#0F123B",
        textMuted: "#A0AEC0",
        brandBlue: "#0075FF",
      },
    },
  },
  plugins: [],
}

export default config
