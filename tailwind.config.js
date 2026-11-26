/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      pink: {
        50: "#FFF5FB",
        100: "#FFEAF7",
        200: "#FFDCF2",
        300: "#FFC2E8",
        400: "#FFA3DA",
        500: "#FF6FBF",
      },
      green: {
        50: "#EFF6F0",
        100: "#DCEBDF",
        500: "#66936D",
        600: "#527A59",
        700: "#3F6247",
      },
      gray: {
        0: "#FFFFFF",
        100: "#F2F4F6",
        200: "#E5E8EB",
        300: "#D1D6DB",
        500: "#8B95A1",
        600: "#6B7684",
        700: "#4E5968",
        900: "#191F28",
      },
      line: {
        2: "#3FAE5A",
        "2-bg": "#E6F5EA",
        4: "#3B82D6",
        "4-bg": "#E5EFFB",
      },
      status: {
        safe: "#66936D",
        caution: "#F0A52E",
        warn: "#F2704A",
        danger: "#FF5CB4",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "Noto Sans KR",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "title-xl": [
          "28px",
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "title-l": [
          "22px",
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "title-m": [
          "18px",
          { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "title-s": [
          "16px",
          { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "body-m": [
          "14px",
          { lineHeight: "1.45", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "body-m-bold": [
          "14px",
          { lineHeight: "1.45", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "caption-m": [
          "12px",
          { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        "caption-r": [
          "12px",
          { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        // 홈 화면 큰 퍼센트 숫자 (56/60, 자간 -3%)
        display: [
          "56px",
          { lineHeight: "60px", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-xl": [
          "64px",
          { lineHeight: "70px", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "title-2xl": [
          "36px",
          { lineHeight: "42px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "body-l": [
          "16px",
          { lineHeight: "1.45", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        micro: [
          "11px",
          { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
      },
      borderRadius: {
        badge: "12px",
        chip: "16px",
        tile: "16px",
        button: "18px",
        cta: "20px",
        input: "22px",
        card: "32px",
      },
      backgroundImage: {
        "hero-miss":
          "linear-gradient(229.73deg, #FFC2E8 16.834%, #FFA3DA 140.23%)",
      },
      boxShadow: {
        card: "0 8px 12px rgba(255, 112, 191, 0.14)",
      },
    },
  },
  plugins: [],
};
