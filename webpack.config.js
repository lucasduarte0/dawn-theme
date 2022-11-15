const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const devtool = mode === 'development' ? 'eval-cheap-source-map' : false;

module.exports = {
  entry: {
    theme: './src/scripts/theme.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'bundle.[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/, //using regex to tell babel exactly what files to transcompile
        exclude: /node_modules/, // files to be ignored
        use: {
            loader: 'babel-loader' // specify the loader
        } 
      }      
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.[name].css'
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      }),
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          }
        }
      })
    ]
  }
};

if (mode === 'development') {
  module.exports.plugins.push(
    new WebpackShellPluginNext({
      onBuildStart:{
        scripts: ['echo Webpack build in progress...🛠'],
      }, 
      onBuildEnd:{
        scripts: ['echo Build Complete 📦','shopify theme serve'],
        parallel: true
      }
    })
  )
}