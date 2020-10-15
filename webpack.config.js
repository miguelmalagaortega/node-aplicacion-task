const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/public/js/app.js",
  output: {
    filename: "bunble.js",
    path: path.join(__dirname, "./src/public/dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
