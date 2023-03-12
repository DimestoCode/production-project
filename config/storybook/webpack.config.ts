import path from "path";
import webpack, { RuleSetRule } from "webpack";
import { buildCssLoaders } from "../build/loaders/buildCssLoaders";
import { IBuildPaths } from "../build/types/config";

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: IBuildPaths = {
        build: "",
        html: "",
        entry: "",
        src: path.resolve(__dirname, "..", "..", "src")
    };
    config.resolve.modules.splice(0, config.resolve.modules?.length);
    config.resolve?.modules?.push(paths.src, "node_modules");
    config.resolve?.extensions?.push(".ts", ".tsx");
    if (config.module?.rules) {
        // eslint-disable-next-line no-param-reassign
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
    const isDev = config.mode === "development";
    config.plugins.push(
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev)
        })
    );

    return config;
};
