import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-bg":
          "linear-gradient(45deg, #F65879  0%, #FEA58F 33% , #FA96C2 100%)",
      },
      colors: {
        divamecha: "#EEEEF0",
        crimsonred: "#DC143C",
        richBlack: "#000000",
        pastelMagenta: "#FA96C2",
        ponceau: "#F65879",
        coralSenader: "#FEA58F",
      },
      animation: { blob: "blob 7s infinite" },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "tranlate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
