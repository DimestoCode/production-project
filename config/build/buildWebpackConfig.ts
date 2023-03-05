import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { IBuildOptions } from "./types/config";

export function buildWebpackConfig(options: IBuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        target: "web",
        mode,
        entry: paths.entry,
        output: {
            filename: "[name].[contenthash:8].js",
            path: paths.build,
            clean: true
        },
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: isDev ? "inline-source-map" : undefined,
        devServer: isDev ? buildDevServer(options) : undefined
    };
}
