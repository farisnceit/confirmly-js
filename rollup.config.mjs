import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import sass from 'rollup-plugin-sass';
import { writeFileSync } from 'fs';
import * as sassLib from 'sass';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

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
    typescript(),
    commonjs(),
    sass({
      include: ['styles/**/*.scss'],
      output: 'styles/confirmly-popup.css',
      options: {
        outputStyle: 'expanded',
        sourceMap: true,
      },
      processor: (css) => {
        // writeFileSync('dist/confirmly-popup.css', css);

        // Use modern Sass API to compile compressed CSS
        try {
          const compressedCss = sassLib.compileString(css, {
            style: 'compressed',
          }).css;
          writeFileSync('styles/confirmly-popup.min.css', compressedCss);
        } catch (error) {
          console.error('Error compressing CSS:', error);
          // Fallback to uncompressed CSS if compression fails
          writeFileSync('dist/confirmly-popup.min.css', css);
        }

        return css;
      },
    }),
  ],
};
