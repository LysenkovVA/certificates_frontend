import {ResolveOptions} from "webpack";

export function buildResolvers():ResolveOptions {
    return {
        // Расширения, которые не добавляются при импорте
        extensions: ['.tsx', '.ts', '.js'],
    };
}
