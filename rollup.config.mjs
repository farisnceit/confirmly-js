
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';


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
    plugins: [
        babel({
            babelHelpers: 'bundled',
            presets: [
                '@babel/preset-env', // Transpile to ES5/ES6 as needed
                '@babel/preset-typescript', // Handle TypeScript files
            ],
            extensions: ['.js', '.ts'], // Include .ts files for transpilation
        }),
    ],
    external: ['@popperjs/core'], // External dependency that shouldn't be bundled
};