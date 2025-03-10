module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    ignores: [
        'node_modules/',
        'dist/',
        'build/',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json', // Adjust this if needed
    },
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    plugins: ['@typescript-eslint', 'prettier', 'node', 'promise'],
    rules: {
        'prettier/prettier': ['error'],
        'no-unused-vars': 'off', // Let TypeScript handle unused variables
        '@typescript-eslint/no-unused-vars': ['warn'],
        'node/no-unsupported-features/es-syntax': 'off', // Allow ES Modules
        'import/no-unresolved': 'error',
        'import/named': 'error',
        'import/default': 'error',
    },
};
