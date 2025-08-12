/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#2563eb", light: "#3b82f6", dark: "#1e40af" },
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] },
      boxShadow: { card: "0 4px 6px rgba(0,0,0,0.05)" },
    },
  },
  plugins: [],
};
