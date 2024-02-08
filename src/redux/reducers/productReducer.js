import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products : []
}

export const getInitialState = createAsyncThunk("product/getInitialState",
    async(_, thunkAPI)=>{
        try{
            const res = await axios.get("https://my-json-server.typicode.com/sbsumitpro/ecom_react_json_data/products");
            // console.log(res.data)
            thunkAPI.dispatch(actions.setInitialState(res.data))
        }
        catch(err){
            console.log("error:", err)
        }

    }
)

const productSlice = createSlice({
    name:"product",
    initialState: initialState,
    reducers:{
        setInitialState:(state, action)=>{
            state.products = [...action.payload];
        },
        add : (state,action)=>{
            // console.log("inside action----> ",action.payload)
            const {name, price, rating, desc:description} = action.payload;
            state.products.push({
                id:state.products.length+1,
                name:name,
                description:description,
                category:"NA",
                price:price,
                rating:rating,
                imgUrl:"https://cdn-icons-png.flaticon.com/128/1312/1312091.png"
            })
        },
        update:(state,action)=>{
            const {name, price, description}=action.payload
            // console.log("inside action----> ",action.payload)
            let prod = state.products.find((product,i)=>product.id===action.payload.productID)
            prod.name = name;
            prod.price = price;
            prod.description = description;
            state.products = [...state.products]
        },
        delete:(state, action)=>{
            let new_prods = state.products.filter((product,ind)=>product.id!==action.payload)
            state.products = [...new_prods]
        },
        sort:(state, action)=>{
            state.products.sort((a,b)=>a.price-b.price)
            // console.log("--->>",state.products)
            // state.products = [...products]
        }
    }
})

export const productReducer = productSlice.reducer;
export const actions = productSlice.actions;

export const productSelector = (state)=>state.productReducer.products