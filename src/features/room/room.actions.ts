import { createAsyncThunk } from '@reduxjs/toolkit';
import { scheduleApis } from 'api';
import { IRoom } from 'shared/types';

export const getRooms = createAsyncThunk<IRoom[], string>(
   'room/getRooms',
   async (accessToken) => {
      const { data } = await scheduleApis.getRooms(accessToken);
      return data;
   }
);

export const addRoom = createAsyncThunk<
   IRoom,
   {
      roomName: string;
      capacity: number;
      accessToken: string;
   },
   {
      rejectValue: string;
   }
>(
   'room/addRoom',
   async ({ roomName, capacity, accessToken }, { rejectWithValue }) => {
      try {
         const { data } = await scheduleApis.addRoom(
            roomName,
            capacity,
            accessToken
         );
         return data.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.message);
      }
   }
);

export const removeRoom = createAsyncThunk<
   { id: number },
   {
      id: number;
      accessToken: string;
   },
   {
      rejectValue: string;
   }
>('room/removeCourse', async ({ accessToken, id }, { rejectWithValue }) => {
   try {
      await scheduleApis.removeRoom(id, accessToken);
      return {
         id,
      };
   } catch (error: any) {
      return rejectWithValue(error.response.data.message);
   }
});
