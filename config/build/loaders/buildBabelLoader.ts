import babelRemovePropsPlugin from "../../babel/babelRemovePropsPlugin";
import { IBuildOptions } from "../types/config";

interface IBuildBabelLoaderProps extends IBuildOptions {
    isTsx?: boolean;
}

export const buildBabelLoader = ({ isDev, isTsx }: IBuildBabelLoaderProps) => {
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [["@babel/preset-env", { targets: "defaults" }]],
                plugins: [
                    ["@babel/plugin-transform-runtime"],
                    [
                        "@babel/plugin-transform-typescript",
                        {
                            isTsx
                        }
                    ],
                    isTsx && [babelRemovePropsPlugin, { props: ["data-testid"] }],
                    isDev && require.resolve("react-refresh/babel")
                ].filter(Boolean)
            }
        }
    };
};
