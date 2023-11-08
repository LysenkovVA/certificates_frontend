import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/config";

export function buildWebpackConfig(
    options: BuildOptions,
): webpack.Configuration {
    const { mode, paths, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        module: {
            strictExportPresence: true,
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        output: {
            // Кешируем изменения
            filename: "[name].[contenthash].js",
            path: paths.build,
            // Подчищаем старые файлы на выходе
            clean: true,
            // Чтобы не грузились в качестве пути всевозможные
            // чанки и прочая хрень
            publicPath: "/",
        },
        devtool: isDev ? "inline-source-map" : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
        plugins: buildPlugins(options),
    };
}
