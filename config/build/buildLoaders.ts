import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/i,
        use: ["@svgr/webpack"]
    };

    const tsLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
    };

    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [["@babel/preset-env", { targets: "defaults" }]],
                plugins: [["i18next-extract", { locales: ["en", "ua"], keyAsDefaultValue: true }]]
            }
        }
    };

    const cssLoader = {
        test: /\.s?[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) => !!resPath.includes(".module."),
                        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]"
                    }
                }
            },
            "sass-loader"
        ]
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif)/,
        type: "asset/resource"
    };

    return [fileLoader, svgLoader, babelLoader, tsLoader, cssLoader];
}
