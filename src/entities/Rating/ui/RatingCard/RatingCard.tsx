import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Card } from "@/shared/ui/deprecated/Card";
import { Text } from "@/shared/ui/deprecated/Text";
import { StarRating } from "@/shared/ui/deprecated/StarRating";
import { Input } from "@/shared/ui/deprecated/Input";
import { Modal } from "@/shared/ui/redesigned/Modal";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { useDevice } from "@/shared/lib/hooks/useDevice/useDevice";
import { Drawer } from "@/shared/ui/redesigned/Drawer";

interface IRatingCardProps {
    className?: string;
    title: string;
    feedbackTitle: string;
    withFeedback: boolean;
    onCancel: (starsCount: number) => void;
    onAccept: (starsCound: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo(
    ({ className, feedbackTitle, onAccept, onCancel, title, withFeedback, rate = 0 }: IRatingCardProps) => {
        const [isOpen, setIsOpen] = useState(false);
        const isMobile = useDevice();
        const [starsCount, setStarsCount] = useState(rate);
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
            <VStack gap="8" maxWidth>
                <Text title={feedbackTitle} />
                <Input
                    data-testid="RatingCard.Input"
                    onChange={setFeedback}
                    placeholder={t("Your feedback")}
                    value={feedback}
                />
            </VStack>
        );

        return (
            <Card className={className} data-testid="RatingCard" fullWidth>
                <VStack align="center" gap="8">
                    <Text title={starsCount ? t("Thanks for your feedback") : title} />
                    <StarRating onSelect={onSelectStars} selectedStars={starsCount} size={40} />

                    {!isMobile ? (
                        <Modal isOpen={isOpen} onClose={handleCancel} lazy>
                            {modalContent}
                            <VStack gap="32" maxWidth>
                                <HStack gap="16" justify="end" maxWidth>
                                    <Button
                                        data-testid="RatingCard.Close"
                                        onClick={handleCancel}
                                        theme={ButtonTheme.OutlineRed}
                                    >
                                        {t("Cancel")}
                                    </Button>
                                    <Button
                                        data-testid="RatingCard.Save"
                                        onClick={handleAccept}
                                        theme={ButtonTheme.Outline}
                                    >
                                        {t("Submit")}
                                    </Button>
                                </HStack>
                            </VStack>
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
