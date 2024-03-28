/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {colors: {
      "white-97": "#f7f7f8",
      "absolute-white": "#fff",
      "white-95": "#f1f1f3",
      "grey-15": "#262626",
      "grey-35": "#59595a",
      "white-90": "#e3e3e8",
      "grey-60": "#98989a",
      black: "#000",
      darkslategray: "#333",
      "grey-40": "#656567",
      "grey-30": "#4c4c4d",
      "white-99": "#fcfcfd",
    },
    spacing: {},
    fontFamily: {
      "be-vietnam-pro": "'Be Vietnam Pro'",
      inter: "Inter",
    },
    borderRadius: {
      "3xs": "10px",
    },
  },
  fontSize: {
    xl: "20px",
      base: "16px",
      lg: "18px",
      "31xl": "50px",
      "21xl": "40px",
      "11xl": "30px",
      "3xl": "22px",
      "5xl": "24px",
      lgi: "19px",
      "29xl": "48px",
      "19xl": "38px",
      "10xl": "29px",
      inherit: "inherit",
  },
  screens: {
    mq1875: {
      raw: "screen and (max-width: 1875px)",
    },
    mq1400: {
      raw: "screen and (max-width: 1400px)",
    },
    mq925: {
      raw: "screen and (max-width: 925px)",
    },
    mq450: {
      raw: "screen and (max-width: 450px)",
    },},
  },
  plugins: [],
}

