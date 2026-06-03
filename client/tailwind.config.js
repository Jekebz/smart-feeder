export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        imprima: ["Imprima", "sans-serif"],
      },
      colors: {
        page: "#F8F3F1",
        main: "#F3EFD8",
        sidebar: "#F6DDD8",
        active: "#D88A8A",
        pink: "#FF4F87",
        blue: "#4DA3FF",
        feed: "#E8B8B0",
        ink: "#2B2B2B",
        muted: "#8D8D8D",
        line: "#ECECEC",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
