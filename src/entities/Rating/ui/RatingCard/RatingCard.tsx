import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Card } from "@/shared/ui/Card/Card";
import { Text } from "@/shared/ui/Text/Text";
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { Input } from "@/shared/ui/Input/Input";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { useDevice } from "@/shared/lib/hooks/useDevice/useDevice";
import { Drawer } from "@/shared/ui/Drawer/Drawer";

interface IRatingCardProps {
    className?: string;
    title: string;
    feedbackTitle: string;
    withFeedback: boolean;
    onCancel: (starsCount: number) => void;
    onAccept: (starsCound: number, feedback?: string) => void;
}

export const RatingCard = memo(
    ({ className, feedbackTitle, onAccept, onCancel, title, withFeedback }: IRatingCardProps) => {
        const [isOpen, setIsOpen] = useState(false);
        const isMobile = useDevice();
        const [starsCount, setStarsCount] = useState(0);
        const [feedback, setFeedback] = useState("");
        const { t } = useTranslation("common");

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

        const modalContent = (
            <>
                <Text title={feedbackTitle} />
                <Input onChange={setFeedback} placeholder={t("Your feedback")} value={feedback} />
            </>
        );

        return (
            <Card className={className}>
                <VStack align="center" gap="8">
                    <Text title={title} />
                    <StarRating onSelect={onSelectStars} size={40} />

                    {!isMobile ? (
                        <Modal isOpen={isOpen} onClose={handleCancel} lazy>
                            {modalContent}
                            <VStack gap="32" maxWidth>
                                <HStack gap="16" justify="end" maxWidth>
                                    <Button onClick={handleCancel} theme={ButtonTheme.OutlineRed}>
                                        {t("Cancel")}
                                    </Button>
                                    <Button onClick={handleAccept} theme={ButtonTheme.OutlineRed}>
                                        {t("Submit")}
                                    </Button>
                                </HStack>
                            </VStack>
                            {modalContent}
                        </Modal>
                    ) : (
                        <Drawer isOpen={isOpen} onClose={handleCancel}>
                            <VStack gap="32">
                                {modalContent}
                                <Button onClick={handleAccept} size={ButtonSize.L} fullWidth>
                                    {t("Submit")}
                                </Button>
                            </VStack>
                        </Drawer>
                    )}
                </VStack>
            </Card>
        );
    }
);
