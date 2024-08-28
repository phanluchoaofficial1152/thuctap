import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "rgb-custome-1": "rgba(240, 240, 240, 1)",
        "rgb-custome-2": "rgba(149, 149, 149, 1)",
        "rgb-custome-3": "rgba(0, 0, 0, 1)",
        "rgb-custome-4": "rgba(0, 0, 0, 0.1)",
        "rgb-custome-5": "rgba(227, 227, 227, 1)",
        "rgb-custome-6": "rgba(193, 193, 193, 1)",
        "rgb-custome-7": "rgba(247, 247, 247, 1)",
        "rgb-custome-8": "rgba(196, 196, 196, 1)",
        "rgb-custome-9": "rgba(186, 186, 186, 1)",
        "rgb-custome-10": "rgba(168, 168, 168, 1)",
        "rgb-custome-11": "rgba(219, 219, 219, 1)",
        "rgb-custome-12": "rgba(237, 237, 237, 1)",
        "rgb-custome-13": "rgba(78, 78, 78, 1)",
        "rgb-custome-14": "rgba(247, 247, 247, 1)",
      },
      boxShadow: {
        custome1: "0 0 3px 6px rgba(0, 0, 0, 0.1)",
        custome2: "0 0 3px 1px rgba(0, 0, 0, 0.16)",
        custome3: "0 0 30px 0  rgba(0, 0, 0, 0.06)",
      },
      dropShadow: {
        custome3: "0 3px 6px #000",
      },
      fontWeight: {
        sm: "300",
        md: "400",
        lg: "500",
        big: "700",
      },
    },
    fontFamily: {
      v1: ["Oswald"],
      v2: ["Roboto"],
    },
    fontSize: {
      10: "10px",
      12: "12px",
      14: "14px",
      16: "16px",
      18: "18px",
      24: "24px",
    },
  },
  variants: {},
  plugins: [],
};
export default config;
