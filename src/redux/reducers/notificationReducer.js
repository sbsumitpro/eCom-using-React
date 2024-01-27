import { createSlice } from "@reduxjs/toolkit";
import { actions } from "./productReducer";

const initialState ={
    message : ""
}

const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{
        reset:(state,action)=>{
            state.message = ""
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(actions.add,(state,action)=>{
            state.message ="Product has been added successfully";
        })
        .addCase(actions.delete,(state,action)=>{
            state.message ="Product has been deleted successfully";
        })
        .addCase(actions.update,(state,action)=>{
            state.message ="Product infomation has been updated successfully";
        })
    }
})

export const notificationReducer = notificationSlice.reducer;
export const resetNotification = notificationSlice.actions.reset;

export const notificationSelector = (state)=>state.notificationReducer.message;