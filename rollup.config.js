const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const url = require("@rollup/plugin-url");
const svgr = require("@svgr/rollup");
const terser = require("@rollup/plugin-terser");
const dts = require("rollup-plugin-dts");
const packageJson = require("./package.json");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

module.exports = [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.module,
        format: "cjs",
      },
      {
        file: packageJson.main,
        format: "esm",
      },
    ],
    external: ["react"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      postcss({
        extract: "index.css",
        modules: true,
        minimize: true,
      }),
      url(),
      svgr({ icon: true }),
      terser(),
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    external: [/\.(css)$/],
    plugins: [dts.default()],
  },
];
