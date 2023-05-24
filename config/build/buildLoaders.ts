import webpack from "webpack";
import { buildBabelLoader } from "./loaders/buildBabelLoader";
import { buildCssLoaders } from "./loaders/buildCssLoaders";
import { IBuildOptions } from "./types/config";

export function buildLoaders(options: IBuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const svgLoader = {
        test: /\.svg$/i,
        use: ["@svgr/webpack"]
    };

    // const tsLoader = {
    //     test: /\.tsx?$/,
    //     use: [
    //         {
    //             loader: "ts-loader",
    //             options: {
    //                 transpileOnly: true
    //             }
    //         }
    //     ],
    //     exclude: /node_modules/
    // };

    const tsBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const cssLoader = buildCssLoaders(isDev);

    const fileLoader = {
        test: /\.(png|jpe?g|gif)/,
        type: "asset/resource"
    };

    return [fileLoader, svgLoader, tsxBabelLoader, tsBabelLoader, cssLoader];
}
