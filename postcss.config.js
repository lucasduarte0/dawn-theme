module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      propList: ['*']
    }),
    require('tailwindcss'),
    require('autoprefixer')
  ]
}