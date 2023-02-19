/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      /** antd */
      spacing: {
        xs: '6px',
        sm: '12px',
        md: '18px',
        lg: '24px',
      },
    },
  },
  plugins: [],
};
