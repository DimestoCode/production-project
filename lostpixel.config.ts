import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
    storybookShots: {
        storybookUrl: "./storybook-static"
    },
    generateOnly: true,
    failOnDifference: true,
    lostPixelProjectId: "cletzyeu6000hmi0ew4pv1cbn",
    apiKey: process.env.LOST_PIXEL_API_KEY
};
