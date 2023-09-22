import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
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

    // Лоадер для TS
    const typeScriptLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    // Лоадер для scss
    const sassLoader = {
        // test: /\.s[ac]ss$/i, // было
        test: /\.(sc|sa|c)ss$/,
        use: [
            // В режиме разработки не будем генерить отдельно файлы со стилями
            options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: "css-loader",
                options: {
                    esModule: true,
                    // Включаем изоляцию модулей для CSS стилей
                    modules: {
                        auto: (resPath: string) =>
                            Boolean(resPath.includes(".module.")),
                        // auto: true,
                        // Имена стилей для разных режимов сборки:
                        // Dev - понятное имя
                        // Prod - Хеш
                        localIdentName: options.isDev
                            ? "[path][name]-[hase:base64:5]"
                            : "[hase:base64:8]",
                    },
                },
            },
            // Compiles Sass to CSS
            "sass-loader",
        ],
    };

    // const dxCssLoader = {
    //     test: /\.css$/,
    //     use: [{ loader: "style-loader" }, { loader: "css-loader" }],
    // };

    return [svgLoader, fileLoader, typeScriptLoader, sassLoader];
}
