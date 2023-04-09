import { IStoreState } from "app/providers/StoreProvider";

export const getAddCommentFormText = (state: IStoreState) => state.addCommentForm?.text || "";
export const getAddCommentFormError = (state: IStoreState) => state.addCommentForm?.error;
