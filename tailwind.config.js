module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem'
    },
    extend: {
      typography: ({ theme }) => ({
        pink: {
          css: {
            '--tw-prose-bullets': theme('colors.pink[400]')
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
