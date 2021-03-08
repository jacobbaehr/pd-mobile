module.exports = {
    root: true,
    env: {
        es6: true,
        'jest/globals': true,
    },
    extends: '@react-native-community/eslint-config',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        'react-native/no-inline-styles': 0,
        'prettier/prettier': 0,
        'eslint-comments/no-unlimited-disable': 0,
        'eslint-comments/no-unused-disable': 0,
        'object-curly-spacing': 0,
    },
};
