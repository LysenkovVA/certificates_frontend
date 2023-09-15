module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["standard-with-typescript", "plugin:react/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            excludedFiles: [],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    ignorePatterns: ["./node_modules/"],
    plugins: ["react"],
    rules: {
        "@definitelytyped/no-self-import": "off",
        quotes: "off",
        "@typescript-eslint/quotes": ["error", "double"],
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/indent": ["warn", 4],
        indent: ["warn", 4],
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/consistent-indexed-object-style": "off",
    },
    globals: {
        __IS_DEV__: true,
    },
};
