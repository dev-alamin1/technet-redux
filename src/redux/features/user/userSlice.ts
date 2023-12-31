import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { app } from "@/lib/firebase.config";
import type { PayloadAction } from "@reduxjs/toolkit";

const auth = getAuth(app)

interface ICredential{
    email:string;
    password:string
}

interface IUserState {
    user:{
        email:string|null;
    },
    isLoading:boolean;
    isError:boolean;
    error:string|null
}

const initialState:IUserState ={
    user:{
        email:null
    },
    isLoading:false,
    isError:false,
    error:null

}

export const createUser = createAsyncThunk(
    'user/create-user',
    async({email,password}:ICredential)=>{
            const data = await createUserWithEmailAndPassword(auth,email,password);
            return data.user.email;
    }
)

export const loginUser = createAsyncThunk(
  'user/login-user',
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user.email = action.payload; // payload a email ache , karon thunk function theke
      // email return kora ache
      state.isLoading = false;
    });
    // action er value pabo thaunk function er return theke , thunk function
    // component theke dispatch diye call kora lage

    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message!;
    });

    //user login

    builder.addCase(loginUser.pending,(state)=>{
        state.isLoading = true
    });

     builder.addCase(loginUser.fulfilled, (state,action) => {
       state.isLoading = false;
       state.user.email = action.payload;
     });

       builder.addCase(loginUser.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.error = action.error.message!
       });
  },
});

export const { setUser, setLoading, } = userSlice.actions;

export default userSlice.reducer;