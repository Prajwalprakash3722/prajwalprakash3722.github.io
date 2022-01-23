module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Raleway"],
      body: ['"Raleway"'],
    },
    extend: {},
  },
  plugins: [],
};
