import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/confirmlyPopup.ts',
  output: [
    // UMD build (used for CDN)
    {
      file: 'dist/confirmly-popup.umd.js',
      format: 'iife',
      name: 'confirmly',
      globals: {
        '@popperjs/core': 'Popper',
      },
      sourcemap: true,
      plugins: [],
    },
    {
      file: 'dist/confirmly-popup.umd.min.js',
      format: 'iife',
      name: 'confirmly',
      globals: {
        '@popperjs/core': 'Popper',
      },
      sourcemap: true,
      plugins: [terser()],
    },

    // ESM build (used for npm packages)
    {
      file: 'dist/confirmly-popup.esm.js',
      format: 'es',
      sourcemap: true,
      plugins: [],
    },
    {
      file: 'dist/confirmly-popup.esm.min.js',
      format: 'es',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  external: ['@popperjs/core'], // External dependency that shouldn't be bundled
  plugins: [
    eslint({
      fix: true,
      overrideConfigFile: './eslint.config.cjs',
    }),
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env', // Transpile to ES5/ES6 as needed
        '@babel/preset-typescript', // Handle TypeScript files
      ],
    }),
    commonjs(),
  ],
};
