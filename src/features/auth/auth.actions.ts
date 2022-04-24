import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from 'constant';
import { IRes, IUser } from '../../shared/types';

export const login = createAsyncThunk<
   IUser,
   {
      userName: string;
      password: string;
   },
   {
      rejectValue: string;
   }
>('auth/login', async ({ password, userName }, { rejectWithValue }) => {
   try {
      const { data } = await axios.post<IRes<IUser>>(
         `${BASE_API_URL}auth/signin`,
         {
            password,
            userName,
         }
      );
      return data.data;
   } catch (error: any) {
      return rejectWithValue('Username or password error!');
   }
});
