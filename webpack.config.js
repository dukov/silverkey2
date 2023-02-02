const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    mode: "development",
    entry: {
      main: "./src/main/main.ts",
      preload: "./src/main/preload.ts",
      updater: "./src/main/updater.ts",
    },
    target: "electron-main",
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: "ts-loader" }],
        },
      ],
    },
    output: {
      path: __dirname + "/dist/main",
      filename: "[name].js",
    },
  },
  {
    mode: "development",
    entry: "./src/renderer/index.tsx",
    target: "electron-renderer",
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{ loader: "ts-loader" }],
        },
        {
          test: /\.css$/,
          include: /src/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    output: {
      path: __dirname + "/dist/renderer",
      filename: "renderer.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/renderer/index.html",
      }),
    ],
  },
];
