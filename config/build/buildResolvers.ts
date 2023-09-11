import path from "path";
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
        alias: {
            globalize$: path.resolve(
                options.paths.node_modules,
                "globalize/dist/globalize.js",
            ),
            globalize: path.resolve(
                options.paths.node_modules,
                "globalize/dist/globalize",
            ),
            cldr$: path.resolve(
                options.paths.node_modules,
                "cldrjs/dist/cldr.js",
            ),
            cldr: path.resolve(options.paths.node_modules, "cldrjs/dist/cldr"),
            "@": options.paths.src,
        },
    };
}
