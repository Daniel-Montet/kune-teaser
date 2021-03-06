module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridRow: {
        "span-19": "span 19 / span 19",
        "span-21": "span 21 / span 21",
        "span-20": "span 20 / span 20",
      },
      maxWidth: {
        "3/4": "75%",
        "1/4": "25%",
        "9/10": "90%",
      },
      minWidth: {
        "3/4": "75%",
        "1/4": "25%",
        "9/10": "90%",
      },
    },
  },
  plugins: [],
};
