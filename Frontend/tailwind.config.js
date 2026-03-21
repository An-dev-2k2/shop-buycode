/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* text/icons: lighter blue (blue-500) */
        "primary":          "var(--color-primary)",
        /* buttons/bg: darker blue (blue-600) */
        "primary-solid":    "rgb(var(--color-primary-rgb) / <alpha-value>)",
        "primary-dark":     "var(--color-primary-dark)",
        "accent":           "rgb(var(--color-accent-rgb) / <alpha-value>)",
        "background-light": "#f6f5f8",
        "background-dark":  "var(--color-bg-dark)",
        "card-dark":        "var(--color-bg-card2)",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg":   "0.5rem",
        "xl":   "0.75rem",
        "2xl":  "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
