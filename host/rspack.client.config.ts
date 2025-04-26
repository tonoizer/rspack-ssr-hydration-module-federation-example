const { defineConfig } = require("@rspack/cli");
const { rspack } = require("@rspack/core");
const { VueLoaderPlugin } = require("vue-loader");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/rspack");
const path = require("node:path");

module.exports = defineConfig({
  target: "web",
  entry: {
    client: "./src/entry-client.ts",
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist/client"),
    uniqueName: "rspack_ssr_hydration_host_vue",
    publicPath: "http://localhost:3000/client/",
  },
  resolve: {
    extensions: ["...", ".ts", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.(js|ts)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.svg/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      dts: false,
      name: "rspack_ssr_hydration_host_vue",
      manifest: true,
      filename: "remoteEntry.js",
      remotes: {
        rspack_ssr_hydration_remote_vue:
          "rspack_ssr_hydration_remote_vue@http://localhost:3001/client/remoteEntry.js",
      },
      shared: {
        vue: {
          eager: true,
          singleton: true,
          requiredVersion: "^3.5.13",
        },
      },
    }),
  ],
  optimization: {
    minimize: false,
  },
  externalsType: "commonjs",
});
