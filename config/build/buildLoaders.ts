import webpack from "webpack";
import { buildBabelLoader } from "./loaders/buildBabelLoader";
import { buildCssLoader } from "./loaders/buildCssLoader";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    // Лоадер для SVG
    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: "@svgr/webpack",
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: "convertColors",
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };

    // Лоадер для файлов
    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    };

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    // Лоадер для TS
    const typeScriptLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    // Лоадер для scss
    const sassLoader = buildCssLoader(options.isDev);

    return [
        svgLoader,
        fileLoader,
        sassLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        typeScriptLoader,
    ];
}
