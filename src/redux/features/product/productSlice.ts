import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProduct{
    status:boolean;
    priceRange:number;
}

const initialState:IProduct ={
    status:true,
    priceRange:150
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        toggle:(state)=>{
            state.status = !state.status
        },
        priceRangeSlide:(state,action:PayloadAction<number>)=>{
            state.priceRange = action.payload;
        }
    }
})

export const { toggle, priceRangeSlide } = productSlice.actions;

export default productSlice.reducer;