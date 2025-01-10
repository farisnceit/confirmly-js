import typescript from 'rollup-plugin-typescript2';
import { terser } from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default {
    input: 'src/confirmlyPopup.ts',
    output: [
        // UMD build (used for CDN)
        {
            file: 'dist/confirmly-popup.umd.js',
            format: 'umd',
            name: 'confirmlyPopup',
            globals: {
                '@popperjs/core': 'Popper',
            },
            sourcemap: true,
            plugins: isProduction ? [terser()] : [],
        },

        // ESM build (used for npm packages)
        {
            file: 'dist/confirmly-popup.esm.js',
            format: 'esm',
            sourcemap: true,
            plugins: isProduction ? [terser()] : [],
        },

        // CommonJS build (also for npm but more compatible with older systems)
        {
            file: 'dist/confirmly-popup.cjs.js',
            format: 'cjs',
            sourcemap: true,
            plugins: isProduction ? [terser()] : [],
        },
    ],
    plugins: [
        typescript({
            useTsconfigDeclarationDir: true,
        }),
    ],
    external: ['@popperjs/core'], // External dependency that shouldn't be bundled
};