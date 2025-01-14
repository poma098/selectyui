const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const url = require("@rollup/plugin-url");
const svgr = require("@svgr/rollup");
const terser = require("@rollup/plugin-terser");
const dts = require("rollup-plugin-dts");
const packageJson = require("./package.json");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
      },
      {
        file: packageJson.module,
        format: "esm",
      },
    ],
    external: ["react", "react-dom", "react-router-dom"],
    plugins: [
      json(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: true,
        // exclude: ["**/*.stories.tsx"],
      }),
      postcss({
        extract: "index.css",
        modules: true,
        // use: ["sass"],
        minimize: true,
      }),
      url(),
      svgr({ icon: true }),
      terser(),
    ],
    watch: {
      include: "src/**",
      clearScreen: false,
    },
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    external: [/\.(css|scss)$/],
    plugins: [dts.default()],
  },
];
