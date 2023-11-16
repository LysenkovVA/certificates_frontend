import { BuildOptions } from "../types/config";

interface BuildBabelLoaderProps extends BuildOptions {
    isTsx?: boolean;
}

export function buildBabelLoader({ isTsx, mode }: BuildBabelLoaderProps) {
    const isDev = mode === "development";
    const isProd = !isDev;
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                cacheDirectory: true,
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react",
                    "@babel/preset-typescript",
                ],
                plugins: [
                    [
                        "@babel/plugin-transform-typescript",
                        {
                            isTsx,
                        },
                    ],
                    "@babel/plugin-transform-runtime",
                    // isTsx &&
                    //     isProd && [
                    //         babelRemovePropsPlugin,
                    //         {
                    //             props: ["data-testid"],
                    //         },
                    //     ],

                    // isDev && require.resolve("react-refresh/babel"),
                ].filter(Boolean),
            },
        },
    };
}
