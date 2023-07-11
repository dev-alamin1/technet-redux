import {createSlice} from '@reduxjs/toolkit';

interface IProduct{
    status:boolean;
    priceRange:number;
}

const initialState:IProduct ={
    status:false,
    priceRange:150
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        toggle:(state)=>{
            state.status = !state.status
        }
    }
})

export const {toggle} = productSlice.actions;

export default productSlice.reducer;