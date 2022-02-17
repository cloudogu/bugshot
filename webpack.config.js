const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const { name, version } = require("./package.json");

const isDevelopment = process.env.NODE_ENV === "development";

const plugins = [
  new CleanWebpackPlugin(),
  new CopyPlugin({
    patterns: [{ from: "static", to: ".", transform: (content, absoluteFrom) => {
      if (absoluteFrom.endsWith("manifest.json")) {
        const manifest = JSON.parse(content);
        manifest.version = version;
        return JSON.stringify(manifest, null, 2);
      }
      return content;
    } }],
  }),
];

if (!isDevelopment) {
  plugins.push(
    new ZipPlugin({
      filename: `${name}-${version}.zip`,
      path: path.join(__dirname, "dist"),
    })
  );
}

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: "cheap-module-source-map",
  entry: {
    background: "./src/background.ts",
    content: "./src/content.ts",
    editor: "./src/editor.tsx",
    connection: "./src/connection.tsx",
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    alias: { react: require.resolve("react") },
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  plugins: plugins,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
};
