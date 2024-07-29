/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        name: '#22254E',
        fonts: '#1E2134',
        background: '#CEDDF4'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'permanentMarker': ['Permanent Marker', 'sans-serif']
      },
    },
  },
  plugins: [],
}