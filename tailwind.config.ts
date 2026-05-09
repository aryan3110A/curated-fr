import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        stone: "rgb(var(--stone) / <alpha-value>)",
        beige: "rgb(var(--beige) / <alpha-value>)",
        cream: "rgb(var(--cream) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        rose: "rgb(var(--rose) / <alpha-value>)",
        lavender: "rgb(var(--lavender) / <alpha-value>)",
        peach: "rgb(var(--peach) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"]
      },
      boxShadow: {
        float: "0 24px 80px rgba(30, 24, 19, 0.08)",
        card: "0 12px 32px rgba(30, 24, 19, 0.06)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(190, 181, 155, 0.14), transparent 45%), radial-gradient(circle at 80% 0%, rgba(188, 210, 196, 0.16), transparent 36%), radial-gradient(circle at 80% 80%, rgba(220, 194, 189, 0.18), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
