import { IStoreState } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store/buildSelector";

export const [useAddCommentFormText, getAddCommentFormText] = buildSelector(
    (state: IStoreState) => state.addCommentForm?.text ?? ""
);
export const [useAddCommentFormError, getAddCommentFormError] = buildSelector(
    (state: IStoreState) => state.addCommentForm?.error
);
