import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
 content: [
   "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
   ".flowbite-react/class-list.json"
 ],
  theme: {
    extend: {},
  },
  plugins: [flowbiteReact],
}