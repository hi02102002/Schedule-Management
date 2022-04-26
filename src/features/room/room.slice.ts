import { createSlice } from '@reduxjs/toolkit';
import { IRoom } from 'shared/types';
import { addRoom, getRooms } from './room.actions';

const initialState: {
   rooms: IRoom[];
} = {
   rooms: [],
};

const room = createSlice({
   name: 'room',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getRooms.fulfilled, (state, action) => {
            state.rooms = action.payload;
         })
         .addCase(addRoom.fulfilled, (state, action) => {
            state.rooms.push(action.payload);
         });
   },
});

export const roomReducer = room.reducer;
