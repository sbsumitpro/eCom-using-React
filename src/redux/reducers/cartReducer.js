import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    cart:[]
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        add:(state, action)=>{
            const {id, name, price, qty, imgUrl,category} = action.payload
            console.log("inside cart reducer::", action.payload)
            state.cart.push({
                id:id,
                name:name,
                price:price,
                imgUrl:imgUrl,
                qty:1,
                category:category
            })
        },
        delete:(state, action)=>{
            let new_cart = state.cart.filter(item=>item.id !== action.payload)
            state.cart = [...new_cart];
        },
        increaseCount:(state,action)=>{
            console.log("increase inside reducer",action)

            let new_cart = state.cart.map((item)=>{
                if(item.id===action.payload){
                    item.qty++
                }
                return item
            })
            state.cart = [...new_cart]
        },
        decreaseCount:(state,action)=>{
            let new_cart = state.cart.map((item)=>{
                if(item.id===action.payload && item.qty>1 ){
                    item.qty--
                }
                return item
            })
            state.cart = [...new_cart]
        }
    }
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

export const cartSelector = (state)=>state.cartReducer.cart;