import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildPlugins(
    options: BuildOptions,
): webpack.WebpackPluginInstance[] {
    const { isDev, paths } = options;

    const plugins = [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            // Файл-шаблон
            template: paths.html,
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
    ];

    if (isDev) {
        // Моментальные изменения при разработке без перезагрузки страницы
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    return plugins;
}
