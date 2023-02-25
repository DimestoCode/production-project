import webpack from "webpack";
import { buildCssLoaders } from "./loaders/buildCssLoaders";
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
                presets: [["@babel/preset-env", { targets: "defaults" }]]
            }
        }
    };

    const cssLoader = buildCssLoaders(isDev);

    const fileLoader = {
        test: /\.(png|jpe?g|gif)/,
        type: "asset/resource"
    };

    return [fileLoader, svgLoader, babelLoader, tsLoader, cssLoader];
}
