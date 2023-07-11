import { IProduct } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'

interface ICart{
    products:IProduct[] ;
    total:number;
    //!cart is a collection of products
    
}

const initialState :ICart={
    products:[],
    total:0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action: PayloadAction<IProduct>) => {
      //! befor add to cart , we have to check that product is already exits on cart or not
      const existed = state.products.find(
        (produt) => produt._id === action.payload._id
      );

      //!Action theke payload er maddhome asa , product er id jodi cart a existed
      //!kono product er idr sathe match kore , tahole sudhu matro product er quantity
      //! increase kore dibo.. ar match na korle, oi product ke cart er product array te push korbo

      if (existed) {
        existed.quantity = existed.quantity! + 1; //! quantity er por what sign nirdes kore, ami sure aci ekhane undefined hobe na
       
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        //singlgle vabe product add korle, product add hobe and tar sathe quantity 1 set hobe
    
      }
    },
    

    removeOne: (state, action: PayloadAction<IProduct>) => {
      const product = state.products.find(
        (prod) => prod._id === action.payload._id
      );

      //!product jodi thake , r setir quantity 1 er besi hole , komate parbe
      if (product && product.quantity!>1) {
        product.quantity! -= 1;

      }else{
        //! minus korte korte 1 er kom hole product e remove hoye jabe
         state.products = state.products.filter(
           (prod) => prod._id !== action.payload._id
         );
      }
    },

    removeFromCart:(state,action:PayloadAction<IProduct>)=>{
        state.products = state.products.filter(prod=>prod._id !== action.payload._id);
    }
  },
});

export const { addtoCart, removeOne, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;