import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    IDynamicLoaderProps,
    useDynamicModuleLoader
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { HStack } from "@/shared/ui/Stack";
import { addCommentFormActions, addCommentFormReducer } from "../../model/slices/addCommentFormSlice";
import { getAddCommentFormText } from "../../model/selectors/addCommentFormSelectors";
import classes from "./AddCommentForm.module.scss";

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
    const dispatch = useAppDispatch();
    const comment = useSelector(getAddCommentFormText);

    const onCommentChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch]
    );

    const handleCommentSubmit = useCallback(() => {
        onCommentSubmit(comment ?? "");
        onCommentChange("");
    }, [onCommentSubmit, comment, onCommentChange]);

    return (
        <HStack
            align="center"
            className={classNames(classes.AddCommentForm, {}, [className])}
            justify="between"
            maxWidth
        >
            <Input
                className={classes.input}
                onChange={onCommentChange}
                placeholder={t("Type comment")}
                value={comment}
            />
            <Button onClick={handleCommentSubmit}>{t("Submit")}</Button>
        </HStack>
    );
});
