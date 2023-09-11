import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        // Расширения, которые не добавляются при импорте
        extensions: [".tsx", ".ts", ".js"],
        preferAbsolute: true,
        modules: [options.paths.src, "node_modules"],
        // Главный файл для модуля
        mainFiles: ["index"],
        alias: { "@": options.paths.src },
    };
}
