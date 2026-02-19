/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    {
      // bg-color-400 এবং text-color-400 এর জন্য
      pattern: /bg-(cyan|teal|violet|indigo|emerald|rose)-(100|400)/,
    },
    {
      pattern: /text-(cyan|teal|violet|indigo|emerald|rose)-(100|400)/,
    },
    {
      // focus:border-color-400 এর জন্য
      pattern: /border-(cyan|teal|violet|indigo|emerald|rose)-(100|400)/,
      variants: ["focus"],
    },
    {
      // border-color-400 এর জন্য
      pattern: /border-(cyan|teal|violet|indigo|emerald|rose)-(100|400)/,
    },
    {
      // bg, text, এবং border এর সাধারণ ক্লাস
      pattern:
        /(bg|text|border)-(cyan|teal|violet|indigo|emerald|rose)-(100|400|500)/,
      variants: ["hover", "active", "focus"], // ভ্যারিয়েন্টগুলো এখানে একবারে দিয়ে দেওয়া ভালো
    },
    {
      // শ্যাডো এবং অপাসিটির জন্য (Shadow with Opacity)
      // hover:shadow-cyan-400/50 এবং active:shadow-cyan-500/80 কভার করবে
      pattern:
        /shadow-(cyan|teal|violet|indigo|emerald|rose)-(400|500)\/(50|80)/,
      variants: ["hover", "active"],
    },
  ],
  plugins: [],
};
