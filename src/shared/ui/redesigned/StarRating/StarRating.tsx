import { memo, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Icon as IconDeprecated } from "../../deprecated/Icon/Icon";
import classes from "./StarRating.module.scss";
import StarIcon from "../../../assets/icons/star.svg";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Icon } from "../Icon";

interface IStarRatingProps {
    className?: string;
    onSelect?: (starCount: number) => void;
    size: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const StarRating = memo(({ className, selectedStars, size, onSelect }: IStarRatingProps) => {
    const [highlightedStarsNumber, setHighlightedStarsNumber] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(!!selectedStars);
    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setHighlightedStarsNumber(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setHighlightedStarsNumber(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setHighlightedStarsNumber(starsCount);
            setIsSelected(true);
        }
    };

    const rootClassNames = classNames(
        toggleFeatures({
            name: "isAppRedesigned",
            on: () => classes.StarRatingRedesigned,
            off: () => classes.StarRating
        }),
        {},
        [className]
    );

    return (
        <div className={rootClassNames}>
            {stars.map((starNumber) => {
                const commonProps = {
                    Svg: StarIcon,
                    className: classNames(classes.starIcon, {
                        [classes.hovered]: Number(highlightedStarsNumber) >= starNumber,
                        [classes.selected]: isSelected
                    }),
                    "data-selected": Number(highlightedStarsNumber) >= starNumber,
                    "data-testid": `StarRating.${starNumber}`,
                    height: size,
                    key: starNumber,
                    onClick: onClick(starNumber),
                    onMouseEnter: onHover(starNumber),
                    onMouseLeave: onLeave,
                    width: size
                };
                return (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        key={starNumber}
                        off={<IconDeprecated {...commonProps} />}
                        on={
                            <Icon
                                {...commonProps}
                                btnClassName={classNames("", { [classes.selected]: isSelected })}
                                clickable
                            />
                        }
                    />
                );
            })}
        </div>
    );
});
