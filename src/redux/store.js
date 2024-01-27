import { configureStore } from "@reduxjs/toolkit";

import { productReducer } from "./reducers/productReducer";
import { notificationReducer } from "./reducers/notificationReducer";

export const store = configureStore({
    reducer:{productReducer, notificationReducer}
})