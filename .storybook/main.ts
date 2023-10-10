import type { StorybookConfig } from "@storybook/react-webpack5";
import { Configuration, DefinePlugin, RuleSetRule } from "webpack";
import { buildCssLoader } from "../config/build/loaders/buildCssLoader";
import path = require("path");

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        //"storybook-css-modules",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    // Конфигурируем все пути
    webpackFinal: async (config: Configuration) => {
        const paths = {
            src: path.resolve(__dirname, "..", "src"),
        };
        config!.resolve!.modules!.push(paths.src);
        config!.resolve!.extensions!.push(".ts", ".tsx");
        config!.resolve!.alias = {
            ...config!.resolve!.alias,
            "@": paths.src,
        };

        config!.module!.rules = config!.module!.rules!.map(
            // @ts-ignore
            (rule: RuleSetRule) => {
                if (/svg/.test(rule.test as string)) {
                    return { ...rule, exclude: /\.svg$/i };
                }

                return rule;
            },
        );

        config!.module!.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        config!.module!.rules.push(buildCssLoader(true));

        config!.plugins!.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                // __API__: JSON.stringify("https://testapi.ru"),
                // __PROJECT__: JSON.stringify("storybook"),
            }),
        );
        // Return the altered config
        return config;
    },
};
export default config;
