const path = require("path");

export default () => ({
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "immutable-deck.js",
    libraryTarget: "umd",
    globalObject: "this",
    // libraryExport: 'default',
    library: "immutable-deck",
  },
  externals: ["immutable", "extendable-immutable"],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
    ],
  },
});
