import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      fontFamily: {
        "unica-one": ["Unica One", "sans-serif"],
        "space-mono": ["Space Mono", "monospace"]
      },
      screens: {
        xxs: "400px",
        xs: "500px",
      },
      boxShadow: {
        bar: "0px 1px 3px rgba(0, 0, 0, 0.3)"
      },
      colors: {
        onyx: {
          DEFAULT: "#403f4b",
          100: "#0d0d0f",
          200: "#19191e",
          300: "#26262d",
          400: "#33323c",
          500: "#403f4b",
          600: "#626174",
          700: "#878599",
          800: "#afaebb",
          900: "#d7d6dd"
        },
        indian_red: {
          DEFAULT: "#d6545a",
          100: "#300c0d",
          200: "#5f171b",
          300: "#8f2328",
          400: "#be2e35",
          500: "#d6545a",
          600: "#de757a",
          700: "#e6989b",
          800: "#eebabd",
          900: "#f7ddde"
        },
        jasmine: {
          DEFAULT: "#f4dd71",
          100: "#423705",
          200: "#856e0a",
          300: "#c7a50f",
          400: "#efcc2e",
          500: "#f4dd71",
          600: "#f6e38d",
          700: "#f9eaaa",
          800: "#fbf1c6",
          900: "#fdf8e3"
        },
        azure: {
          DEFAULT: "#4983f4",
          100: "#03163c",
          200: "#072c78",
          300: "#0a43b3",
          400: "#0e59ef",
          500: "#4983f4",
          600: "#6c9af6",
          700: "#91b4f9",
          800: "#b6cdfb",
          900: "#dae6fd"
        },
        fairy_tale: {
          DEFAULT: "#e7bed4",
          100: "#3e172c",
          200: "#7c2e57",
          300: "#b94583",
          400: "#d182ac",
          500: "#e7bed4",
          600: "#ecccdd",
          700: "#f1d9e6",
          800: "#f6e6ee",
          900: "#faf2f7"
        }
      }
    }
  },
  plugins: []
};
export default config;
