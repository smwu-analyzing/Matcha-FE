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
        300: "#FFC2E8",
        500: "#FF6FBF",
      },
      green: {
        50: "#EFF6F0",
        500: "#66936D",
        700: "#3F6247",
      },
      gray: {
        0: "#FFFFFF",
        700: "#4E5968",
        900: "#191F28",
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
