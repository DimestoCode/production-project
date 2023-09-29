import { useTranslation } from "react-i18next";
import { Button, ButtonTheme, ButtonSize } from "@/shared/ui/deprecated/Button";
import { Card } from "@/shared/ui/deprecated/Card";
import { StarRating } from "@/shared/ui/redesigned/StarRating";
import { Drawer } from "@/shared/ui/redesigned/Drawer";
import { Modal } from "@/shared/ui/redesigned/Modal";
import { VStack, HStack } from "@/shared/ui/redesigned/Stack";
import useRatingCard from "../../../lib/hooks/useRatingCard";
import { IRatingCardProps } from "../../../model/types/IRating";
import { Text } from "@/shared/ui/deprecated/Text";
import { Input } from "@/shared/ui/deprecated/Input";

const RatingCardDeprecated = (props: IRatingCardProps) => {
    const { t } = useTranslation("common");

    const { handleAccept, handleCancel, isMobile, isOpen, onSelectStars, setFeedback, feedback, starsCount } =
        useRatingCard(props);

    const { feedbackTitle, className, title } = props;

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
};

export default RatingCardDeprecated;
