import { configureStore } from "@reduxjs/toolkit";

import { productReducer } from "./reducers/productReducer";
import { notificationReducer } from "./reducers/notificationReducer";
import { cartReducer } from "./reducers/cartReducer";

export const store = configureStore({
    reducer:{productReducer, notificationReducer, cartReducer}
})