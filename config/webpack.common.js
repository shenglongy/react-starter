const paths = require("./paths");
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
  ],
  output: {
    filename: "[name].bundle.js",
    path: paths.appBuild,
    clean: true,
  },
};
