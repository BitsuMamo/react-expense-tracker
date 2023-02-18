import { Store, configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./features/transaction/transactionSlice";


export const store: Store = configureStore({
    reducer: {
        transaction: transactionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
