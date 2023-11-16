import ReactRefreshTypeScript from "react-refresh-typescript";
import webpack from "webpack";
import { buildSassLoader } from "./loaders/buildSassLoader";
import { BuildOptions } from "./types/config";

export function buildLoaders(
    options: BuildOptions,
): webpack.ModuleOptions["rules"] {
    const isDev = options.mode === "development";

    // const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    // const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    // Лоадер для SVG
    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: "@svgr/webpack",
                options: {
                    icon: true, // Позволяет работать как с иконками (например, менять размеры)
                    // Чтобы работать с изменением цветов иконки
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
        // SVG тут не обрабатывать!
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    };

    // Лоадер для scss
    const sassLoader = buildSassLoader(isDev);

    // Лоадер для TS
    // const typeScriptLoader = {
    //     test: /\.tsx?$/,
    //     use: "ts-loader",
    //     exclude: /node_modules/,
    // };
    const typeScriptLoader = {
        test: /\.tsx?$/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    // Опция для HMR, чтобы не обновлялась страница
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(
                            Boolean,
                        ),
                    }),
                    transpileOnly: isDev, // ускорение сборки
                },
            },
        ],
        exclude: /node_modules/,
    };

    /**
     * ВНИМАНИЕ! ПОРЯДОК ЛОАДЕРОВ ВАЖЕН!
     * Идем по цепочке снизу вверх
     */
    return [
        svgLoader,
        fileLoader,
        sassLoader,
        // codeBabelLoader,
        // tsxCodeBabelLoader,
        typeScriptLoader,
    ];
}
