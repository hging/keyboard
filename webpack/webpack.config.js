var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var floders = fs.readdirSync(path.join(__dirname, '..', '/src/pages'));

var routers = floders.map(name => ({
  name: 'c' + name,
  entry: `./pages/${name}/index`,
  template: `./pages/${name}/template.html`,
  filename: `./${name}.html`
}));

var entry = {
  three: './lib/three.min',
  stlLoader: './lib/STLLoader',
};
routers.forEach((r) => {
  entry[r.name] = r.entry;
});
var plugins = routers.map(r => new HtmlWebpackPlugin({
  template: r.template,
  filename: r.filename,
  chunks: ['three', 'stlLoader', r.name],
  inject: 'body',
  templateParameters: {
    ...r.templateParameters,
  },
}));
var rewrites = routers.map(r => ({
  from: new RegExp('\\/' + r.name),
  to: '/' + r.filename,
}));

var config = {
  mode: 'development',
  context: path.join(__dirname, '..', '/src'),
  entry,
  devServer: {
    inline: true,
    hot: true,
    // host: '0.0.0.0',
    historyApiFallback: {
      index: '/',
      rewrites,
    },
  },
  output: {
    path: path.join(__dirname, '..', '/build'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production', // judge if dev environment.
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(plugins),
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [
        path.join(__dirname, '..', 'src'),
      ],
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
      ],
    }, {
      test: /\.less$/,
      use: [{
          loader: 'style-loader'
        }, // creates style nodes from JS strings
        {
          loader: 'css-loader'
        }, // translates CSS into CommonJS
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }, // compiles Less to CSS
      ],
    }, {
      test: /\.scss$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader'
        },
      ],
    }, {
      test: /\.(png|jpg|gif|svg|mp3|mp4|blob|woff|woff2|webp|eot|ttf|typeface|stl)$/,
      use: [{
        loader: 'file-loader',
        options: {},
      }, ],
    }, {
      test: /\.layout\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          interpolate: true,
        },
      }],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@src': path.join(__dirname, '..', '/src'),
      '@assets': path.join(__dirname, '..', '/src/_assets'),
    }
  },
  externals: {
    lodash: "_",
    jquery: "jQuery",
    three: 'THREE',
  },
};

module.exports = config;
