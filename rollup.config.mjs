import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript'; // Use this for TypeScript

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
  plugins: [typescript(), commonjs()],
};
