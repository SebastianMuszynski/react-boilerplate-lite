const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require("./webpack.config");

const extractText = (fallback, use) =>
  ExtractTextPlugin.extract({ fallback, use });

const CSS_LOADER_OPTIONS = "sourceMaps&minimize&localIdentName=[name]--[hash:base64:5]";

module.exports = {
  devtool: "source-map",

  entry: {
    app: path.resolve("src/common/App/App"),
  },

  resolve: config.resolve,

  output: Object.assign({}, config.output, {
    filename: "[name].server.js",
    libraryTarget: "commonjs",
  }),

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true, output: { comments: false } }),
    ...config.plugins,
  ],

  module: {
    rules: [
      { test: /\.css$/, use: extractText("style-loader", `css-loader?${CSS_LOADER_OPTIONS}!postcss-loader`) },
      ...config.module.rules,
    ],
  },
};
