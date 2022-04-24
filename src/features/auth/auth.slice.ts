import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../shared/types';
import { login } from './auth.actions';

const initialState: {
   user: IUser | null;
   login: {
      loading: boolean;
      error: string;
   };
   signUp: {
      loading: boolean;
      error: string;
   };
} = {
   user: null,
   login: {
      loading: false,
      error: '',
   },
   signUp: {
      loading: false,
      error: '',
   },
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(login.pending, (state) => {
            state.login.loading = true;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.login.loading = false;
         })
         .addCase(login.rejected, (state, action) => {
            state.login.error = action.payload as string;
            state.login.loading = false;
         });
   },
});

export const authReducer = authSlice.reducer;
