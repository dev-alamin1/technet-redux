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
            //! befor add to cart , we have to check that product is already exits on cart or not
            const existed = state.products.find(produt=>produt._id === action.payload._id )
          
            //!Action theke payload er maddhome asa , product er id jodi cart a existed
            //!kono product er idr sathe match kore , tahole sudhu matro product er quantity 
            //! increase kore dibo.. ar match na korle, oi product ke cart er product array te push korbo

            if(existed){
                existed.quantity = existed.quantity! +1; //! quantity er por what sign nirdes kore, ami sure aci ekhane undefined hobe na
            }else{
                state.products.push({...action.payload, quantity:1})
                //singlgle vabe product add korle, product add hobe and tar sathe quantity 1 set hobe
            }

             
        }
    }

})

export const {addtoCart} = cartSlice.actions
export default cartSlice.reducer;