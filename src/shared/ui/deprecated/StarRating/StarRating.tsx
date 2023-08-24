import { memo, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Icon } from "../Icon/Icon";
import classes from "./StarRating.module.scss";
import StarIcon from "../../../assets/icons/star.svg";

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

    return (
        <div className={classNames(classes.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    Svg={StarIcon}
                    className={classNames(classes.starIcon, {
                        [classes.hovered]: Number(highlightedStarsNumber) >= starNumber,
                        [classes.selected]: isSelected
                    })}
                    data-selected={Number(highlightedStarsNumber) >= starNumber}
                    data-testid={`StarRating.${starNumber}`}
                    height={size}
                    key={starNumber}
                    onClick={onClick(starNumber)}
                    onMouseEnter={onHover(starNumber)}
                    onMouseLeave={onLeave}
                    width={size}
                />
            ))}
        </div>
    );
});
