import { createSlice } from '@reduxjs/toolkit';
import { ICourse } from 'shared/types';
import {
   addCourse,
   editCourse,
   getCourses,
   removeCourse,
} from './course.actions';

const initialState: {
   courses: ICourse[];
} = {
   courses: [],
};

const course = createSlice({
   name: 'course',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getCourses.fulfilled, (state, action) => {
            state.courses = action.payload;
         })
         .addCase(addCourse.fulfilled, (state, action) => {
            state.courses.push(action.payload);
            // state.courses.sort((a, b) => {
            //    if (a.duration > b.duration) {
            //       return 1;
            //    }

            //    if (a.duration === b.duration && a.amount > b.amount) {
            //       return 1;
            //    }

            //    return 0;
            // });
         })
         .addCase(editCourse.fulfilled, (state, action) => {
            const index = state.courses.findIndex(
               (_course) => _course.id === action.payload.id
            );

            if (state.courses[index]) {
               state.courses[index] = {
                  ...state.courses[index],
                  ...action.payload,
               };
            }
         })
         .addCase(removeCourse.fulfilled, (state, action) => {
            state.courses = state.courses.filter(
               (_course) => _course.id !== action.payload.id
            );
         });
   },
});

export const courseReducer = course.reducer;
