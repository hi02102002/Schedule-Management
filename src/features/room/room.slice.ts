import { createSlice } from '@reduxjs/toolkit';
import { IRoom } from 'shared/types';
import { addRoom, getRooms, removeRoom } from './room.actions';

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
         })
         .addCase(removeRoom.fulfilled, (state, action) => {
            state.rooms = state.rooms.filter(
               (_room) => _room.id !== action.payload.id
            );
         });
   },
});

export const roomReducer = room.reducer;
