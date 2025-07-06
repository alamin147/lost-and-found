import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
 content: [
   "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
   ".flowbite-react/class-list.json"
 ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors for consistency
        brand: {
          primary: '#2563eb',    // Blue-600
          secondary: '#0ea5e9',  // Sky-500
          accent: '#22c55e',     // Green-500
          dark: '#1e293b',       // Slate-800
          darker: '#0f172a',     // Slate-900
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [flowbiteReact],
}
