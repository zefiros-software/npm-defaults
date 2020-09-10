module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: 'tsconfig.json',
    },
    reportUnusedDisableDirectives: true,
    plugins: ['@typescript-eslint', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
    ],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
            },
        ],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unused-vars-experimental': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/strict-boolean-expressions': [
            'error',
            {
                allowNullableBoolean: true,
            },
        ],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        'import/order': [
            'error',
            {
                groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'],
                'newlines-between': 'always',
                pathGroups: [
                    {
                        group: 'internal',
                        pattern: '~/**',
                    },
                ],
            },
        ],
        'max-classes-per-file': 'off',
        'prefer-template': 'error',

        ...(process.env.VSCODE_PID || process.env.FULL_LINT
            ? {
                  '@typescript-eslint/explicit-module-boundary-types': 'warn',
                  '@typescript-eslint/prefer-readonly-parameter-types': 'warn',
                  '@typescript-eslint/naming-convention': [
                      'warn',
                      { leadingUnderscore: 'allow', selector: 'property', format: ['camelCase'] },
                  ],
              }
            : {}),
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
        'import/external-module-folders': ['node_modules', 'typings'],
    },
}