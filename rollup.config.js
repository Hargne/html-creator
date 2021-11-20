import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const externalLibraries = ["fs", "path", "lodash", "mkdirp", "prettier"];
const extensions = [".ts", ".js"];

const config = {
  input: "src/index.ts",
  output: [
    {
      dir: "dist",
      format: "cjs",
      exports: "default",
    },
  ],
  external: externalLibraries,
  plugins: [
    resolve({
      jsnext: true,
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: "bundled",
    }),
    terser(),
  ],
};

export default config;
