import { IProduct } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'

interface ICart{
    products:IProduct[] 
    //!cart is a collection of products
    
}

const initialState :ICart={
    products:[]
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addtoCart :(state,action:PayloadAction<IProduct>)=>{
            state.products.push(action.payload)
        }
    }

})

export const {addtoCart} = cartSlice.actions
export default cartSlice.reducer;