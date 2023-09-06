import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import {buildPlugins} from "./config/build/buildPlugins";
import {buildLoaders} from "./config/build/buildLoaders";
import {buildResolvers} from "./config/build/buildResolvers";
import {buildWebpackConfig} from "./config/build/buildWebpackConfig";
import {BuildPaths} from "./config/build/types/config"; //to access built-in plugins

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', "index.ts"),
    build: path.resolve(__dirname, 'dist'),
    html: path.resolve(__dirname, "public", "index.html")
}

const mode = "development";
const isDev = mode === "development";

const config: webpack.Configuration = buildWebpackConfig({
    mode: "development",
    paths,
    isDev
})

export default config;
