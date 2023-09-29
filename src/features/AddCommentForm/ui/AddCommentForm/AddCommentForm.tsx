import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Button as ButtonDeprecated } from "@/shared/ui/deprecated/Button";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { addCommentFormReducer, useAddCommentFormActions } from "../../model/slices/addCommentFormSlice";
import { useAddCommentFormText } from "../../model/selectors/addCommentFormSelectors";
import classes from "./AddCommentForm.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Input } from "@/shared/ui/redesigned/Input";
import { Button } from "@/shared/ui/redesigned/Button";
import { Card } from "@/shared/ui/redesigned/Card";

interface IAddCommentFormProps {
    className?: string;
    onCommentSubmit: (comment: string) => void;
}

const dynamicModules: IDynamicLoaderProps = {
    reducers: {
        addCommentForm: addCommentFormReducer
    }
};

export const AddCommentForm = memo(({ className, onCommentSubmit }: IAddCommentFormProps) => {
    useDynamicModuleLoader(dynamicModules);
    const { t } = useTranslation("common");
    const comment = useAddCommentFormText();
    const { setText } = useAddCommentFormActions();

    const onCommentChange = useCallback(
        (value: string) => {
            setText(value);
        },
        [setText]
    );

    const handleCommentSubmit = useCallback(() => {
        onCommentSubmit(comment ?? "");
        onCommentChange("");
    }, [onCommentSubmit, comment, onCommentChange]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <HStack
                    align="center"
                    className={classNames(classes.AddCommentForm, {}, [className])}
                    data-testid="AddCommentForm"
                    justify="between"
                    maxWidth
                >
                    <InputDeprecated
                        className={classes.input}
                        data-testid="AddCommentForm.Input"
                        onChange={onCommentChange}
                        placeholder={t("Type comment")}
                        value={comment}
                    />
                    <ButtonDeprecated data-testid="AddCommentForm.Button" onClick={handleCommentSubmit}>
                        {t("Submit")}
                    </ButtonDeprecated>
                </HStack>
            }
            on={
                <Card border="round" padding="24" fullWidth>
                    <HStack
                        align="center"
                        className={classNames(classes.AddCommentFormRedesigned, {}, [className])}
                        data-testid="AddCommentForm"
                        gap="16"
                        justify="between"
                        maxWidth
                    >
                        <Input
                            className={classes.input}
                            data-testid="AddCommentForm.Input"
                            onChange={onCommentChange}
                            placeholder={t("Type comment")}
                            value={comment}
                        />
                        <Button data-testid="AddCommentForm.Button" onClick={handleCommentSubmit}>
                            {t("Submit")}
                        </Button>
                    </HStack>
                </Card>
            }
        />
        // <HStack
        //     align="center"
        //     className={classNames(classes.AddCommentForm, {}, [className])}
        //     data-testid="AddCommentForm"
        //     justify="between"
        //     maxWidth
        // >
        //     <ToggleFeatures
        //         feature="isAppRedesigned"
        //         off={
        //             <HStack
        //     align="center"
        //     className={classNames(classes.AddCommentForm, {}, [className])}
        //     data-testid="AddCommentForm"
        //     justify="between"
        //     maxWidth
        // >
        //                 <InputDeprecated
        //                     className={classes.input}
        //                     data-testid="AddCommentForm.Input"
        //                     onChange={onCommentChange}
        //                     placeholder={t("Type comment")}
        //                     value={comment}
        //                 />
        //                 <ButtonDeprecated data-testid="AddCommentForm.Button" onClick={handleCommentSubmit}>
        //                     {t("Submit")}
        //                 </ButtonDeprecated>
        //             <HStack />
        //         }
        //         on={
        //             <HStack>
        //                 <Input
        //                     className={classes.input}
        //                     data-testid="AddCommentForm.Input"
        //                     onChange={onCommentChange}
        //                     placeholder={t("Type comment")}
        //                     value={comment}
        //                 />
        //                 <Button data-testid="AddCommentForm.Button" onClick={handleCommentSubmit}>
        //                     {t("Submit")}
        //                 </Button>
        //             </HStack>
        //         }
        //     />
        // </HStack>
    );
});
