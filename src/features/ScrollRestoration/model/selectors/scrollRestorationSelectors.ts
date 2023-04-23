import { createSelector } from "@reduxjs/toolkit";
import { IStoreState } from "app/providers/StoreProvider";

export const getScroll = (state: IStoreState) => state.scroll;

export const getScrollByPath = createSelector(
    getScroll,
    (_: IStoreState, path: string) => path,
    (scroll, path) => scroll[path] || 0
);
