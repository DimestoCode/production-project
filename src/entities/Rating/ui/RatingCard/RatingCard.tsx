import { memo } from "react";

import { IRatingCardProps } from "../../model/types/IRating";
import { ToggleFeatures } from "@/shared/lib/features";
import RatingCardDeprecated from "./deprecated/RatingCardDeprecated";
import RatingCardRedesigned from "./redesigned/RatingCardRedesigned";

export const RatingCard = memo((props: IRatingCardProps) => {
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={<RatingCardDeprecated {...props} />}
            on={<RatingCardRedesigned {...props} />}
        />
    );
});
