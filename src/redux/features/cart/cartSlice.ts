import { IProduct } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";

interface ICart{
    products:IProduct[] //cart is collection of products
}

const initialState :ICart={
    products:[]
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{

    }

})


export default cartSlice.reducer;