const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

const plugins = [
  new webpack.EnvironmentPlugin(["BUGSHOT"]),
  new CopyPlugin({
    patterns: [{ from: "static", to: "." }],
  }),
];
const babelPlugins = [];

if (isDevelopment) {
  plugins.push(new ReactRefreshWebpackPlugin());
  babelPlugins.push(require.resolve("react-refresh/babel"));
}

module.exports = {
  mode: isDevelopment ? "development" : "production",
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
          options: {
            plugins: babelPlugins,
          },
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
  plugins,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "static"),
    },
    client: {
      overlay: {
        warnings: false,
      },
    },
    hot: true,
    compress: true,
    port: 9000,
  },
};
