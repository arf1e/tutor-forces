const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
/* 
  для вебпака каждый файл - это модуль
  модули реквайрятся в скриптовом файле
  обработкой модулей занимаются т.н. лоадеры
  их есть у меня:
*/

// заставляем работать инклюды из ес6:
const javascript = {
  test: /\.(js)$/, // удобнее было бы через *, но почему-то низя
  use: [{
    loader: 'babel-loader',
    options: { presets: ['env'] } 
  }],
};

// сверху как раз был один из таких лоадеров
const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [autoprefixer({
        browsers: 'last 3 versions'
      })];
    }
  }
};

// sass/css лоадер. стили реквайрятся из скрипта. фронтенд)))))))))))
const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract(['css-loader', postcss,  'sass-loader'])
};

// и вываливаем это все:
const config = {
  entry: {
    App: './public/javascripts/tutor-forces.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'App.bundle.js'
  },

  module: {
    rules: [javascript, styles]
  },

  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  mode: 'development'
  // TODO: Исправить предупреждение энтрипойнт андефайнд || сделать даунгрейд до третьего вебпака
};

process.noDeprecation = true;

module.exports = config;