import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import {BuildOptions} from "./types/config";

export function buildPlugins(options: BuildOptions):webpack.WebpackPluginInstance[] {
    const {paths} = options;

    return [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            // Файл-шаблон
            template: paths.html
        })
    ]
}
