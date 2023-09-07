import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const typeScriptLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    const sassLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // В режиме разработки не будем генерить отдельно файлы со стилями
            options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: "css-loader",
                options: {
                    // Включаем изоляцию модулей для CSS стилей
                    modules: {
                        // Работаем только с файлами в имени которых есть ".modules."
                        auto: (resPath: string) =>
                            Boolean(resPath.includes(".modules.")),
                        // Имена стилей для разных режимов сборки:
                        // Dev - понятное имя
                        // Prod - Хеш
                        localIdentName: options.isDev
                            ? "[path][name]__[local]-[hase:base64:5]"
                            : "[hase:base64:8]",
                    },
                },
            },
            // Compiles Sass to CSS
            "sass-loader",
        ],
    };

    return [typeScriptLoader, sassLoader];
}
