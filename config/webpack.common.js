const webpack = require("webpack");
const paths = require("./paths");
const { raw, stringified } = require("./env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDevelopment = raw.NODE_ENV === "development";
const isProduction = raw.NODE_ENV === "production";

module.exports = {
  entry: paths.appEntry,
  resolve: {
    alias: {
      "@": paths.appSrc,
    },
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  output: {
    path: paths.appBuild,
    clean: true,
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
        },
        extractComments: false,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
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
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(?:ico|png|jpe?g|gif)$/i,
        type: "asset",
        generator: {
          filename: "static/media/[name].[hash:8].[ext]",
        },
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
              name: "static/media/[name].[hash:8].[ext]",
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
  ],
};
