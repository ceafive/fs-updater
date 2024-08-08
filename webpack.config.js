//@ts-check

"use strict";

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: "node", // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  mode: "production", // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
  entry: "./src/extension.ts", // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, "dist"),
    filename: "extension.js",
    libraryTarget: "commonjs2",
  },
  externals: {
    vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vscodeignore file
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devtool: "hidden-source-map",
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
};

/** @type WebpackConfig */
const webviewConfig = {
  target: "web",
  mode: "production",
  entry: "./src/app/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    library: {
      type: "commonjs",
    },
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                ["lodash"],
                [
                  "import",
                  {
                    libraryName: "lodash",
                    libraryDirectory: "",
                    camel2DashComponentName: false,
                  },
                  "lodash",
                ],
              ],
              presets: [["@babel/preset-env"]],
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [new MiniCssExtractPlugin(), new LodashModuleReplacementPlugin()],
  devtool: "hidden-source-map",
  infrastructureLogging: {
    level: "log",
  },
};

module.exports = [webviewConfig, extensionConfig];
