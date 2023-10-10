import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildCssLoader(isDev: boolean) {
    return {
        test: /\.(sc|sa|c)ss$/,
        use: [
            // В режиме разработки не будем генерить отдельно файлы со стилями
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: "css-loader",
                options: {
                    esModule: true,
                    // Включаем изоляцию модулей для CSS стилей
                    modules: {
                        // auto: (resPath: string) =>
                        //     Boolean(resPath.includes(".module.")),
                        auto: true,
                        // Имена стилей для разных режимов сборки:
                        // Dev - понятное имя
                        // Prod - Хеш
                        localIdentName: isDev
                            ? "[path][name]-[hash:base64:5]"
                            : "[hash:base64:8]",
                    },
                },
            },
            // Compiles Sass to CSS
            "sass-loader",
        ],
    };
}
