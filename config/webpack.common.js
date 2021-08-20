const webpack = require("webpack");
const paths = require("./paths");
const { stringified } = require("./env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(?:ico|png|jpe?g|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: [
          "@svgr/webpack",
          {
            loader: "url-loader",
            options: {
              limit: 2048,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin(stringified),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: "[name].bundle.js",
    path: paths.appBuild,
    clean: true,
  },
};
