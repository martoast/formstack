/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/*.{html,js,ts,vue}',
    './layouts/*.{html,js,ts,vue}',
    './pages/*.{html,js,ts,vue}'
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#F5A623',
      secondary: '#ecc94b',
      'white': '#ffffff',
      'red': '#dc3545',
      'gray-700': '#374151',
      'gray-900': '#111827'
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

