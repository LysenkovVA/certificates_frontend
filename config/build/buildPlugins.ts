import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildPlugins(
    options: BuildOptions,
): webpack.WebpackPluginInstance[] {
    const { isDev, paths, apiUrl } = options;

    const plugins = [
        // Показываем прогресс сборки
        new webpack.ProgressPlugin(),
        // Создание бандла HTML
        new HtmlWebpackPlugin({
            // Файл-шаблон
            template: paths.html,
        }),
        // Генерим отдельно CSS для каждого JS файла
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }),
        // Определяем глобальные константы
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
        }),
    ];

    // Анализ бандла
    // plugins.push(
    //     new BundleAnalyzerPlugin({
    //         openAnalyzer: false,
    //     }),
    // );

    // Плагины для режима разработки
    if (isDev) {
        // Моментальные изменения при разработке без перезагрузки страницы
        plugins.push(new webpack.HotModuleReplacementPlugin());

        // plugins.push(new ReactRefreshWebpackPlugin());
    }

    return plugins;
}
