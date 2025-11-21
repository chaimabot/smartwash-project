module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2463eb",
        "primary-light": "#5c5cf8",
        "background-light": "#f6f6f8",
        "background-dark": "#111318",
        "card-light": "#ffffff",
        "card-dark": "#1c1f27",
        "text-light": "#111318",
        "text-light-secondary": "#6b7280",
        "text-dark": "#ffffff",
        "text-dark-secondary": "#9da6b9",
        "border-light": "#e5e7eb",
        "border-dark": "#3b4354",
        accent: "#50E3C2",
        "accent-light": "#70F3D2",
        "neutral-gray": "#BDBDBD",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
