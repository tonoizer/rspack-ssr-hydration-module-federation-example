const { defineConfig } = require("@rspack/cli");
const { rspack } = require("@rspack/core");
const { VueLoaderPlugin } = require("vue-loader");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/rspack");
const path = require("node:path");

module.exports = defineConfig({
  target: "async-node",
  entry: {
    server: "./src/server.ts",
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist/server"),
    uniqueName: "rspack_ssr_hydration_remote_vue",
    publicPath: "http://localhost:3001/server/",
    library: { type: "commonjs-module" },
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
      name: "rspack_ssr_hydration_remote_vue",
      filename: "remoteEntry.js",
      manifest: true,
      exposes: {
        "./App": "./src/App.vue",
        "./AppComponent": "./src/components/AppComponent.vue",
      },
      runtimePlugins: [
        require.resolve("@module-federation/node/runtimePlugin"),
      ],
      shared: {
        vue: {
          eager: true,
          singleton: true,
          requiredVersion: "^3.5.13",
        },
      },
      library: { type: "commonjs-module" },
      remoteType: "script",
    }),
  ],
  optimization: {
    minimize: false,
  },
  externalsType: "commonjs",
});
