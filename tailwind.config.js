import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [flowbite.plugin()],
};
