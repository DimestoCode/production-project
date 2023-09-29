import { useTranslation } from "react-i18next";
import useRatingCard from "../../../lib/hooks/useRatingCard";
import { IRatingCardProps } from "../../../model/types/IRating";
import { Input } from "@/shared/ui/redesigned/Input";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";
import { Card } from "@/shared/ui/redesigned/Card";
import { StarRating } from "@/shared/ui/redesigned/StarRating";
import { Drawer } from "@/shared/ui/redesigned/Drawer";
import { Modal } from "@/shared/ui/redesigned/Modal";
import { Button } from "@/shared/ui/redesigned/Button";

const RatingCardRedesigned = (props: IRatingCardProps) => {
    const { t } = useTranslation("common");
    const { feedback, handleAccept, handleCancel, isMobile, isOpen, onSelectStars, setFeedback, starsCount } =
        useRatingCard(props);
    const { feedbackTitle, title, className } = props;

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
        <Card border="partial" className={className} data-testid="RatingCard" padding="24" fullWidth>
            <VStack align="center" gap="8">
                <Text title={starsCount ? t("Thanks for your feedback") : title} />
                <StarRating onSelect={onSelectStars} selectedStars={starsCount} size={40} />

                {!isMobile ? (
                    <Modal isOpen={isOpen} onClose={handleCancel} lazy>
                        <VStack gap="16" maxWidth>
                            {modalContent}
                            <HStack gap="16" justify="end" maxWidth>
                                <Button data-testid="RatingCard.Close" onClick={handleCancel} variant="outlined">
                                    {t("Cancel")}
                                </Button>
                                <Button data-testid="RatingCard.Save" onClick={handleAccept} variant="outlined">
                                    {t("Submit")}
                                </Button>
                            </HStack>
                        </VStack>
                    </Modal>
                ) : (
                    <Drawer isOpen={isOpen} onClose={handleCancel}>
                        <VStack gap="32">
                            {modalContent}
                            <Button onClick={handleAccept} size="l" fullWidth>
                                {t("Submit")}
                            </Button>
                        </VStack>
                    </Drawer>
                )}
            </VStack>
        </Card>
    );
};

export default RatingCardRedesigned;
