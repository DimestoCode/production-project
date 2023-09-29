import { useState, useCallback } from "react";
import { useDevice } from "@/shared/lib/hooks/useDevice/useDevice";
import { IRatingCardProps } from "../../model/types/IRating";

const useRatingCard = ({ onAccept, onCancel, withFeedback, rate = 0 }: IRatingCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useDevice();
    const [starsCount, setStarsCount] = useState<number>(rate);
    const [feedback, setFeedback] = useState("");
    // const { t } = useTranslation("common");

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);

            if (withFeedback) {
                setIsOpen(true);
            } else {
                onAccept(selectedStarsCount);
            }
        },
        [onAccept, withFeedback]
    );

    const handleAccept = useCallback(() => {
        setIsOpen(false);
        onAccept(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const handleCancel = useCallback(() => {
        setIsOpen(false);
        onCancel(starsCount);
    }, [onCancel, starsCount]);

    return {
        handleAccept,
        handleCancel,
        isOpen,
        isMobile,
        onSelectStars,
        setFeedback,
        feedback,
        starsCount
    };
};

export default useRatingCard;
