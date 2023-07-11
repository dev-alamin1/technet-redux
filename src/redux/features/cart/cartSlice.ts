import { IProduct } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'

interface ICart {
  products: IProduct[];
  totalPrice: number;
  //!cart is a collection of products
}

const initialState :ICart={
    products:[],
    totalPrice:0
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

        state.totalPrice += existed.price; //total price er sathe existed product er price jog hobe

      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        //singlgle vabe product add korle, product add hobe and tar sathe quantity 1 set hobe
          state.totalPrice += action.payload.price // payload theke pawa product er price jog hobe , total price er sathe 
      }
    },
    

    removeOne: (state, action: PayloadAction<IProduct>) => {
      const product = state.products.find(
        (prod) => prod._id === action.payload._id
      );

      //!product jodi thake , r setir quantity 1 er besi hole , komate parbe
      if (product && product.quantity!>1) {
        product.quantity! -= 1;

        state.totalPrice -= product.price;

      }else{
        //! minus korte korte 1 er kom hole product e remove hoye jabe
         state.products = state.products.filter(
           (prod) => prod._id !== action.payload._id
         );

         state.totalPrice -= action.payload.price * action.payload.quantity!;
      }
    },

    removeFromCart:(state,action:PayloadAction<IProduct>)=>{
      state.products = state.products.filter(
        (prod) => prod._id !== action.payload._id
      );

      //jokhon product akbarei remove kora hobe , tokhon sudhu setir price bad dile
      // aktir price kome jabe . but amra je product ti remove korbo, tar quantiy onusare
      // price gun hobe .. then sei price totalPrice theke kome jabe
      //!state.totalPrice -= action.payload.price ---- evabe kora jabe na 

      state.totalPrice -= action.payload.price * action.payload.quantity!;
    }
  },
});

export const { addtoCart, removeOne, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;