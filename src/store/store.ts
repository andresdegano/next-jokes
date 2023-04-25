import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { generalSlice } from "./generalSlice";
import { createWrapper } from "next-redux-wrapper";
import type {} from 'redux-thunk/extend-redux'

const makeStore = () =>
  configureStore({
    reducer: {
      [generalSlice.name]: generalSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
