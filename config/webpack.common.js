const webpack = require("webpack");
const paths = require("./paths");
const { stringified } = require("./env");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: paths.appEntry,
  resolve: {
    alias: {
      "@": paths.appSrc,
    },
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin(stringified),
  ],
  output: {
    filename: "[name].bundle.js",
    path: paths.appBuild,
    clean: true,
  },
};
