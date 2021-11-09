const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: 'cheap-module-source-map',
  entry: {
    background: "./src/background.ts",
    screenshot: "./src/screenshot.ts",
    editor: "./src/editor.tsx",
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "static", to: "." }],
    })
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  }
};
