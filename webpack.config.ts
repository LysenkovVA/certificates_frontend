import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack"; //to access built-in plugins

const config: webpack.Configuration = {
    mode: "development",
    entry: path.resolve(__dirname, 'src', "index.ts"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        // Расширения, которые не добавляются при импорте
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        // Кешируем изменения
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        // Подчищаем старые файлы на выходе
        clean: true
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            // Файл-шаблон
            template: path.resolve(__dirname, "public", "index.html")
        })
    ]
};

export default config;
