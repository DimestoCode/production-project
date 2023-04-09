module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:i18next/recommended",
        "plugin:prettier/recommended",
        "prettier"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react", "@typescript-eslint", "i18next", "react-hooks", "prettier"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                singleQuote: false,
                parser: "typescript",
                semi: true,
                trailingComma: "none",
                tabWidth: 4,
                printWidth: 120
            }
        ],
        quotes: ["error", "double", { avoidEscape: true }],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        indent: "off",
        "@typescript-eslint/indent": ["error"],
        "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".tsx"] }],
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "react/require-default-props": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "warn",
        "react/function-component-definition": "off",
        "no-shadow": "off",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": "off",
        "no-underscore-dangle": "off",
        "linebreak-style": ["error", "unix"],
        "comma-dangle": "off",
        "max-len": [
            2,
            {
                code: 150,
                ignorePattern: "import",
                ignoreComments: true
            }
        ],
        "i18next/no-literal-string": [
            "error",
            {
                markupOnly: true,
                ignoreAttribute: ["data-testid", "to", "fallback", "align", "name"]
            }
        ],
        "object-curly-newline": "off",
        "react/jsx-sort-props": [
            "error",
            {
                shorthandLast: true
            }
        ],
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "implicit-arrow-linebreak": "off",
        "react/jsx-one-expression-per-line": "off",
        "no-param-reassign": [
            "error",
            {
                props: true,
                ignorePropertyModificationsFor: ["state"]
            }
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "no-undef": "off",
        "comma-spacing": "off",
        "@typescript-eslint/comma-spacing": "error"
    },
    overrides: [
        {
            files: ["**/*.{test,stories}.{ts,tsx}"],
            rules: {
                "i18next/no-literal-string": "off"
            }
        }
    ],
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true
    }
};
