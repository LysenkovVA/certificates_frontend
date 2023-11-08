export type BuildMode = "development" | "production";

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    node_modules: string;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
    // Переменная для настройки конкретной среды
    project_env: "frontend" | "storybook" | "jest";
}
