module.exports = {
  content: ["./static/**/*.html", "./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
