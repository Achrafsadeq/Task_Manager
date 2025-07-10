import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0a0a0a",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#146037",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1a1a1a",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#a3a3a3",
        },
        accent: {
          DEFAULT: "#146037",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#141414",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#141414",
          foreground: "#ffffff",
        },
        sidebar: {
          DEFAULT: "#0a0a0a",
          foreground: "#ffffff",
          primary: "#146037",
          "primary-foreground": "#ffffff",
          accent: "#1a1a1a",
          "accent-foreground": "#ffffff",
          border: "#0a0a0a",
          ring: "#146037",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        sidebar: "16rem",
        "sidebar-collapsed": "3rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
