/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./renderer/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./renderer/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
