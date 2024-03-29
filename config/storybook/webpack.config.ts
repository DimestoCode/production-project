/* eslint-disable no-param-reassign */
import path from "path";
import webpack, { RuleSetRule } from "webpack";
import { buildCssLoaders } from "../build/loaders/buildCssLoaders";
import { IBuildPaths } from "../build/types/config";

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: IBuildPaths = {
        build: "",
        html: "",
        entry: "",
        src: path.resolve(__dirname, "..", "..", "src"),
        locales: path.resolve(__dirname, "public", "locales"),
        buildLocales: path.resolve(__dirname, "build", "locales")
    };
    config.resolve?.modules?.splice(0, config.resolve?.modules?.length);
    config.resolve?.modules?.push(paths.src, "node_modules");
    config.resolve?.extensions?.push(".ts", ".tsx");
    if (config.module?.rules) {
        config.module.rules = (config.module.rules as RuleSetRule[]).map((rule: RuleSetRule) => {
            if (/svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i } as RuleSetRule;
            }

            return rule;
        });
    }

    config.module?.rules?.push({
        test: /\.svg$/i,
        use: ["@svgr/webpack"]
    });
    config.module?.rules?.push(buildCssLoaders(true));
    config.resolve = {
        ...config.resolve,
        extensions: [".tsx", ".ts", ".js"],
        preferAbsolute: true,
        modules: [paths.src, "node_modules"],
        alias: {
            "@": paths.src
        },
        mainFiles: ["index"]
    };
    const isDev = config.mode === "development";
    config.plugins?.push(
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify("http://localhost:6006"),
            __PROJECT__: JSON.stringify("storybook")
        })
    );

    return config;
};
